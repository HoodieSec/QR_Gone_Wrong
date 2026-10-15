import crypto from 'crypto';
import dns from 'dns/promises';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. IP Address
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ip = rawIp.split(',')[0].trim();

    // 2. Edge Geolocation (Provided automatically by Vercel)
    const geo = {
      country: req.headers['x-vercel-ip-country'] || 'Unknown',
      region: req.headers['x-vercel-ip-country-region'] || 'Unknown',
      city: req.headers['x-vercel-ip-city'] || 'Unknown',
      latitude: req.headers['x-vercel-ip-latitude'] || null,
      longitude: req.headers['x-vercel-ip-longitude'] || null,
      timezone: req.headers['x-vercel-ip-timezone'] || 'Unknown',
    };

    // 3. Hostnames
    const siteHostname = req.headers['x-forwarded-host'] || req.headers.host || 'Unknown';
    let clientHostname = 'Unknown';

    try {
      if (ip && ip !== '127.0.0.1' && ip !== '::1') {
        const hostnames = await dns.reverse(ip);
        if (hostnames && hostnames.length > 0) {
          clientHostname = hostnames[0];
        }
      }
    } catch {
      clientHostname = 'No PTR record / Timeout';
    }

    // 4. Device Fingerprinting
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const acceptLanguage = req.headers['accept-language'] || 'Unknown';
    
    const fingerprintHash = crypto
      .createHash('sha256')
      .update(`${ip}-${userAgent}-${acceptLanguage}`)
      .digest('hex');

    // 5. Save Record to Supabase
    const { data, error } = await supabase
      .from('visitor_logs')
      .insert([
        {
          ip_address: ip,
          client_hostname: clientHostname,
          site_hostname: siteHostname,
          country: geo.country,
          region: geo.region,
          city: geo.city,
          latitude: geo.latitude,
          longitude: geo.longitude,
          timezone: geo.timezone,
          device_fingerprint: fingerprintHash,
          user_agent: userAgent,
          payload: JSON.stringify({
            cookies: req.body?.cookies,
            referrer: req.body?.referrer,
            path: req.body?.path
          }),
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase DB error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, message: 'Logged on page load' });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}