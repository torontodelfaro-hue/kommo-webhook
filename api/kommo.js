const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    let phone = req.body.contacts?.[0]?.phone || "";
phone = phone.replace(/\D/g, "");

    phone = phone.replace(/\D/g, '');

    if (!phone) {
      return res.status(200).json({ message: "No phone provided" });
    }

    const hashedPhone = crypto
      .createHash('sha256')
      .update(phone)
      .digest('hex');

    const response = await fetch(
      'https://graph.facebook.com/v19.0/1043319464664254/events?1043319464664254=EAARmicyII3gBQrsZCGePXxusolNKcv2jwzE52CHy7JwTsarB1sENIvpZC77crC6ntXZBwXQE3MgMetYWIX1cVoXsbP7mnHDSXeVQCBOFDBRTZAvK59TiiDDc3g7YzVdSIMoo6cehctS6WmGGtyDlQPNTR0s39yAzy5CPNJ3kBRleEBVHCQqZCT61BhQ8we31BUgZDZD',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test_event_code: "TEST49976",
          data: [
            {
              event_name: "Purchase",
              event_time: Math.floor(Date.now() / 1000),
              action_source: "system_generated",
              user_data: {
                ph: [hashedPhone]
              }
            }
          ]
        })
      }
    );

    const fbData = await response.json();
    console.log("Facebook response:", fbData);

    return res.status(200).json({ success: true, fbData });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
