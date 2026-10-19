import { HONEYPOT_FIELD } from '../src/lib/leadOptions.js'
import { classifyLead, VERDICT } from './_lib/leadFilter.js'
import { buildLeadMail } from './_lib/leadMail.js'
import { validateLead } from './_lib/leadValidation.js'

/**
 * Formulaire de démo du site et de pro.sweyl.com : une demande devient un mail sur
 * contact@sweyl.com, envoyé par Mailjet. Rien n'est stocké : le suivi se fait dans la boîte.
 * Les clés Mailjet vivent dans les variables d'environnement du projet Vercel.
 */
const CONTACT = 'contact@sweyl.com'
const MAILJET_SEND_URL = 'https://api.mailjet.com/v3.1/send'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body ?? {}

  const verdict = classifyLead(body, { honeypot: body[HONEYPOT_FIELD], elapsedMs: Number(body.elapsedMs) })
  // Un robot reçoit le même « ok » qu'un humain : il n'a aucune raison de réessayer.
  if (verdict === VERDICT.bot) return res.status(200).json({ ok: true })

  const { lead, error } = validateLead(body)
  if (error) return res.status(400).json({ error })

  const mail = buildLeadMail(lead, { suspect: verdict === VERDICT.suspect })
  const credentials = Buffer.from(`${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`).toString('base64')

  try {
    const mj = await fetch(MAILJET_SEND_URL, {
      method: 'POST',
      headers: { Authorization: `Basic ${credentials}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Messages: [{
          From: { Email: CONTACT, Name: mail.fromName },
          To: [{ Email: CONTACT, Name: 'SWEYL' }],
          ReplyTo: { Email: lead.email, Name: lead.name },
          Subject: mail.subject,
          TextPart: mail.text,
          HTMLPart: mail.html,
        }],
      }),
    })
    if (!mj.ok) throw new Error(`Mailjet ${mj.status}: ${await mj.text()}`)
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}

function safeParse(text) {
  try { return JSON.parse(text) } catch { return {} }
}
