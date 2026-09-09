export type ProjectCategory = "brand" | "campaign" | "content" | "performance";

/** Action/Result 배치 방식 — 레퍼런스 팝업 기준 */
export type ProjectLayout = "triptych" | "zigzag" | "zigzag-pair";

export type ProjectCallout = {
  label: string;
  items: string[];
  note?: string;
};

export type ProjectGlanceItem = {
  label: string;
  body: string;
};

export type ProjectCompareSide = {
  label: string;
  title: string;
  body: string;
};

export type ProjectLearned = {
  /** 큰 리드 문구 (있으면 highlight 위에 표시) */
  lead?: string;
  highlight: string;
  body?: string[];
  /** 최종 사고 흐름 등 */
  flowLabel?: string;
  flow?: string[];
};

export type Project = {
  id: string;
  number: string;
  category: ProjectCategory;
  categoryLabel: string;
  title: string;
  brand: string;
  subtitle: string;
  /** 부제 아래 한 줄 요약 */
  oneLiner?: string;
  /** 링크 아래 요약 바 (기간 · 유형 · 역할) */
  summaryBar?: string;
  /** Legacy tagline — not rendered in chapter UI */
  hook?: string;
  accent: string;
  layout: ProjectLayout;
  images?: {
    hero?: string;
    mid?: string;
    action?: string[];
    result?: string;
    /** Prefer LCP preload for overview media */
    priority?: boolean;
  };
  /** YouTube watch/share URL or video id — Overview 첫 칸에 임베드 */
  video?: string;
  /** Legacy scope bars — not rendered in chapter UI */
  scope?: { label: string; percent: number }[];
  /** Legacy tools string — not rendered in chapter UI */
  tools?: string;
  meta: string[];
  /** 메인 이미지 옆 요약 박스 (있으면 meta/callouts 대신 표시) */
  glance?: {
    title?: string;
    items: ProjectGlanceItem[];
  };
  callouts?: ProjectCallout[];
  /** Situation 섹션 제목. 기본: Situation & Task */
  situationTitle?: string;
  situation: string[];
  /** Situation 본문 대신 좌·우 비교 카드 */
  situationCompare?: {
    left: ProjectCompareSide;
    right: ProjectCompareSide;
  };
  /** PROBLEM 메인 문구 아래 인과 플로우 */
  situationFlow?: string[];
  /** PROBLEM FLOW 등 플로우 상단 라벨 */
  situationFlowLabel?: string;
  /** PROBLEM 플로우 아래 상세 (라벨 · 질문 · 보조 설명) */
  situationDetail?: {
    label: string;
    title: string;
    body: string;
  };
  /** PROBLEM VIEW RESEARCH 토글 본문 */
  situationResearch?: {
    title: string;
    image: string;
    body?: string[];
  }[];
  /** PROBLEM 하단 TASK / PROJECT GOAL */
  projectTask?: {
    title?: string;
    lead?: string;
    prompt: string;
    goalsTitle?: string;
    goals: { label: string; title: string; body?: string }[];
  };
  /** PROBLEM 하단 VISIT MOTIVATION (BEFORE → AFTER) */
  problemInsight?: {
    title?: string;
    label?: string;
    lead?: string;
    before: { label?: string; title?: string; text: string };
    after: { label?: string; title?: string; text: string };
    insightLabel?: string;
    body: string;
    /** true면 Action 섹션 안에 배치 */
    inAction?: boolean;
  };
  /** INTERACTIVE CONCEPT (전통 vs 현대 선택) */
  interactiveConcept?: {
    title?: string;
    headline: string;
    left: { label: string; title: string; body: string; video?: string };
    right: { label: string; title: string; body: string; video?: string };
    versus?: string;
    body: string;
  };
  /** INTERACTIVE JOURNEY (WATCH → EXPLORE) */
  interactiveJourney?: {
    title?: string;
    lead: string;
    body?: string;
    steps: { label: string; title: string; body: string }[];
  };
  /** AI CREATIVE */
  aiCreative?: {
    title?: string;
    lead: string;
    body?: string;
    items: { label: string; title: string; body: string }[];
    images?: { src: string; alt: string; label?: string }[];
  };
  /** CREATIVE STRATEGY — Action 내 메시지 축 */
  creativeStrategy?: {
    title?: string;
    lead?: string;
    items: { label: string; title: string; body?: string }[];
    /** 하단 토글 — 광고 소재 (채널별 슬라이드 그룹) */
    materials?: {
      label?: string;
      groups: {
        title: string;
        items: {
          title: string;
          image?: string;
          video?: string;
          body?: string[];
        }[];
      }[];
    };
  };
  /** MEDIA STRATEGY — 채널별 역할·예산 */
  mediaStrategy?: {
    title?: string;
    lead: string;
    body?: string;
    channels: {
      label: string;
      share: string;
      stage: string;
      body: string;
    }[];
    mix: {
      title?: string;
      shares: string;
      flow: string;
      note?: string;
    };
  };
  /** DISTRIBUTION & TARGET KPI */
  distributionKpi?: {
    title?: string;
    lead: string;
    distribution: { title?: string; items: string[] };
    kpis: { title?: string; items: { value: string; label: string; body?: string }[] };
    body?: string;
    /** YouTube 영상 ID — 있으면 조회수를 주기적으로 갱신 */
    youtube?: {
      main: string;
      heritage: string;
      trend: string;
    };
    /** 달성 KPI 아래 영상 쇼케이스 */
    showcase?: {
      label: string;
      title: string;
      videos: { id: string; label?: string }[];
    };
  };
  /** CONCEPT 섹션 */
  concept?: {
    title?: string;
    name: string;
    tagline: string;
    body: string;
    flow: string[];
    outdoorPreviews?: { title?: string; images: string[] }[];
  };
  /** TARGET STRATEGY 섹션 */
  targetStrategy?: {
    title?: string;
    lead: string;
    badge?: string;
    targets: {
      name: string;
      body: string;
      flow: { label: string; text: string }[];
      slide?: { title?: string; image: string };
    }[];
  };
  /** LOCK-IN STRATEGY 양분 섹션 */
  lockInStrategy?: {
    title?: string;
    columns: {
      label: string;
      headline: string;
      flow: string[];
      loop?: boolean;
      body: string;
    }[];
  };
  /** PROBLEM 하단 가로 단계 카드 */
  situationSteps?: { label: string; title?: string; body?: string }[];
  /** Action 패널 제목. 기본: Action */
  actionTitle?: string;
  /** Action 상단 Journey Diagram */
  actionJourney?: { label: string; title: string }[];
  actions: { label?: string; title: string; summary?: string; body: string[] }[];
  /** Result 섹션 불릿 (없으면 result 문단 사용) */
  resultItems?: string[];
  /** Result 내 구분 섹션 (있으면 resultItems/result 대신 표시) */
  resultSections?: { label?: string; title: string; body?: string }[];
  /** Result 섹션 상단 소제목 (예: STRATEGY OUTPUT) */
  resultEyebrow?: string;
  /** Result summary 영역 라벨 (예: RESULT SUMMARY) */
  resultSummaryLabel?: string;
  result: string[];
  learned?: ProjectLearned;
  links?: { label: string; url: string }[];
};
