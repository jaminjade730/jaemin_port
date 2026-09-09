import type { Project } from "./types";

export const ikeaHejPark: Project = {
    id: "ikea-hej-park",
    number: "04",
    category: "campaign",
    categoryLabel: "BRAND STRATEGY · CUSTOMER EXPERIENCE · LOCK-IN",
    title: "IKEA Hej! Park",
    brand: "IKEA",
    subtitle: "이케아 재방문 프로젝트",
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
      priority: true,
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
  };
