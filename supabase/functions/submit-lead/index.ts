import postgres from 'https://deno.land/x/postgresjs/mod.js'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const { name, email, club, role, message } = await req.json()

    if (!name || !email || !club || !role) {
      return new Response(JSON.stringify({ error: 'Champs requis manquants' }), {
        status: 400, headers: { ...CORS, 'Content-Type': 'application/json' },
      })
    }

    // Stockage direct en base — bypass PostgREST, schéma custom sans config
    const sql = postgres(Deno.env.get('SUPABASE_DB_URL')!, { prepare: false })
    await sql`
      INSERT INTO s_lead.leads (name, email, club, role, message)
      VALUES (${name}, ${email}, ${club}, ${role}, ${message ?? null})
    `
    await sql.end()

    // Envoi email via Mailjet
    const mjKey = Deno.env.get('MAILJET_API_KEY')!
    const mjSecret = Deno.env.get('MAILJET_SECRET_KEY')!
    const credentials = btoa(`${mjKey}:${mjSecret}`)

    const roleLabels: Record<string, string> = { president: 'Président', coach: 'Coach', other: 'Autre' }

    const mjRes = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: { Authorization: `Basic ${credentials}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Messages: [{
          From: { Email: 'contact@sweyl.com', Name: 'SWEYL Site' },
          To: [{ Email: 'contact@sweyl.com', Name: 'SWEYL' }],
          ReplyTo: { Email: email, Name: name },
          Subject: `Nouvelle demande de démo — ${club}`,
          TextPart: [
            `Nom : ${name}`,
            `Email : ${email}`,
            `Club : ${club}`,
            `Rôle : ${roleLabels[role] ?? role}`,
            message ? `Message : ${message}` : '',
          ].filter(Boolean).join('\n'),
          HTMLPart: `
            <h2>Nouvelle demande de démo</h2>
            <table>
              <tr><td><strong>Nom</strong></td><td>${name}</td></tr>
              <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td><strong>Club</strong></td><td>${club}</td></tr>
              <tr><td><strong>Rôle</strong></td><td>${roleLabels[role] ?? role}</td></tr>
              ${message ? `<tr><td><strong>Message</strong></td><td>${message}</td></tr>` : ''}
            </table>
          `,
        }],
      }),
    })

    if (!mjRes.ok) {
      const err = await mjRes.text()
      throw new Error(`Mailjet: ${err}`)
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...CORS, 'Content-Type': 'application/json' },
    })

  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
