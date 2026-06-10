import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    const { vehicleId } = req.query;
    if (!vehicleId) return res.status(400).json({ error: 'ID Kendaraan hilang' });

    // Ambil koordinat dari Vercel KV
    const data = await kv.get(`loc:${vehicleId}`);
    
    if (!data) return res.status(404).json({ error: 'Belum ada lokasi' });

    return res.status(200).json(data);
}