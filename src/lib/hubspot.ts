const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY_OMAPEX
const HUBSPOT_BASE = 'https://api.hubapi.com'

// Pipeline routing by brand
const PIPELINE_MAP: Record<string, { pipelineId: string; stageId: string }> = {
  om_ai_solutions: { pipelineId: '2031095523', stageId: '3210312379' },
  om_apex_holdings: { pipelineId: '2031095523', stageId: '3210312379' },
  om_supply_chain: { pipelineId: '2031400693', stageId: '3210201787' },
  om_luxe_properties: { pipelineId: '2031095523', stageId: '3210312379' },
}

async function hubspotFetch(path: string, options: RequestInit = {}) {
  if (!HUBSPOT_API_KEY) {
    throw new Error('HUBSPOT_API_KEY_OMAPEX not configured')
  }

  const res = await fetch(`${HUBSPOT_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${HUBSPOT_API_KEY}`,
      ...options.headers,
    },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`HubSpot API error ${res.status}: ${body}`)
  }

  return res.json()
}

interface ContactData {
  email: string
  firstname?: string
  lastname?: string
  company?: string
  phone?: string
  brand: string
}

export async function createOrUpdateContact(data: ContactData): Promise<string> {
  const searchResult = await hubspotFetch('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            { propertyName: 'email', operator: 'EQ', value: data.email },
          ],
        },
      ],
    }),
  })

  const properties: Record<string, string> = {
    email: data.email,
    brand: data.brand,
  }
  if (data.firstname) properties.firstname = data.firstname
  if (data.lastname) properties.lastname = data.lastname
  if (data.company) properties.company = data.company
  if (data.phone) properties.phone = data.phone

  if (searchResult.total > 0) {
    const contactId = searchResult.results[0].id
    await hubspotFetch(`/crm/v3/objects/contacts/${contactId}`, {
      method: 'PATCH',
      body: JSON.stringify({ properties }),
    })
    return contactId
  }

  const created = await hubspotFetch('/crm/v3/objects/contacts', {
    method: 'POST',
    body: JSON.stringify({ properties }),
  })
  return created.id
}

export async function createDeal(
  contactId: string,
  dealname: string,
  brand: string
): Promise<string> {
  const pipeline = PIPELINE_MAP[brand] || PIPELINE_MAP.om_apex_holdings

  const deal = await hubspotFetch('/crm/v3/objects/deals', {
    method: 'POST',
    body: JSON.stringify({
      properties: {
        dealname,
        pipeline: pipeline.pipelineId,
        dealstage: pipeline.stageId,
        brand,
      },
    }),
  })

  await hubspotFetch(
    `/crm/v3/objects/deals/${deal.id}/associations/contacts/${contactId}/deal_to_contact`,
    { method: 'PUT' }
  )

  return deal.id
}
