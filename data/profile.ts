export const skills = [
  {
    title: "콘텐츠 기획",
    body: "콘텐츠의 목적과 타깃을 바탕으로 핵심 메시지부터 구성·비주얼 방향 기획",
  },
  {
    title: "광고 소재 기획",
    body: "타깃과 광고 목적에 맞춰 소구점을 설정하고, 후킹부터 CTA까지 광고 소재의 흐름 기획",
  },
  {
    title: "콘텐츠 제작",
    body: "기획한 아이디어를 이미지·숏폼 영상 등 실제 디지털 콘텐츠로 구현",
  },
  {
    title: "소비자 인사이트 도출",
    body: "타겟의 특성과 Pain Point를 분석해 콘텐츠의 핵심 소구점과 메시지를 도출",
  },
  {
    title: "마케팅 데이터 분석",
    body: "유입·행동·전환 및 광고 성과 지표를 분석해 문제 구간을 파악하고 개선 방향 도출",
  },
  {
    title: "AI 콘텐츠 제작",
    body: "생성형 AI를 활용해 기획 의도에 맞는 이미지·영상·음원 소스를 제작하고 콘텐츠로 구현",
  },
];

export const skillsSummary = "Consumer Insight × Creative × Execution";

export const positioning = {
  tagline:
    "고객과 데이터를 통해 문제를 발견하고, 콘텐츠와 마케팅 액션으로 직접 실행하며 개선합니다.",
  pillars: [
    {
      label: "01 Consumer Insight",
      body: "고객 행동과 데이터를 바탕으로 문제와 핵심 타깃 정의",
    },
    {
      label: "02 Creative",
      body: "인사이트를 메시지·콘텐츠·브랜드 경험으로 구체화",
    },
    {
      label: "03 Execution",
      body: "아이디어를 직접 실행하고 결과를 분석해 다음 액션으로 개선",
    },
  ],
};

export const focus = [
  { label: "Consumer Insight", level: 92 },
  { label: "Creative", level: 88 },
  { label: "Execution", level: 90 },
];

export type Tool = {
  name: string;
  icon: string;
};

export type ToolGroup = {
  category: string;
  description: string;
  tools: Tool[];
};

export const toolGroups: ToolGroup[] = [
  {
    category: "Design & Contents",
    description: "광고 소재 · 숏폼 · 프레젠테이션 제작",
    tools: [
      { name: "Figma", icon: "/tools/figma.svg" },
      { name: "Final Cut", icon: "/tools/finalcut.png" },
      { name: "CapCut", icon: "/tools/capcut.svg" },
      { name: "PowerPoint", icon: "/tools/powerpoint.svg" },
    ],
  },
  {
    category: "AI Creative",
    description: "이미지 · 영상 · 음원 소스 제작",
    tools: [
      { name: "Kling AI", icon: "/tools/kling.png" },
      { name: "Midjourney", icon: "/tools/midjourney.svg" },
      { name: "Suno", icon: "/tools/suno.svg" },
    ],
  },
  {
    category: "Analytics & Operations",
    description: "유입·행동·전환 분석 · 광고 성과 확인 · 프로젝트 관리",
    tools: [
      { name: "GA4", icon: "/tools/ga4.svg" },
      { name: "Meta Ads", icon: "/tools/meta.png" },
      { name: "Notion", icon: "/tools/notion.svg" },
    ],
  },
];

/** Flat list for strips / legacy consumers */
export const tools: Tool[] = toolGroups.flatMap((group) => group.tools);

export const education = [
  {
    school: "서산중앙고등학교",
    major: "바이오식품가공과",
    period: "2017년 03월 ~ 2020년 01월",
  },
  {
    school: "우송정보대학",
    major: "호텔관광학과",
    period: "2020년 03월 ~ 2022년 01월",
  },
];

export const history = [
  {
    company: "호텔 프리마",
    role: "F&B Intern",
    period: "2019년 7월 ~ 2019년 11월",
  },
  {
    company: "소노 호텔 앤 리조트",
    role: "Concierge",
    period: "2021년 7월 ~ 2021년 12월",
  },
  {
    company: "파라다이스 시티 호텔",
    role: "Leisure Supervisor",
    period: "2025년 2월 ~ 2025년 11월",
  },
];

export const activities = [
  {
    title: "스파르타 클럽 내일배움캠프",
    detail: "생성형 AI 기반 디지털 마케팅 전문가 5기",
    period: "2026년 4월 ~ 2026년 9월",
  },
  {
    title: "우송정보대학 학생회",
    detail: "학과 대표 · 호텔관광학과 홍보부",
    period: "",
  },
];
