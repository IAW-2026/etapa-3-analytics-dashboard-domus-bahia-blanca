"use server";

import { getFeedbackData } from "@/app/servicios/feedbackApi";

export async function getFeedbackAnalyticsData() {
  try {
    const result = await getFeedbackData();
    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error en getFeedbackAnalyticsData:", error);
    return { success: false, data: null };
  }
}