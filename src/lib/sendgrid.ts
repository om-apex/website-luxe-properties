interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: { email: string; name: string };
  headers?: Record<string, string>;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

const DEFAULT_FROM_NAME = 'Om Luxe Properties';

export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('[sendgrid] SENDGRID_API_KEY not configured');
    return { success: false, error: 'SendGrid API key not configured' };
  }

  const fromEmail = params.from?.email ?? process.env.SENDGRID_FROM_EMAIL ?? 'newsletter@omluxeproperties.com';
  const fromName = params.from?.name ?? process.env.SENDGRID_FROM_NAME ?? DEFAULT_FROM_NAME;

  const body: Record<string, unknown> = {
    personalizations: [{ to: [{ email: params.to }] }],
    from: { email: fromEmail, name: fromName },
    subject: params.subject,
    content: [{ type: 'text/html', value: params.html }],
  };

  if (params.headers && Object.keys(params.headers).length > 0) {
    (body.personalizations as Array<Record<string, unknown>>)[0].headers = params.headers;
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 202) {
      const messageId = response.headers.get('x-message-id') ?? undefined;
      return { success: true, messageId };
    }

    const errorText = await response.text();
    console.error(`[sendgrid] Failed to send email: ${response.status} ${errorText}`);
    return { success: false, error: `SendGrid API error: ${response.status}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[sendgrid] Network error: ${message}`);
    return { success: false, error: message };
  }
}
