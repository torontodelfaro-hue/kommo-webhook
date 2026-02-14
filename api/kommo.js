export default async function handler(req, res) {
  try {
    const phoneRaw = req.body?.contacts?.[0]?.phone || "";

    if (!phoneRaw) {
      return res.status(200).json({ message: "No phone provided" });
    }

    const phone = phoneRaw.replace(/\D/g, "");

    const response = await fetch(
      "https://graph.facebook.com/v19.0/1043319464664254/events?access_token=EAARmicyII3gBQrsZCGePXxusolNKcv2jwzE52CHy7JwTsarB1sENIvpZC77crC6ntXZBwXQE3MgMetYWIX1cVoXsbP7mnHDSXeVQCBOFDBRTZAvK59TiiDDc3g7YzVdSIMoo6cehctS6WmGGtyDlQPNTR0s39yAzy5CPNJ3kBRleEBVHCQqZCT61BhQ8we31BUgZDZD",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: "Purchase",
              event_time: Math.floor(Date.now() / 1000),
              action_source: "system_generated",
              user_data: {
                ph: [phone]
              }
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("META RESPONSE:", data);

    return res.status(200).json({ success: true, meta: data });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
