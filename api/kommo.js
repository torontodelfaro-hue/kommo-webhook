import crypto from 'crypto';

export default async function handler(req, res) {
  try {
    let phone = req.body?.contacts?.[0]?.phone || '';

    // Limpia todo lo que no sea número
    phone = phone.replace(/\D/g, '');

    if (!phone) {
      return res.status(200).json({ message: "No phone provided" });
    }

    // Hash SHA256
    const hashedPhone = crypto
      .createHash('sha256')
      .update(phone)
      .digest('hex');

    const response = await fetch(
      'https://graph.facebook.com/v19.0/TU_PIXEL_ID/events?access_token=TU_ACCESS_TOKEN',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test_event_code: "PON_AQUI_TU_TEST_CODE",
          data: [
            {
              event_name: "Purchase",
