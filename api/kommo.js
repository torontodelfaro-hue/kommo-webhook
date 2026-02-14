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

    await fetch(
      `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              event_name: 'Purchase',
              event_time: Math.floor(Date.now() / 1000),
              action_source: 'system_generated',
              user_data: {
                ph: [hashedPhone],
              },
              custom_data: {
                currency: 'USD',
                value: 1,
              },
            },
          ],
        }),
      }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
