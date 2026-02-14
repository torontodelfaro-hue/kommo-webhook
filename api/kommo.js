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
      'https://graph.facebook.com/v19.0/1043319464664254/events?access_token=EAARmicyII3gBQrsZCGePXxusolNKcv2jwzE52CHy7JwTsarB1sENIvpZC77crC6ntXZBwXQE3MgMetYWIX1cVoXsbP7mnHDSXeVQCBOFDBRTZAvK59TiiDDc3g7YzVdSIMoo6cehctS6WmGGtyDlQPNTR0s39yAzy5CPNJ3kBRleEBVHCQqZCT61BhQ8we31BUgZDZD',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test_event_code: "TEST49976",
          data: [
            {
              event_name: "Purchase",
