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
  highlight: string;
  body?: string[];
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
  hook: string;
  accent: string;
  /** CSS background for hero / scope / rail. Falls back to accent. */
  accentGradient?: string;
  /** Stretch gradient across the whole chapter body. Default: false. */
  continuous?: boolean;
  /** Text tone on accent surfaces. Default: light (white text). */
  accentText?: "light" | "dark";
  layout: ProjectLayout;
  images?: {
    hero?: string;
    mid?: string;
    action?: string[];
    result?: string;
  };
  /** YouTube watch/share URL or video id — Overview 첫 칸에 임베드 */
  video?: string;
  scope: { label: string; percent: number }[];
  tools: string;
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
  /** PROBLEM 하단 VISIT MOTIVATION (BEFORE → AFTER) */
  problemInsight?: {
    title?: string;
    label?: string;
    before: { label?: string; text: string };
    after: { label?: string; text: string };
    insightLabel?: string;
    body: string;
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
  result: string[];
  learned?: ProjectLearned;
  /** Insight 섹션 (없으면 learned / result 사용) */
  insight?: string[];
  competencies?: { title: string; body: string }[];
  links?: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    id: "lonz",
    number: "01",
    category: "brand",
    categoryLabel: "BRANDING · CONSUMER INSIGHT · OPERATION",
    title: "LONZ",
    brand: "LONZ",
    subtitle:
      "예상 고객과 실제 고객의 차이를 발견하고,\n타깃과 상품을 재설계한 1인 브랜드 운영",
    oneLiner: "고객 관찰 → 타깃 재정의 → 상품 개선",
    hook: "Live in your noize",
    accent: "#2F3B2E",
    layout: "triptych",
    images: {
      hero: "/projects/lonz/hero.jpg",
    },
    scope: [
      { label: "Brand Identity", percent: 100 },
      { label: "Product Planning", percent: 100 },
      { label: "Content Marketing", percent: 100 },
      { label: "Channel Operation", percent: 100 },
    ],
    tools: "Figma · Final Cut · CapCut · Notion",
    links: [
      {
        label: "INSTAGRAM",
        url: "https://www.instagram.com/cafe_lonz/",
      },
    ],
    summaryBar:
      "2024.06–12　|　Solo Project　|　Brand Strategy · Product · Content · Operation",
    meta: [],
    glance: {
      title: "PROJECT AT A GLANCE",
      items: [
        {
          label: "6 MONTHS",
          body: "1인 브랜드 기획·운영",
        },
        {
          label: "2 WEEKS",
          body: "오픈 후 실제 고객 기반 타깃 재검토",
        },
        {
          label: "2-WEEK CYCLE",
          body: "스페셜티 커피 라인업 변경",
        },
        {
          label: "20s → 30–40s",
          body: "핵심 타깃 재설정",
        },
      ],
    },
    situationTitle: "PROBLEM",
    situation: ["내가 예상했던 고객과 실제 방문 고객은 달랐다"],
    situationCompare: {
      left: {
        label: "INITIAL ASSUMPTION",
        title: "20대",
        body: "취향과 스페셜티 커피에 관심 있는 고객을 핵심 타깃으로 설정",
      },
      right: {
        label: "ACTUAL CUSTOMER",
        title: "30–40대 여성 + 자녀 동반 고객",
        body: "아파트·학교·학원 상권 특성상 등하원 전후 방문 고객 다수 확인",
      },
    },
    situationSteps: [
      {
        label: "OBSERVATION",
        title: "예상과 다른 고객 패턴 발견",
        body: "약 2주간 실제 방문 고객을 관찰하며 30–40대 여성 및 자녀 동반 고객의 방문 확인",
      },
      {
        label: "INTERPRETATION",
        title: "상권의 생활 동선이 고객을 결정",
        body: "개인의 취향만으로 설정한 타깃보다 아파트·학교·학원 등 실제 상권 특성을 반영할 필요가 있다고 판단",
      },
      {
        label: "DECISION",
        title: "핵심 타깃 재설정",
        body: "20대 중심 타깃을 고수하지 않고 30–40대 여성 및 자녀 동반 고객으로 타깃 수정",
      },
    ],
    actions: [
      {
        label: "01 BRAND",
        title: "브랜드 아이덴티티 A–Z 구축",
        summary: "네이밍 · 로고 · 공간 · 메뉴 · 패키지 · SNS 콘텐츠",
        body: [
          "Live in your noize라는 브랜드 철학을 바탕으로 네이밍부터 로고, 공간, 메뉴판, 패키지, SNS 콘텐츠까지 브랜드를 구성하는 전반적인 요소를 직접 기획하고 제작했습니다.\n단순히 커피를 판매하는 공간이 아니라, 운영자의 취향과 관점이 공간·제품·콘텐츠 전반에서 일관되게 느껴지는 브랜드를 만들고자 했습니다.",
        ],
      },
      {
        label: "02 PRODUCT",
        title: "스페셜티 커피 진입장벽을 낮춘 경험 설계",
        summary: "Tea-like Coffee 중심 상품 구성 + 2주 주기 라인업 변경",
        body: [
          "지역에서 스페셜티 커피를 전문적으로 취급하는 카페가 드물다는 점을 차별화 요소로 활용했습니다.\n스페셜티 경험이 많지 않은 고객에게 전문성을 그대로 강조하기보다, 향이 풍부하면서 차처럼 편하게 즐길 수 있는 Tea-like Coffee를 중심으로 구성해 스페셜티 커피의 진입장벽을 낮추고자 했습니다.\n또한 새로운 커피 경험을 지속적으로 제공하기 위해 2주마다 스페셜티 커피 라인업을 변경하고, 커피의 특성과 어울리는 디저트를 함께 기획·판매했습니다.",
        ],
      },
      {
        label: "03 CUSTOMER",
        title: "실제 고객 관찰 기반 타깃 재설정",
        summary: "20대 → 30–40대 여성 및 자녀 동반 고객",
        body: [
          "오픈 초기에는 20대를 핵심 타깃으로 설정했지만, 약 2주간 매장을 운영하며 실제 방문 고객을 관찰한 결과 예상과 다른 고객 패턴을 발견했습니다.\n주변 아파트·학교·학원이라는 상권 특성으로 인해 아이의 등·하원 전후 카페를 방문하는 30–40대 여성 고객과 자녀 동반 고객의 방문이 많다는 점을 파악했습니다.\n이에 초기 타깃을 고수하지 않고 실제 방문 고객과 상권 특성을 바탕으로 핵심 타깃을 재설정했습니다.",
        ],
      },
      {
        label: "04 OPTIMIZATION",
        title: "타깃 변화에 따른 상품 포트폴리오 개선",
        summary: "스콘 · 르뱅쿠키 · 소프트아이스크림 등 상품군 확대",
        body: [
          "타깃 변경에 맞춰 성인 고객뿐 아니라 자녀와 함께 방문했을 때도 선택할 수 있는 상품이 필요하다고 판단했습니다.\n기존 커피 메뉴에 더해 영국식 스콘, 르뱅 쿠키, 소프트아이스크림 등 아이들도 부담 없이 즐길 수 있는 디저트와 음료를 개발해 상품군을 확장했습니다.\n이를 통해 고객 관찰 → 타깃 수정 → 니즈 발견 → 상품 개발로 이어지는 실제 상품 개선 과정을 경험했습니다.",
        ],
      },
    ],
    result: [],
    resultSections: [
      {
        label: "TARGET",
        title: "20대 → 30–40대",
        body: "실제 방문 고객과 상권 특성을 기반으로 핵심 타깃 재설정",
      },
      {
        label: "PRODUCT",
        title: "상품군 확대",
        body: "스콘 · 르뱅쿠키 · 소프트아이스크림 등 자녀 동반 고객을 고려한 상품 개발",
      },
      {
        label: "TOUCHPOINT",
        title: "Offline + Instagram + Naver Place",
        body: "매장부터 온라인 채널까지 브랜드 접점 직접 운영",
      },
    ],
    learned: {
      highlight:
        "처음 세운 타깃을 끝까지 고수하기보다 실제 고객의 행동을 관찰하고 전략을 수정하는 것이 중요하다는 것을 배웠습니다.",
      body: [
        "스페셜티 커피 역시 전문성을 그대로 전달하기보다 Tea-like Coffee처럼 고객이 받아들이기 쉬운 경험으로 풀어낼 필요가 있었습니다. 이를 통해 브랜드 정체성을 유지하면서도 실제 고객의 행동과 니즈에 맞춰 상품과 경험을 조정하는 과정을 배웠습니다.",
      ],
    },
  },
  {
    id: "ikea-hej-park",
    number: "02",
    category: "campaign",
    categoryLabel: "BRAND STRATEGY · CUSTOMER EXPERIENCE · LOCK-IN",
    title: "IKEA Hej! Park",
    brand: "IKEA",
    subtitle:
      "구매가 끝난 고객에게\n다시 IKEA를 방문할 이유를 만들다",
    oneLiner:
      "구매 이후 감소하는 고객 접점을 야외 브랜드 경험으로 확장하고, 체류·제품 경험·재방문까지 이어지는 Lock-in 구조를 설계했습니다.",
    summaryBar:
      "2026.05.13–05.19　|　Team Project　|　Strategy · Persona · UI/UX · Creative",
    hook: "Experience beyond purchase",
    accent: "#0058A3",
    layout: "zigzag-pair",
    images: {
      hero: "/projects/ikea-hej-park/01-banner.jpg",
      mid: "/projects/ikea-hej-park/04-mock.png",
      action: [
        "/projects/ikea-hej-park/04-mock.png",
        "/projects/ikea-hej-park/05-mock.png",
        "/projects/ikea-hej-park/06-mock.png",
      ],
      result: "/projects/ikea-hej-park/06-mock.png",
    },
    scope: [
      { label: "Competitor Analysis", percent: 80 },
      { label: "Creative Strategy", percent: 70 },
      { label: "Persona Design", percent: 70 },
      { label: "UI/UX Mockup", percent: 60 },
    ],
    tools: "Figma · Gemini",
    links: [
      {
        label: "캠페인 기획서",
        url: "https://drive.google.com/file/d/1yPdYHxy4Y_Ht1QE5bJfbwO7pmCDUKHiV/view?usp=sharing",
      },
    ],
    meta: [],
    glance: {
      title: "PROJECT AT A GLANCE",
      items: [
        {
          label: "3 TARGETS",
          body: "타깃별 방문 동기 설계\nFamily · Single · DIY",
        },
        {
          label: "2-LEVEL LOCK-IN",
          body: "체류 + 재방문\n당일 체류 확대부터 이후 관계 지속까지",
        },
        {
          label: "15%",
          body: "현장 구매 연결\n공간별 패키지 QR 구매 시 결합 할인",
        },
        {
          label: "3 MONTHS",
          body: "재방문 장치",
        },
      ],
    },
    situationTitle: "PROBLEM",
    situation: ["구매가 끝나면,\nIKEA와의 접점도 줄어든다."],
    situationFlow: [
      "대형 가구 구매",
      "긴 구매 주기",
      "방문 명분 감소",
      "브랜드 접점 단절",
    ],
    situationDetail: {
      label: "WHY COME BACK?",
      title:
        "“구매할 것이 없는 기존 고객에게 어떻게 다시 IKEA를 방문할 명분을 만들 수 있을까?”",
      body: "IKEA의 긴 구매 주기와 지리적 접근성 한계로 구매 이후 고객과의 접점이 감소하는 문제에 주목하고, 이탈 고객의 복귀와 브랜드 충성도 강화를 핵심 과제로 정의했습니다.",
    },
    situationResearch: [
      {
        title: "시장&경쟁사 분석",
        image: "/projects/ikea-hej-park/09-research-competitors.jpg",
      },
      {
        title: "SWOT 분석",
        image: "/projects/ikea-hej-park/10-research-swot.jpg",
      },
      {
        title: "전략적 제언",
        image: "/projects/ikea-hej-park/11-research-strategy.jpg",
      },
    ],
    problemInsight: {
      title: "VISIT MOTIVATION",
      before: {
        label: "BEFORE",
        text: "“가구를 사러 IKEA에 간다.”",
      },
      after: {
        label: "AFTER",
        text: "“구매 명분이 없어도 IKEA에서 시간을 보낸다.”",
      },
      body: "구매 혜택을 강화하기보다 IKEA가 가진 ‘오프라인 경험’을 야외 활동까지 확장한다면, 긴 구매 주기 사이에도 새로운 방문 명분과 고객 접점을 만들 수 있다고 판단했습니다.",
    },
    concept: {
      title: "CONCEPT",
      name: "HEJ! PARK",
      tagline: "도심 속 파란 쉼표",
      body: "가구를 구매하는 공간에서, 하루를 보내는 브랜드 경험 공간으로.",
      flow: [
        "INDOOR SHOWROOM",
        "OUTDOOR HEJ! PARK",
        "LONGER STAY",
        "MORE BRAND EXPERIENCE",
      ],
      outdoorPreviews: [
        {
          title: "Daytime",
          images: ["/projects/ikea-hej-park/12-outdoor-day.jpg"],
        },
        {
          title: "Sunset",
          images: ["/projects/ikea-hej-park/13-outdoor-sunset.jpg"],
        },
        {
          title: "Mockup",
          images: [
            "/projects/ikea-hej-park/07-mock.png",
            "/projects/ikea-hej-park/08-mock.png",
          ],
        },
      ],
    },
    targetStrategy: {
      title: "TARGET STRATEGY",
      lead: "하나의 경험도 고객이 움직이는 이유는 다르게.",
      badge: "3 TARGETS",
      targets: [
        {
          name: "YES-KIDS FAMILY",
          body: "아이와 함께 보내는 새로운 주말 경험",
          flow: [
            {
              label: "Motivation",
              text: "방문 유입 및 객단가 방어",
            },
            {
              label: "Media",
              text: "지역 맘카페 · Instagram Story",
            },
            {
              label: "Action",
              text: "사전 예약 링크 · F&B 쿠폰 유도",
            },
            {
              label: "KPI",
              text: "사전 예약 수 · F&B 쿠폰 전환율",
            },
          ],
          slide: {
            title: "YES-KIDS FAMILY · 매체 플래닝 & KPI",
            image: "/projects/ikea-hej-park/14-persona-family.jpg",
          },
        },
        {
          name: "SMART SINGLE LIFE",
          body: "새로운 공간과 소품을 발견하고 공유하는 경험",
          flow: [
            {
              label: "Motivation",
              text: "SNS 참여형 이벤트로 흥미 유발",
            },
            {
              label: "Media",
              text: "Instagram Reels · 오늘의집",
            },
            {
              label: "Action",
              text: "댓글 이벤트 · CTA 랜딩 유도",
            },
            {
              label: "KPI",
              text: "홍보 게시물 댓글 수 · CTA 전환율",
            },
          ],
          slide: {
            title: "SMART SINGLE LIFE · 매체 플래닝 & KPI",
            image: "/projects/ikea-hej-park/15-persona-single.jpg",
          },
        },
        {
          name: "DIY HACKERS",
          body: "IKEA 제품의 새로운 활용법을 발견하는 경험",
          flow: [
            {
              label: "Motivation",
              text: "크리에이터 영상에 자극된 소비 욕구",
            },
            {
              label: "Media",
              text: "캠핑 YouTube · QR 제품 스캔",
            },
            {
              label: "Action",
              text: "크리에이터 할인코드 · 현장 구매",
            },
            {
              label: "KPI",
              text: "할인코드 증정·사용률",
            },
          ],
          slide: {
            title: "DIY HACKERS · 매체 플래닝 & KPI",
            image: "/projects/ikea-hej-park/16-persona-diy.jpg",
          },
        },
      ],
    },
    lockInStrategy: {
      title: "LOCK-IN STRATEGY",
      columns: [
        {
          label: "01. SHORT-TERM LOCK-IN",
          headline: "STAY LONGER",
          flow: [
            "실내 쇼룸",
            "야외 Hej! Park",
            "F&B / 이벤트",
            "제품 체험",
            "QR 구매",
          ],
          body: "실내와 야외 경험을 연결해 IKEA 생태계 안에서의 체류와 제품 접점을 확대",
        },
        {
          label: "02. LONG-TERM LOCK-IN",
          headline: "COME BACK AGAIN",
          flow: [
            "제품 관심",
            "당일 Push 리마인드",
            "3개월 후 혜택",
            "재방문",
          ],
          loop: true,
          body: "페스티벌이 끝난 이후에도 다시 IKEA를 떠올리고 방문할 이유를 설계",
        },
      ],
    },
    actionTitle: "Action",
    actions: [],
    resultEyebrow: "STRATEGY OUTPUT",
    result: [
      "단발성 오프라인 페스티벌 아이디어를 타깃 유입 → 브랜드 경험 → 제품 관심·구매 → CRM → 재방문까지 연결되는 Lock-in 캠페인 구조로 구체화했습니다.",
    ],
    resultSections: [
      {
        label: "3 TARGETS",
        title: "타깃별 전략 구체화",
        body: "각 타깃의 Motivation · Media · KPI 설계",
      },
      {
        label: "2-LEVEL LOCK-IN",
        title: "체류 → 재방문 구조",
        body: "당일 브랜드 체류와 중장기 관계 지속 연결",
      },
      {
        label: "PACKAGE 15% OFF",
        title: "현장 구매 유도",
        body: "제품 QR 탐색 → 공간별 패키지 구매 시\n15% 결합 할인 혜택 설계",
      },
      {
        label: "3 MONTHS",
        title: "재방문 접점 설계",
        body: "행사 이후 다시 IKEA를 방문할 후속 혜택 마련",
      },
    ],
    learned: {
      highlight:
        "좋은 브랜드 아이디어도 고객 행동과 KPI까지 연결되지 않으면 전략으로 설득되기 어렵다는 점을 배웠습니다.",
      body: [
        "Hej! Park를 기획하며 고객이 왜 방문하고, 어떤 경험을 하며, 이후 어떤 행동으로 이어지는지를 설계했습니다. 이후 피드백과 회고를 통해 타깃별 메시지, UGC 확산, 퍼널별 매체 역할, 데이터 기반 세그먼트 검증까지 구체화해야 한다는 점을 확인했습니다.",
      ],
    },
  },
  {
    id: "korea-travel",
    number: "03",
    category: "content",
    categoryLabel: "AI Content Design",
    title: "한국 여행, 넌 어느 쪽?",
    brand: "Korea Tourism",
    subtitle:
      "‘전통 vs 현대’ 선택 구조로 시청자를 관광 경험에 참여시킨\nAI 한국 관광 콘텐츠",
    oneLiner:
      "글로벌 타깃 구체화 → 로컬 경험 선호 → 전통 vs 현대 → 1인칭 AI 영상 → 선택 후 관광지 탐색",
    hook: "Traditional vs Modern Korea",
    accent: "#5B3F8C",
    accentText: "light",
    layout: "zigzag",
    video: "https://youtu.be/Qztxuf9wMB8?si=9B2DyVkZVmvwhL6B",
    images: {
      mid: "/projects/korea-travel/mid.jpg",
      result: "/projects/korea-travel/result.jpg",
    },
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
    meta: [
      "Project Type 팀 프로젝트",
      "Role 시장 분석 · 페르소나 설계 · 배포 전략 · KPI 설정 · AI 이미지 제작 · AI 영상 제작 · 영상 편집",
      "Tools Canva · Figma · Final Cut Pro · Chat GPT · Kling AI",
      "Project Theme 한국 관광 · K-Wellness",
      "Project Goal 글로벌 타깃 대상 한국 관광 관심 및 탐색 행동 유도",
    ],
    callouts: [
      {
        label: "TARGET KPI",
        items: [
          "메인 영상 대비 시청률 90%",
          "조회수 2,800회",
          "평균 시청 지속률 70%",
        ],
        note: "실제 집행 성과가 아닌 프로젝트 목표값입니다.",
      },
    ],
    situation: [
      "“외국인 관광객에게 한국의 다양한 모습을 어떻게 직접 경험하는 것처럼 전달할 수 있을까?”",
      "외국인 관광객은 단순히 유명 관광지를 방문하는 것을 넘어, 현지에서만 경험할 수 있는 로컬 경험(Local Experience)을 선호하는 경향이 있다는 점에 주목했습니다.\n이에 국내 시각에 한정된 관광 콘텐츠에서 벗어나 글로벌 타깃을 대상으로, 한국의 전통과 현대라는 상반된 관광 경험을 몰입감 있게 전달하고 실제 관광지 탐색 행동까지 유도하는 콘텐츠를 기획하고자 했습니다.",
    ],
    actions: [
      {
        title: "글로벌 타깃 구체화",
        body: [
          "외국인 관광 트렌드와 방한 관광객 데이터를 조사해 신규 관광객 확보 가능성이 있는 시장을 분석하고, 단순히 ‘외국인’이라는 넓은 타깃에서 벗어나 미국·오스트리아 거주자를 중심으로 페르소나를 구체화했습니다.\n시장 데이터를 기반으로 문제를 정의하고 타깃을 구체화한 흐름은 튜터 피드백에서도 긍정적으로 평가받았습니다.",
        ],
      },
      {
        title: "‘전통 vs 현대’ 선택형 콘텐츠 기획",
        body: [
          "“도깨비가 건넨 두 장의 카드, 당신은 전통과 현대 중 어떤 한국을 선택하시겠습니까?”",
          "한국 여행을 일방적으로 소개하는 대신, 시청자가 ‘전통’과 ‘현대’ 중 하나를 직접 선택하는 A/B 구조를 기획했습니다.\n전통에서는 경복궁·한복·민속촌 등의 경험을, 현대에서는 성수동·K-콘서트·드론쇼 등의 경험을 제시해 서로 다른 한국 여행의 매력을 하나의 캠페인 안에서 전달하도록 구성했습니다.",
        ],
      },
      {
        title: "AI 기반 시네마틱 관광 콘텐츠 제작",
        body: [
          "시청자가 한국을 직접 여행하는 것처럼 느낄 수 있도록 1인칭 시점의 시네마틱 영상으로 콘텐츠를 제작했습니다.\nAI 기반 영상 제작을 활용해 장면 전환, 카메라 무빙, 색감과 분위기를 설계하고, 전통과 현대 영상의 콘셉트와 감성을 각각 차별화했습니다.\n실제 피드백에서도 장면 전환·카메라 무빙·색감·분위기가 자연스럽고 실제 캠페인 광고처럼 높은 몰입감을 구현했다는 평가를 받았습니다.",
        ],
      },
      {
        title: "선택 이후 탐색까지 이어지는 콘텐츠 퍼널 설계",
        body: [
          "단순 영상 시청에서 끝나지 않도록 A/B 선택 CTA → 맞춤 영상 → 관광지 탐색으로 이어지는 플로우를 설계했습니다.\nTarget KPI로 메인 영상 대비 시청률 90%, 조회수 2,800회, 평균 시청 지속률 70%를 설정하고, YouTube 광고 및 해시태그·CTA를 활용한 배포 전략까지 함께 기획했습니다.",
        ],
      },
    ],
    result: [],
    resultItems: [
      "광범위한 ‘외국인’ 타깃을 미국·오스트리아 중심의 페르소나로 구체화",
      "한국 관광 경험을 ‘전통 vs 현대’ 선택형 콘텐츠로 구조화",
      "기획 의도를 1인칭 AI 시네마틱 영상의 시점·장면·색감으로 일관되게 구현",
      "A/B 선택 CTA → 맞춤 영상 → 관광지 탐색으로 이어지는 콘텐츠 퍼널 설계",
    ],
    learned: {
      highlight:
        "완성도 높은 결과물만큼 ‘왜 이 타깃인가’, ‘왜 이 콘셉트인가’를 데이터와 논리로 설명하는 과정이 중요하다는 점을 배웠습니다.",
      body: [
        "AI를 단순 제작 효율화 도구가 아니라 기획 의도를 실제 경험으로 구현하는 크리에이티브 수단으로 활용한 프로젝트였습니다.",
      ],
    },
  },
  {
    id: "variway",
    number: "04",
    category: "performance",
    categoryLabel: "Performance Marketing",
    title: "배리웨이 국내 고객 재구매 유도",
    brand: "배리웨이",
    subtitle:
      "기존 고객의 재구매 과정을 ‘재인지 → 재고려 → 재전환’으로\n나눠 설계한 퍼포먼스 전략",
    hook: "Sell the routine, not the product",
    accent: "#C7003F",
    layout: "zigzag",
    images: {
      hero: "/projects/variway/hero.jpg",
      mid: "/projects/variway/page-0.jpg",
      result: "/projects/variway/page-1.jpg",
    },
    scope: [
      { label: "Market Analysis", percent: 80 },
      { label: "Strategy", percent: 70 },
      { label: "Media Mix", percent: 70 },
      { label: "Creative Planning", percent: 60 },
    ],
    tools: "Canva · Figma · Final Cut Pro",
    links: [
      {
        label: "캠페인 기획서",
        url: "https://drive.google.com/file/d/1qkV03OleEJRteSgNhiXTTCIrfiaOv400/view?usp=sharing",
      },
    ],
    meta: [
      "Project Type 팀 프로젝트",
      "Role 시장 분석 · 자료 조사 · 경쟁사 포지셔닝 · 페르소나 설정 · 전략 수립 · 미디어 믹스 · PPT 제작",
      "Tools Canva · Figma · Final Cut Pro",
      "Brand 배리웨이(var:way)",
      "Project Goal 기존 고객 재인지 및 재구매 전환 유도",
    ],
    callouts: [
      {
        label: "PLANNING DATA",
        items: [
          "가상 예산 1,000만 원",
          "Meta 65%",
          "Kakao DA 20%",
          "Naver SA 15%",
        ],
      },
      {
        label: "MEDIA BASIS",
        items: [
          "Kakao 구매 전환 경로 비중 38.49%",
          "Naver 도메인 구매율 11.49%",
        ],
        note: "실제 광고 집행 성과가 아닌 미디어 믹스 설계를 위한 분석·기획 데이터입니다.",
      },
    ],
    situation: [
      "“한 번 구매한 고객이 다시 배리웨이를 찾게 하려면 어떻게 해야 할까?”",
      "건강기능식품 시장은 정체된 반면 단백질 카테고리는 성장하고 있으며, 특히 20·30대 여성이 주요 소비층이라는 시장 데이터를 바탕으로 핵심 타깃을 구체화했습니다.\n경쟁사들이 맛·할인·기능성을 중심으로 제품 구매 혜택을 강조하고 있다는 점에 주목해, 배리웨이를 단순 제품이 아닌 ‘건강한 일상을 지속하도록 돕는 브랜드’로 재인지시키고 기존 고객의 재구매를 유도하는 퍼포먼스 마케팅 전략을 수립하고자 했습니다.",
    ],
    actions: [
      {
        title: "시장·경쟁사 분석을 통한 차별화 방향 도출",
        body: [
          "경쟁 브랜드의 광고가 주로 맛·할인·기능성을 중심으로 제품 구매 혜택을 강조하고 있다는 점을 분석했습니다.\n이에 동일한 소구 경쟁에서 벗어나 ‘제품이 아닌 건강 루틴을 판매한다’는 방향을 설정하고, 제품 기능보다 소비자의 일상 속 사용 경험을 중심으로 브랜드를 각인시키는 전략을 도출했습니다.",
        ],
      },
      {
        title: "재구매 타깃 및 페르소나 구체화",
        body: [
          "시장과 고객 데이터를 기반으로 핵심 타깃을 설정하고, 운동과 식단 관리에 관심이 있으면서 바쁜 일상에서 간편하게 식사를 해결하고자 하는 소비자의 니즈를 구체화했습니다.\n이를 바탕으로 재구매 고객의 라이프스타일과 제품 이용 상황을 반영한 페르소나를 설계하고 캠페인 메시지와 연결했습니다.",
        ],
      },
      {
        title: "재인지 → 재고려 → 재전환 퍼널 및 KPI 설계",
        body: [
          "기존 고객의 재구매 과정을 하나의 전환으로 보지 않고 재인지 → 재고려 → 재전환으로 구분했습니다.\n각 단계에 Meta·Kakao·Naver의 역할을 설정하고 CTR, 장바구니 전환율, 재구매 전환율, ROAS 등 고객 행동 단계에 따른 KPI를 설계했습니다.",
        ],
      },
      {
        title: "매체별 광고 크리에이티브 기획·제작",
        body: [
          "Meta 피드·스토리·캐러셀, 카카오 비즈보드, 네이버 파워링크 등 각 매체의 노출 방식과 사용자 행동을 고려한 광고 소재를 기획·제작했습니다.",
          "특히 제품을 일회성 섭취가 아닌 일상의 루틴으로 인식시키기 위한 콘텐츠를 기획하고, 네이버 SA에서는 실제 검색량을 조사해 ‘단백질쉐이크’ 등의 일반 키워드와 ‘단쉐’와 같은 롱테일 키워드를 병행하는 검색 전략을 설계했습니다.",
        ],
      },
      {
        title: "채널 데이터 기반 미디어 믹스 설계",
        body: [
          "총 1,000만 원의 가상 광고 예산을 기준으로 각 채널의 유입 및 구매 전환 데이터를 분석해 Meta 65% · Kakao DA 20% · Naver SA 15%의 미디어 믹스를 설계했습니다.\n카카오의 구매 전환 경로 비중 38.49%, 네이버의 도메인 구매율 11.49% 등 채널별 데이터를 활용해 매체 역할과 예산 배분의 근거를 마련했습니다.",
        ],
      },
    ],
    result: [],
    resultItems: [
      "기존 고객의 재구매 여정을 재인지 → 재고려 → 재전환 퍼널로 정의",
      "단계별로 CTR · 장바구니 전환율 · 재구매 전환율 · ROAS KPI 설계",
      "총 1,000만 원 가상 예산 기준 Meta 65% · Kakao DA 20% · Naver SA 15% 미디어 믹스 구성",
      "Meta·Kakao·Naver의 매체 특성에 맞춘 광고 크리에이티브와 검색 키워드 전략 설계",
      "채널별 전환 데이터를 바탕으로 매체 역할과 예산 배분 근거 구체화",
    ],
    learned: {
      highlight:
        "재구매 고객도 하나의 집단이 아니라 구매 횟수·주기·이탈 행동에 따라 세분화해야 메시지와 매체 전략이 정교해진다는 점을 배웠습니다.",
      body: [
        "매체 예산 역시 단순 유입 규모보다 캠페인 목표와 각 채널의 전환 기여도를 기준으로 배분해야 한다는 인사이트를 얻었습니다.",
      ],
    },
  },
  {
    id: "lov3-room",
    number: "05",
    category: "content",
    categoryLabel: "Contents Design",
    title: "lov3_room",
    brand: "lov3_room",
    subtitle: "사랑에 대한 생각과 이야기를 기록하는\n개인 Instagram 콘텐츠 채널",
    hook: "Stories of love, told together",
    accent: "#C45C6A",
    layout: "triptych",
    scope: [
      { label: "Content Planning", percent: 100 },
      { label: "Copywriting", percent: 100 },
      { label: "Content Production", percent: 100 },
      { label: "Channel Operation", percent: 100 },
    ],
    tools: "Figma · Final Cut Pro",
    links: [
      {
        label: "INSTAGRAM",
        url: "https://www.instagram.com/lov3_room/",
      },
    ],
    meta: [
      "Project Type 개인 프로젝트",
      "Channel Instagram @lov3_room",
      "Tools Figma · Final Cut Pro",
      "Role 콘텐츠 기획 · 카피라이팅 · 콘텐츠 제작 · 채널 운영",
      "Project Goal 개인의 생각을 콘텐츠로 표현하고, 다양한 사람의 사랑 이야기가 모이는 채널로 확장",
    ],
    situation: [
      "“내가 가진 생각과 이야기를 콘텐츠로 표현하고, 하나의 채널로 브랜딩할 수 없을까?”",
      "콘텐츠를 단순히 정보를 전달하거나 조회수를 얻기 위한 수단이 아닌, 내가 가진 생각과 관점을 표현하는 하나의 방식이라고 생각했습니다.",
      "그중 누구나 경험하지만 사람마다 다르게 정의하는 ‘사랑’을 주제로 선정해, 나만의 생각과 시선을 콘텐츠로 기록하는 개인 채널 lov3_room을 시작했습니다.",
      "단순히 개인적인 이야기를 기록하는 데 그치지 않고, 일관된 주제와 메시지를 가진 하나의 채널로 브랜딩하고 다른 사람의 이야기까지 함께 담을 수 있는 공간으로 확장하는 것을 목표로 운영했습니다.",
    ],
    actions: [
      {
        title: "‘사랑’을 중심으로 채널 아이덴티티 구축",
        body: [
          "사랑을 하나의 정답으로 정의하기보다 각자가 경험한 사랑의 모습을 발견하고 기록하는 공간으로 채널의 방향성을 설정했습니다.\n사랑의 정의, 첫사랑, 사랑의 언어, 연애 콘텐츠 등 하나의 주제 안에서 다양한 소재를 발굴하며 lov3_room만의 콘텐츠 영역을 구축했습니다.",
        ],
      },
      {
        title: "생각과 관점을 콘텐츠로 시각화",
        body: [
          "개인적으로 느끼고 생각했던 사랑에 대한 질문과 이야기를 카피·이미지·영상 콘텐츠로 직접 기획하고 제작했습니다.\n단순히 정보를 정리하기보다, 사용자가 콘텐츠를 보며 자신의 경험을 떠올릴 수 있도록 Hook → 이야기 → 질문과 여운으로 이어지는 콘텐츠 흐름을 설계했습니다.",
        ],
      },
      {
        title: "팔로워 사연을 활용한 참여형 콘텐츠로 확장",
        body: [
          "채널 운영 과정에서 나의 이야기만 전달하는 데 그치지 않고 사람들에게 직접 사랑에 관한 사연과 생각을 받아 콘텐츠로 제작했습니다.",
          "이를 통해 lov3_room을 운영자의 생각만 보여주는 채널에서 다양한 사람의 사랑에 대한 경험과 관점이 모이는 공간으로 확장하고, 팔로워가 콘텐츠의 독자를 넘어 이야기의 참여자가 될 수 있는 콘텐츠 구조를 만들었습니다.",
        ],
      },
      {
        title: "콘텐츠 성과 분석 및 운영 방향 개선",
        body: [
          "Instagram Insights를 활용해 콘텐츠별 조회와 반응을 확인하며 어떤 주제와 포맷이 실제 사용자 반응을 만들어내는지 분석했습니다.\n90일 기준 총 조회 3,587회, 콘텐츠 반응 211회, 프로필 방문 420회, 소개 링크 클릭 38회를 기록했으며 전체 조회의 32.7%가 비팔로워에게서 발생했습니다.",
          "특히 게시물에서 약 3,200회의 조회와 200회의 반응이 발생해, 현재 채널에서는 이야기 중심의 게시물 콘텐츠가 핵심 포맷으로 작동하고 있음을 확인했습니다.",
        ],
      },
    ],
    result: [
      "lov3_room을 운영하며 콘텐츠는 단순히 정보를 전달하는 결과물이 아니라, 내가 가진 생각과 관점을 사람들에게 전달하고 하나의 정체성을 만들어가는 브랜딩 수단이 될 수 있다는 점을 경험했습니다. 처음에는 나의 생각을 기록하는 것에서 시작했지만, 다른 사람의 사연을 받아 콘텐츠로 만들면서 채널이 개인의 이야기를 넘어 다양한 사람의 경험과 관점이 모이는 공간으로 확장되는 과정도 경험했습니다. 이를 통해 좋은 콘텐츠는 일방적으로 메시지를 전달하는 것에 그치지 않고, 사람들이 자신의 이야기를 떠올리고 직접 참여하고 싶게 만드는 것이라는 점을 배웠습니다.",
    ],
    resultItems: [
      "90일 기준 총 조회 3,587회 · 콘텐츠 반응 211회",
      "프로필 방문 420회 · 소개 링크 클릭 38회",
      "전체 조회의 32.7%가 비팔로워에게서 발생",
      "게시물 중심 포맷이 핵심 반응 채널로 작동",
    ],
    learned: {
      highlight:
        "좋은 콘텐츠는 일방적으로 메시지를 전달하는 것에 그치지 않고, 사람들이 자신의 이야기를 떠올리고 직접 참여하고 싶게 만드는 것이라는 점을 배웠습니다.",
      body: [
        "lov3_room을 운영하며 콘텐츠는 정보를 전달하는 결과물이 아니라, 생각과 관점을 전달하며 하나의 정체성을 만들어가는 브랜딩 수단이 될 수 있다는 점을 경험했습니다.",
      ],
    },
  },
];
