import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    const { vehicleId, lat, lng } = req.body;
    if (!vehicleId || !lat || !lng) return res.status(400).json({ error: 'Data tidak lengkap' });

    // Simpan koordinat ke Vercel KV
    await kv.set(`loc:${vehicleId}`, { lat, lng, timestamp: Date.now() });
    
    return res.status(200).json({ success: true });
}