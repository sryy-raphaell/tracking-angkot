import { createClient } from 'redis';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    const { vehicleId, lat, lng } = req.body;
    if (!vehicleId || !lat || !lng) return res.status(400).json({ error: 'Data tidak lengkap' });

    // Koneksi ke Redis
    const redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();
    
    // Simpan koordinat
    await redis.set(`loc:${vehicleId}`, JSON.stringify({ lat, lng, timestamp: Date.now() }));
    await redis.disconnect();
    
    return res.status(200).json({ success: true });
}