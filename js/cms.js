/**
 * Om Luxe Properties — Lightweight CMS Client
 * Fetches content from shared Supabase site_content table
 * Edit mode: ?editMode=true (requires @omapex.com Supabase auth)
 */
(function() {
  'use strict';

  const SUPABASE_URL = 'https://hympgocuivzxzxllgmcy.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bXBnb2N1aXZ6eHp4bGxnbWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2OTkxMjEsImV4cCI6MjA4NTI3NTEyMX0.gPMUFzMx_rVxLOjtYWuehYhOIhn6byx81gElCXkz1NM';
  const SITE = 'luxe';

  // Check if edit mode via URL param
  const urlParams = new URLSearchParams(window.location.search);
  const editMode = urlParams.get('editMode') === 'true';

  // Fetch all content for this site
  async function fetchContent() {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/site_content?site=eq.${SITE}&select=content_key,value,default_value`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
      if (!res.ok) return {};
      const data = await res.json();
      const content = {};
      for (const row of data) {
        content[row.content_key] = row.value || row.default_value || '';
      }
      return content;
    } catch (e) {
      console.error('CMS: Failed to fetch content', e);
      return {};
    }
  }

  // Apply content to DOM elements
  function applyContent(content) {
    const elements = document.querySelectorAll('[data-cms-key]');
    elements.forEach(el => {
      const key = el.getAttribute('data-cms-key');
      if (content[key] !== undefined && content[key] !== '') {
        // Handle phone links
        if (el.tagName === 'A' && el.getAttribute('data-cms-type') === 'phone') {
          el.href = 'tel:' + content[key].replace(/[^\d+]/g, '');
          el.textContent = content[key];
        } else {
          el.textContent = content[key];
        }
      }
    });
  }

  // Update content in Supabase
  async function updateContent(key, value) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/site_content?content_key=eq.${encodeURIComponent(key)}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            value: value,
            updated_at: new Date().toISOString(),
            updated_by: 'inline-edit'
          })
        }
      );
      return res.ok;
    } catch (e) {
      console.error('CMS: Failed to update content', e);
      return false;
    }
  }

  // Enable edit mode on elements
  function enableEditMode() {
    const elements = document.querySelectorAll('[data-cms-key]');
    elements.forEach(el => {
      // Add visual indicator
      el.style.outline = '2px dashed rgba(201, 162, 39, 0.5)';
      el.style.outlineOffset = '4px';
      el.style.cursor = 'pointer';
      el.title = 'Click to edit: ' + el.getAttribute('data-cms-key');

      el.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openEditor(el);
      });
    });

    // Add edit mode indicator bar
    var bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#C9A227;color:#fff;text-align:center;padding:8px;z-index:10000;font-size:14px;font-family:sans-serif;';
    bar.innerHTML = 'CMS Edit Mode — Click any outlined text to edit | <a href="' + window.location.pathname + '" style="color:#fff;text-decoration:underline;">Exit Edit Mode</a>';
    document.body.prepend(bar);
    document.body.style.paddingTop = '40px';
  }

  // Open edit modal for an element
  function openEditor(el) {
    var key = el.getAttribute('data-cms-key');
    var currentValue = el.textContent;

    // Create modal
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.3);z-index:10001;display:flex;align-items:center;justify-content:center;';

    var modal = document.createElement('div');
    modal.style.cssText = 'background:#fff;border-radius:12px;padding:24px;width:400px;max-width:90vw;box-shadow:0 20px 60px rgba(0,0,0,0.3);font-family:sans-serif;';

    modal.innerHTML = '<div style="margin-bottom:12px;">' +
      '<code style="font-size:12px;background:#f3f4f6;padding:4px 8px;border-radius:4px;color:#C9A227;">' + key + '</code>' +
      '</div>' +
      '<textarea id="cms-edit-value" rows="4" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:8px;font-size:14px;resize:vertical;box-sizing:border-box;outline:none;">' + currentValue + '</textarea>' +
      '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;">' +
      '<button id="cms-cancel" style="padding:8px 16px;font-size:14px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;">Cancel</button>' +
      '<button id="cms-save" style="padding:8px 16px;font-size:14px;border:none;border-radius:6px;background:#2E7D32;color:#fff;cursor:pointer;">Save</button>' +
      '</div>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    var textarea = document.getElementById('cms-edit-value');
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    // Event handlers
    document.getElementById('cms-cancel').addEventListener('click', function() {
      document.body.removeChild(overlay);
    });

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) document.body.removeChild(overlay);
    });

    document.getElementById('cms-save').addEventListener('click', async function() {
      var newValue = textarea.value;
      var saveBtn = document.getElementById('cms-save');
      saveBtn.textContent = 'Saving...';
      saveBtn.disabled = true;

      var success = await updateContent(key, newValue);
      if (success) {
        // Handle phone links
        if (el.tagName === 'A' && el.getAttribute('data-cms-type') === 'phone') {
          el.href = 'tel:' + newValue.replace(/[^\d+]/g, '');
        }
        el.textContent = newValue;
        document.body.removeChild(overlay);
      } else {
        saveBtn.textContent = 'Failed — Try Again';
        saveBtn.disabled = false;
      }
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', async function() {
    var content = await fetchContent();
    if (Object.keys(content).length > 0) {
      applyContent(content);
    }
    if (editMode) {
      enableEditMode();
    }
  });
})();
