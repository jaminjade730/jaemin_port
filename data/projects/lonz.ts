import type { Project } from "./types";

export const lonz: Project = {
    id: "lonz",
    number: "01",
    category: "brand",
    categoryLabel: "BRANDING · CONSUMER INSIGHT · OPERATION",
    title: "LONZ",
    brand: "LONZ",
    subtitle: "타깃과 상품을 설계한 개인 카페 브랜드 운영",
    oneLiner: "고객 관찰 → 타깃 재정의 → 상품 개선",
    hook: "Live in your noize",
    accent: "#2F3B2E",
    layout: "triptych",
    images: {
      hero: "/projects/lonz/hero.jpg",
      priority: true,
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
        title: "30~40대 고객 방문 증가",
      },
      {
        label: "PRODUCT",
        title: "자녀 동반 고객 고려 상품 매출 증가",
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
  };
