import { getKoreaTravelKpiPayload } from "@/lib/korea-travel-kpis";

export const revalidate = 28800; // 8 hours ≈ 3 times/day

export async function GET() {
  const payload = await getKoreaTravelKpiPayload();
  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=28800, stale-while-revalidate=86400",
    },
  });
}
