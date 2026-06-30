const API_URL = process.env.FEEDBACK_API_URL;
const API_KEY = process.env.FEEDBACK_CONTROL_PANEL_API_KEY;

export async function getFeedbackData() {
  const res = await fetch(`${API_URL}/api/admin/reviews`, {
    headers: { "X-API-Key": API_KEY! },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error obteniendo datos de feedback");
  }

  return res.json();
}