
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SENDER_EMAIL = 'Perfect Models <contact@perfectmodels.ga>'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// --- Email Templates ---

const emailStyles = `
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #000; color: #f5f5f5; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 0 auto; background-color: #111; padding: 20px; border: 1px solid #D4AF37; }
  .header { text-align: center; border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
  .header h1 { color: #D4AF37; margin: 0; font-family: 'Times New Roman', serif; text-transform: uppercase; letter-spacing: 2px; }
  .content { line-height: 1.6; color: #ccc; }
  .highlight { color: #D4AF37; font-weight: bold; }
  .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; border-top: 1px solid #333; padding-top: 10px; }
  ul { list-style-type: none; padding: 0; }
  li { margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #D4AF37; }
`;

const getTemplate = (type: string, data: any) => {
  switch (type) {
    case 'fashionDayApplication':
      return {
        subject: `Candidature Perfect Fashion Day - ${data.name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><style>${emailStyles}</style></head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Perfect Models</h1>
              </div>
              <div class="content">
                <p>Bonjour <span class="highlight">${data.name}</span>,</p>
                <p>Nous avons bien reçu votre candidature pour le Perfect Fashion Day en tant que <span class="highlight">${data.role}</span>.</p>
                <p>Voici un récapitulatif de vos informations :</p>
                <ul>
                  <li><strong>Email :</strong> ${data.email}</li>
                  <li><strong>Téléphone :</strong> ${data.phone}</li>
                  <li><strong>Message :</strong> ${data.message}</li>
                </ul>
                <p>Notre équipe va étudier votre profil avec attention. Nous reviendrons vers vous très prochainement.</p>
                <p>Merci de votre intérêt pour cet événement d'exception.</p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Perfect Models Management. Tous droits réservés.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };
    
    case 'castingApplication':
      return {
        subject: `Candidature Casting - ${data.firstName} ${data.lastName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><style>${emailStyles}</style></head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Casting Confirmed</h1>
              </div>
              <div class="content">
                <p>Bonjour <span class="highlight">${data.firstName}</span>,</p>
                <p>Votre candidature pour rejoindre l'agence Perfect Models a bien été enregistrée.</p>
                <p><strong>Détails du profil :</strong></p>
                <ul>
                  <li><strong>Nom :</strong> ${data.firstName} ${data.lastName}</li>
                  <li><strong>Nationalité :</strong> ${data.nationality}</li>
                  <li><strong>Mensurations :</strong> ${data.height}cm / ${data.age} ans</li>
                  <li><strong>Expérience :</strong> ${data.experience}</li>
                  <li><strong>Instagram :</strong> ${data.instagram || 'Non renseigné'}</li>
                </ul>
                <p>Si votre profil correspond à nos recherches actuelles, notre équipe de casting vous contactera pour un entretien ou une demande de polas (photos naturelles).</p>
                <p>Nous vous remercions de votre confiance.</p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Perfect Models Management. Tous droits réservés.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

    case 'bookingRequest':
      return {
        subject: `Demande de Booking - ${data.clientCompany || data.clientName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><style>${emailStyles}</style></head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Demande de Booking</h1>
              </div>
              <div class="content">
                <p>Bonjour <span class="highlight">${data.clientName}</span>,</p>
                <p>Nous accusons réception de votre demande de booking.</p>
                <p><strong>Votre demande :</strong></p>
                <ul>
                  <li><strong>Modèle(s) :</strong> ${data.requestedModels}</li>
                  <li><strong>Dates :</strong> Du ${data.startDate} au ${data.endDate}</li>
                  <li><strong>Société :</strong> ${data.clientCompany || 'Particulier'}</li>
                  <li><strong>Détails :</strong> ${data.message}</li>
                </ul>
                <p>Un agent va examiner votre demande et vérifier la disponibilité des talents. Vous recevrez un devis ou une réponse sous 24/48h.</p>
                <p>Cordialement,</p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Perfect Models Management. Tous droits réservés.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

    default:
      return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject: customSubject, html: customHtml, template, data } = await req.json()

    let emailSubject = customSubject;
    let emailHtml = customHtml;
    const emailTo = to;

    if (template) {
      const templateResult = getTemplate(template, data);
      if (templateResult) {
        emailSubject = templateResult.subject;
        emailHtml = templateResult.html;
      } else {
        throw new Error(`Template '${template}' not found.`);
      }
    }

    if (!emailTo || !emailSubject || !emailHtml) {
        throw new Error("Missing 'to', 'subject', or 'html' (or valid 'template') in request body.")
    }

    if (!RESEND_API_KEY) {
      console.log('Mock Email Send:', { to: emailTo, subject: emailSubject, from: SENDER_EMAIL })
      return new Response(
        JSON.stringify({ 
            message: "Email logged (No API Key configured)",
            data: { to: emailTo, subject: emailSubject, template: template || 'custom' } 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: emailTo,
        subject: emailSubject,
        html: emailHtml,
      }),
    })

    const resultData = await res.json()

    if (!res.ok) {
        throw new Error(resultData.message || 'Failed to send email via Resend')
    }

    return new Response(
      JSON.stringify(resultData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Email Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
