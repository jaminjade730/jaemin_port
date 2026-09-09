export type KoreaTravelVideoViews = {
  main: number;
  heritage: number;
  trend: number;
};

export type KoreaTravelKpiItem = {
  value: string;
  label: string;
  body?: string;
};

export type KoreaTravelKpiPayload = {
  items: KoreaTravelKpiItem[];
  updatedAt: string;
  source: "youtube" | "fallback";
};

/** Fallback when API key is missing or YouTube request fails */
export const KOREA_TRAVEL_FALLBACK_VIEWS: KoreaTravelVideoViews = {
  main: 204,
  heritage: 86,
  trend: 60,
};

export const KOREA_TRAVEL_YOUTUBE_IDS = {
  main: "c4ovSfYOkhw",
  heritage: "Qztxuf9wMB8",
  trend: "Oml3JtqvMKc",
} as const;

/** ~3 updates/day */
export const KOREA_TRAVEL_KPI_REVALIDATE_SECONDS = 60 * 60 * 8;

function formatCount(n: number) {
  return n.toLocaleString("ko-KR");
}

function formatRate(part: number, total: number) {
  if (total <= 0) return "0%";
  return `${((part / total) * 100).toFixed(1)}%`;
}

export function buildKoreaTravelKpiItems(
  views: KoreaTravelVideoViews,
): KoreaTravelKpiItem[] {
  const { main, heritage, trend } = views;
  const followUp = heritage + trend;
  const total = main + heritage + trend;

  return [
    {
      value: formatCount(main),
      label: "메인 영상 조회수",
      body: `인터랙티브 콘텐츠의 시작점이 되는 메인 영상 조회\n세 영상 총 조회수 ${formatCount(total)}회 (메인 ${formatCount(main)} + 헤리티지 ${formatCount(heritage)} + 트렌드 ${formatCount(trend)})`,
    },
    {
      value: formatRate(heritage, main),
      label: "헤리티지 영상 시청률",
      body: `메인 ${formatCount(main)}회 대비 헤리티지 영상 ${formatCount(heritage)}회 시청`,
    },
    {
      value: formatRate(trend, main),
      label: "트렌드 영상 시청률",
      body: `메인 ${formatCount(main)}회 대비 트렌드 영상 ${formatCount(trend)}회 시청`,
    },
    {
      value: formatRate(followUp, main),
      label: "메인 대비 후속 콘텐츠 합산 시청률",
      body: `헤리티지 + 트렌드 총 ${formatCount(followUp)}회\n${formatCount(followUp)} ÷ ${formatCount(main)} × 100 = ${formatRate(followUp, main)}`,
    },
  ];
}

type YoutubeVideosResponse = {
  items?: {
    id: string;
    statistics?: { viewCount?: string };
  }[];
  error?: { message?: string };
};

export async function fetchKoreaTravelVideoViews(): Promise<{
  views: KoreaTravelVideoViews;
  source: "youtube" | "fallback";
}> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return { views: KOREA_TRAVEL_FALLBACK_VIEWS, source: "fallback" };
  }

  const ids = [
    KOREA_TRAVEL_YOUTUBE_IDS.main,
    KOREA_TRAVEL_YOUTUBE_IDS.heritage,
    KOREA_TRAVEL_YOUTUBE_IDS.trend,
  ].join(",");

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "statistics");
  url.searchParams.set("id", ids);
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: KOREA_TRAVEL_KPI_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error("[korea-travel-kpis] YouTube API HTTP", response.status);
      return { views: KOREA_TRAVEL_FALLBACK_VIEWS, source: "fallback" };
    }

    const data = (await response.json()) as YoutubeVideosResponse;
    if (data.error?.message) {
      console.error("[korea-travel-kpis] YouTube API error", data.error.message);
      return { views: KOREA_TRAVEL_FALLBACK_VIEWS, source: "fallback" };
    }

    const byId = new Map(
      (data.items ?? []).map((item) => [
        item.id,
        Number(item.statistics?.viewCount ?? 0),
      ]),
    );

    const views: KoreaTravelVideoViews = {
      main: byId.get(KOREA_TRAVEL_YOUTUBE_IDS.main) ?? 0,
      heritage: byId.get(KOREA_TRAVEL_YOUTUBE_IDS.heritage) ?? 0,
      trend: byId.get(KOREA_TRAVEL_YOUTUBE_IDS.trend) ?? 0,
    };

    if (views.main <= 0) {
      return { views: KOREA_TRAVEL_FALLBACK_VIEWS, source: "fallback" };
    }

    return { views, source: "youtube" };
  } catch (error) {
    console.error("[korea-travel-kpis] fetch failed", error);
    return { views: KOREA_TRAVEL_FALLBACK_VIEWS, source: "fallback" };
  }
}

export async function getKoreaTravelKpiPayload(): Promise<KoreaTravelKpiPayload> {
  const { views, source } = await fetchKoreaTravelVideoViews();
  return {
    items: buildKoreaTravelKpiItems(views),
    updatedAt: new Date().toISOString(),
    source,
  };
}
