import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Extract IP address from Vercel edge headers
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ip = rawIp.split(',')[0].trim();

    const { data, error } = await supabase
      .from('visitor_logs')
      .insert([{ ip_address: ip }])
      .select();

    if (error) {
      console.error('Supabase DB error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, message: 'Visit logged' });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}