async function readBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return rawBody ? JSON.parse(rawBody) : {};
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  try {
    const lead = await readBody(req);
    const digitsOnlyPhone = String(lead.phone ?? "").replace(/\D/g, "");

    if (
      !String(lead.name ?? "").trim() ||
      digitsOnlyPhone.length < 9 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(lead.email ?? "")) ||
      lead.consent !== true
    ) {
      return res.status(400).json({ status: "error", message: "Invalid lead payload" });
    }

    const payload = {
      name: String(lead.name).trim(),
      phone: String(lead.phone).trim(),
      email: String(lead.email).trim(),
      nip: String(lead.nip ?? "").trim(),
      itemType: String(lead.itemType ?? "").trim(),
      financedAmount: Number(lead.financedAmount) || 0,
      message: String(lead.message ?? "").trim(),
      createdAt: new Date().toISOString(),
    };

    if (process.env.LEADS_WEBHOOK_URL) {
      const webhookResponse = await fetch(process.env.LEADS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!webhookResponse.ok) {
        throw new Error(`Webhook failed with ${webhookResponse.status}`);
      }
    } else {
      console.info("New leasing lead", payload);
    }

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Lead submission failed", error);
    return res.status(500).json({ status: "error", message: "Lead submission failed" });
  }
};
