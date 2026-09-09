import type { Project } from "./types";

export const koreaTravel: Project = {
    id: "korea-travel",
    number: "03",
    category: "content",
    categoryLabel: "CONTENT STRATEGY · INTERACTIVE · AI CREATIVE",
    title: "한국 여행, 넌 어느 쪽?",
    brand: "Korea Tourism",
    subtitle:
      "‘전통 vs 현대’ 선택 구조로 시청자를 관광 경험에 참여시킨\nAI 한국 관광 콘텐츠",
    oneLiner:
      "한국의 전통과 현대를 A/B 선택 구조로 나누고, 시청자의 선택이 각기 다른 여행 경험으로 이어지는 인터랙티브 관광 콘텐츠를 기획했습니다.",
    hook: "Traditional vs Modern Korea",
    accent: "#5B3F8C",
    layout: "zigzag-pair",
    video: "https://youtu.be/c4ovSfYOkhw?si=T_lseob8CbnX_bjs",
    images: { priority: true },
    scope: [
      { label: "Market Analysis", percent: 70 },
      { label: "Persona Design", percent: 70 },
      { label: "AI Video Production", percent: 80 },
      { label: "KPI & Distribution", percent: 70 },
    ],
    tools: "Canva · Figma · Final Cut Pro · Chat GPT · Kling AI",
    links: [
      {
        label: "캠페인 기획서",
        url: "https://drive.google.com/file/d/1e5GwqPL1rb-u7l4LXpgCpug6eQ23yk7M/view?usp=sharing",
      },
    ],
    summaryBar:
      "2026.06.12 – 2026.06.25 · Team Project · Content Strategy · Interactive Content · AI Creative",
    meta: [],
    glance: {
      title: "PROJECT AT A GLANCE",
      items: [
        {
          label: "2 ROUTES",
          body: "선택형 여행 경험\nTRADITION ↔ MODERN\n취향에 따라 두 가지 관광 콘텐츠로 분기",
        },
        {
          label: "4-STEP JOURNEY",
          body: "인터랙티브 사용자 여정\nWATCH → CHOOSE → EXPERIENCE → EXPLORE\n시청부터 관광지 탐색까지 행동 흐름 설계",
        },
        {
          label: "POV × AI",
          body: "시네마틱 콘텐츠 제작\n1인칭 시점과 AI 영상 제작을 결합해\n직접 여행하는 듯한 관광 경험 구현",
        },
        {
          label: "3 TARGET KPIs",
          body: "성과 측정 기준 설계\n시청률 · 조회수 · 평균 시청 지속률을\n콘텐츠 핵심 측정 지표로 설정",
        },
      ],
    },
    situationTitle: "PROBLEM",
    situation: [
      "한국의 다양한 매력을\n한 편의 관광 영상으로 어떻게 전달할까?",
      "한국은 전통문화부터 현대적인 K-컬처까지 서로 다른 관광 매력을 가지고 있습니다.",
      "하지만 다양한 관광지를 하나의 영상 안에서 일방적으로 나열하는 방식만으로는 시청자가 자신의 관심사와 연결해 능동적으로 콘텐츠를 경험하기 어렵다고 판단했습니다.",
    ],
    situationFlow: [
      "다양한 관광 자원",
      "일방적인 정보 전달",
      "수동적인 영상 시청",
      "개인의 관심과 행동으로 연결되기 어려움",
    ],
    situationFlowLabel: "PROBLEM FLOW",
    projectTask: {
      title: "TASK",
      lead: "그래서 우리가 해결해야 했던 문제",
      prompt:
        "“한국의 다양한 매력을 시청자가 직접 선택하고 경험하게 만들 수 없을까?”",
      goalsTitle: "PROJECT GOAL",
      goals: [
        {
          label: "01 PARTICIPATION",
          title: "일방적 시청 → 직접 선택",
          body: "단순히 영상을 보는 것에서\n시청자가 직접 콘텐츠에 참여하도록 전환",
        },
        {
          label: "02 PERSONALIZATION",
          title: "하나의 소개 → 취향별 경험",
          body: "하나의 한국을 보여주는 대신\n관심사에 따라 서로 다른 여행 경험 제공",
        },
        {
          label: "03 EXPLORATION",
          title: "영상 시청 → 관광지 탐색",
          body: "콘텐츠 소비에서 끝나지 않고\n실제 관광지에 대한 관심과 탐색으로 연결",
        },
      ],
    },
    problemInsight: {
      title: "INSIGHT",
      lead: "보여주는 것보다\n선택하게 만들자.",
      before: {
        label: "BEFORE",
        text: "“한국의 다양한 관광지를 보여준다.”",
      },
      after: {
        label: "AFTER",
        text: "“어떤 한국을 여행할지는 시청자가 선택한다.”",
      },
      body: "다양한 관광지를 하나의 영상에 나열하기보다 ‘전통 vs 현대’라는 직관적인 선택 구조로 나누면 시청자가 자신의 취향에 맞는 한국을 능동적으로 경험할 수 있다고 판단했습니다.",
      inAction: true,
    },
    interactiveConcept: {
      title: "INTERACTIVE CONCEPT",
      headline: "한국 여행, 넌 어느 쪽?",
      left: {
        label: "TRADITION",
        title: "전통적인 한국",
        body: "경복궁 · 한복 · 민속촌",
        video: "https://www.youtube.com/watch?v=Qztxuf9wMB8",
      },
      right: {
        label: "MODERN",
        title: "현대적인 한국",
        body: "성수동 · K-콘서트 · 드론쇼",
        video: "https://www.youtube.com/watch?v=Oml3JtqvMKc",
      },
      versus: "VS",
      body: "하나의 한국을 설명하는 대신, 두 개의 한국 중 하나를 직접 선택하게 했습니다.",
    },
    interactiveJourney: {
      title: "INTERACTIVE JOURNEY",
      lead: "보는 콘텐츠에서\n선택하고 탐색하는 콘텐츠로.",
      body: "영상 시청에서 끝나지 않고, 선택 → 맞춤 경험 → 관광지 탐색까지 이어지는 사용자 행동 흐름을 설계했습니다.",
      steps: [
        {
          label: "01 WATCH",
          title: "MAIN FILM",
          body: "한국 여행에 대한 관심 형성",
        },
        {
          label: "02 CHOOSE",
          title: "TRADITION ↔ MODERN",
          body: "A/B 선택 CTA",
        },
        {
          label: "03 EXPERIENCE",
          title: "PERSONALIZED FILM",
          body: "선택에 따른 맞춤 여행 영상 경험",
        },
        {
          label: "04 EXPLORE",
          title: "TRAVEL DISCOVERY",
          body: "영상 이후 실제 관광지 탐색",
        },
      ],
    },
    aiCreative: {
      title: "AI CREATIVE",
      lead: "선택한 한국을\n직접 여행하는 것처럼.",
      body: "기획한 인터랙티브 경험을 1인칭 시점의 AI 영상으로 직접 구현한 영역.",
      items: [
        {
          label: "POV",
          title: "FIRST-PERSON EXPERIENCE",
          body: "관광지를 바라보는 관찰자가 아닌\n직접 여행하는 사람의 시점으로 구성",
        },
        {
          label: "CINEMATIC",
          title: "VISUAL DIRECTION",
          body: "장면 전환 · 카메라 무빙 · 색감과 분위기를 설계해 시네마틱한 여행 경험 구현",
        },
        {
          label: "AI PRODUCTION",
          title: "CONTENT EXECUTION",
          body: "AI를 활용해 전통과 현대의 서로 다른 관광 경험을 영상으로 제작",
        },
      ],
      images: [
        {
          src: "/projects/korea-travel/ai-tradition.jpg",
          alt: "전통 한국 여행 1인칭 AI 장면",
          label: "TRADITION",
        },
        {
          src: "/projects/korea-travel/ai-modern.jpg",
          alt: "현대 한국 여행 1인칭 AI 장면",
          label: "MODERN",
        },
      ],
    },
    distributionKpi: {
      title: "DISTRIBUTION & TARGET KPI",
      lead: "콘텐츠 제작에서\n배포와 측정 설계까지.",
      distribution: {
        title: "DISTRIBUTION",
        items: ["YOUTUBE ADS", "HASHTAG", "CTA"],
      },
      kpis: {
        title: "TARGET KPI",
        items: [
          { value: "90%", label: "메인 영상 대비 목표 시청률" },
          { value: "2,800", label: "목표 조회수" },
          { value: "70%", label: "목표 평균 시청 지속률" },
        ],
      },
      body: "YouTube 광고 및 해시태그·CTA를 활용한 배포 전략과 함께 위 KPI를 목표값으로 설정했습니다.",
    },
    actionTitle: "Action",
    actions: [],
    resultEyebrow: "STRATEGY OUTPUT",
    resultSummaryLabel: "RESULT SUMMARY",
    result: [
      "일방적으로 관광지를 소개하는 영상에서 벗어나, 시청자의 선택에 따라 콘텐츠가 분기되고 실제 관광지 탐색까지 이어지는 인터랙티브 관광 콘텐츠 구조를 설계하고 AI 영상으로 구현했습니다.",
    ],
    resultSections: [
      {
        label: "2 ROUTES",
        title: "선택형 콘텐츠 구조",
        body: "Tradition / Modern\n두 가지 관광 경험으로 콘텐츠 분기",
      },
      {
        label: "4-STEP JOURNEY",
        title: "사용자 행동 구조",
        body: "Watch → Choose → Experience → Explore",
      },
      {
        label: "POV × AI",
        title: "콘텐츠 구현",
        body: "1인칭 시네마틱 AI 관광 영상 제작",
      },
      {
        label: "3 TARGET KPIs",
        title: "성과 측정 구조",
        body: "시청률 · 조회수 · 평균 시청 지속률",
      },
    ],
    learned: {
      lead: "콘텐츠를 만드는 것에서\n사용자 행동을 설계하는 것으로.",
      highlight:
        "콘텐츠의 몰입도를 높이기 위해서는 무엇을 보여줄지뿐 아니라, 사용자가 어떤 행동을 하게 만들 것인지까지 설계해야 한다는 것을 배웠습니다.",
      body: [
        "영상의 비주얼 완성도만 고민하는 것이 아니라, 시청 → 선택 → 경험 → 탐색으로 이어지는 사용자 여정을 설계하면서 콘텐츠 기획의 범위를 확장했습니다.",
      ],
      flowLabel: "최종 사고 흐름",
      flow: ["CONTENT", "INTERACTION", "EXPERIENCE", "ACTION"],
    },
  };
