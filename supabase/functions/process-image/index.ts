
import { createClient } from 'jsr:@supabase/supabase-js@2'

console.log("Hello from Process Image Function!")

Deno.serve(async (req: { method: string; json: () => PromiseLike<{ name: any }> | { name: any } }) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }})
  }

  try {
    const { name } = await req.json()
    
    // Example: Use Supabase client to do something
    // const supabaseClient = createClient(
    //   Deno.env.get('SUPABASE_URL') ?? '',
    //   Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    //   { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    // )

    const data = {
      message: `Image processed for ${name}!`,
      timestamp: new Date().toISOString()
    }

    return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } },
    )
  }
})
