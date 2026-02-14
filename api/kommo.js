import crypto from 'crypto';

export default async function handler(req, res) {
  try {
    const phone = req.body?.contacts?.[0]?.phone || '';

    if (!phone) {
      return res.status(200).json({ message: "No phone provided" });
    }

    const hashedPhone = crypto
      .createHash('sha256')
      .update(phone)
      .digest('hex');

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
