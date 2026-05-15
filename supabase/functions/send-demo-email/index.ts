import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const { email, first_name } = await req.json()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'Sunita <onboarding@resend.dev>',
      to: email,
      subject: `${first_name}, thank you for requesting a DataVio AI demo!`,
      text: `Hi ${first_name},

Thank you for your interest in DataVio AI.

We're excited to show you how DataVio AI helps ecommerce businesses automate catalog enrichment, product data normalization, and catalog quality optimization at scale.

One of our team members will connect with you shortly to schedule your demo.

In the meantime, feel free to explore our website to learn more about the platform.

We look forward to speaking with you soon.

Best Regards,

Sunita
DataVio AI
https://datavioai.com`
    })
  })

  const data = await res.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
})