import { createClient } from 'redis';

export default async function handler(req, res) {
    const { vehicleId } = req.query;
    if (!vehicleId) return res.status(400).json({ error: 'ID Kendaraan hilang' });

    // Koneksi ke Redis
    const redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();
    
    // Ambil koordinat
    const data = await redis.get(`loc:${vehicleId}`);
    await redis.disconnect();
    
    if (!data) return res.status(404).json({ error: 'Belum ada lokasi' });

    return res.status(200).json(JSON.parse(data));
}