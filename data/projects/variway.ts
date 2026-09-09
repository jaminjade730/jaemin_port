import type { Project } from "./types";

export const variway: Project = {
    id: "variway",
    number: "03",
    category: "performance",
    categoryLabel: "PERFORMANCE MARKETING · RETENTION · MEDIA STRATEGY",
    title: "배리웨이 국내 고객 재구매 유도",
    brand: "배리웨이",
    subtitle: "한 번의 구매를,\n다시 구매하는 흐름으로.",
    oneLiner:
      "기존 구매 고객의 재구매를 목표로 고객 여정을 재인지 → 재고려 → 재전환으로 나누고, 단계별 메시지·광고 소재·미디어 믹스를 설계한 퍼포먼스 마케팅 프로젝트입니다.",
    hook: "Sell the routine, not the product",
    accent: "#C7003F",
    layout: "zigzag-pair",
    images: {
      hero: "/projects/variway/hero.jpg",
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
    summaryBar:
      "2026.07.10 – 2026.07.16 · Team Project · Performance Strategy · Media Mix · Creative",
    meta: [],
    glance: {
      title: "PROJECT AT A GLANCE",
      items: [
        {
          label: "₩10M",
          body: "가상 미디어 예산\n총 1,000만 원을 기준으로\n채널별 역할과 예산 배분 설계",
        },
        {
          label: "3 CHANNELS",
          body: "미디어 믹스\nMETA · KAKAO DA · NAVER SA\n고객 여정에 맞춰 3개 채널 활용",
        },
        {
          label: "65 · 20 · 15",
          body: "예산 배분\nMETA 65% · KAKAO 20% · NAVER 15%\n채널별 데이터와 역할을 기반으로 예산 배분",
        },
        {
          label: "3-STEP FUNNEL",
          body: "재구매 고객 여정\nRE-AWARE → RE-CONSIDER → RE-CONVERT\n기존 고객이 브랜드를 다시 인지하고\n재구매하기까지의 흐름 설계",
        },
      ],
    },
    situationTitle: "PROBLEM",
    situation: [
      "첫 구매 이후,\n고객과 브랜드의 관계는 어떻게 이어질까?",
      "배리웨이는 신규 고객 확보보다 이미 제품을 경험한 고객의 재구매를 어떻게 만들 것인가가 핵심 과제였습니다.",
    ],
    situationFlow: [
      "첫 구매",
      "제품 경험",
      "브랜드 접점 감소",
      "재구매로 이어질 명확한 이유 필요",
    ],
    situationFlowLabel: "PROBLEM",
    projectTask: {
      title: "TASK",
      lead: "그래서 우리가 해결해야 했던 문제",
      prompt:
        "“한 번 구매한 고객이 다시 배리웨이를 찾게 하려면 어떻게 해야 할까?”",
      goalsTitle: "PROJECT GOAL",
      goals: [
        {
          label: "01 RE-AWARE",
          title: "구매 이후 브랜드를 다시 떠올리게 만들기",
        },
        {
          label: "02 RE-CONSIDER",
          title: "단순 제품 기능이 아닌\n다시 구매할 이유 제공",
        },
        {
          label: "03 RE-CONVERT",
          title: "적절한 채널과 메시지를 통해\n실제 재구매 행동으로 연결",
        },
      ],
    },
    problemInsight: {
      title: "INSIGHT",
      lead: "제품 혜택이 아니라,\n다시 시작할 이유를.",
      before: {
        label: "COMPETITOR",
        title: "“이 제품을 왜 사야 하는가?”",
        text: "맛 · 할인 · 기능성",
      },
      after: {
        label: "VAR:WAY",
        title: "“왜 다시 시작해야 하는가?”",
        text: "건강한 일상의 지속",
      },
      insightLabel: "핵심 Insight",
      body: "재구매를 만들기 위해서는 같은 제품을 다시 광고하는 것이 아니라, 고객이 제품을 다시 필요로 하는 순간을 만들어야 한다고 판단했습니다.",
      inAction: true,
    },
    interactiveJourney: {
      title: "RETENTION FUNNEL",
      lead: "첫 구매 이후의 고객을\n다시 전환까지.",
      body: "RE-AWARE → RE-CONSIDER → RE-CONVERT",
      steps: [
        {
          label: "01 RE-AWARE",
          title: "다시 떠올리게",
          body: "기존 구매 고객에게\n배리웨이 브랜드와 건강관리 필요성 재인지",
        },
        {
          label: "02 RE-CONSIDER",
          title: "다시 필요하게",
          body: "제품의 기능적 가치와\n건강한 일상을 지속해야 할 이유 전달",
        },
        {
          label: "03 RE-CONVERT",
          title: "다시 구매하게",
          body: "검색 · 광고 · CTA를 통해\n실제 구매 행동으로 연결",
        },
      ],
    },
    creativeStrategy: {
      title: "CREATIVE STRATEGY",
      items: [
        {
          label: "MESSAGE",
          title: "다시 채울 시간",
        },
        {
          label: "FUNCTIONAL VALUE",
          title: "제품의 기능적 가치",
        },
        {
          label: "BEHAVIOR",
          title: "재구매 시점 환기",
        },
      ],
      materials: {
        label: "VIEW CREATIVE",
        groups: [
          {
            title: "META — Feed · Story",
            items: [
              {
                title: "Feed 광고 소재",
                image: "/projects/variway/meta-feed.png",
              },
              {
                title: "Story 광고 소재",
                video: "/projects/variway/meta-story.mp4",
              },
            ],
          },
          {
            title: "META — 캐러셀",
            items: [
              {
                title: "01 Cover",
                image: "/projects/variway/meta-carousel-01.png",
              },
              {
                title: "02 Morning Routine",
                image: "/projects/variway/meta-carousel-02.png",
              },
              {
                title: "03 Afternoon Snack",
                image: "/projects/variway/meta-carousel-03.png",
              },
              {
                title: "04 Night Reward",
                image: "/projects/variway/meta-carousel-04.png",
              },
              {
                title: "05 CTA",
                image: "/projects/variway/meta-carousel-05.png",
              },
            ],
          },
          {
            title: "NAVER SA · KAKAO DA",
            items: [
              {
                title: "NAVER SA 01",
                image: "/projects/variway/naver-sa-01.png",
              },
              {
                title: "NAVER SA 02",
                image: "/projects/variway/naver-sa-02.png",
              },
              {
                title: "KAKAO DA",
                image: "/projects/variway/kakao-da.png",
              },
            ],
          },
        ],
      },
    },
    mediaStrategy: {
      title: "MEDIA STRATEGY",
      lead: "모든 매체에 같은 역할을 주지 않았다.",
      channels: [
        {
          label: "META",
          share: "65%",
          stage: "RE-AWARE / RE-CONSIDER",
          body: "콘텐츠·광고 소재를 통해\n기존 고객에게 브랜드와 제품 가치 재노출",
        },
        {
          label: "KAKAO DA",
          share: "20%",
          stage: "RE-CONSIDER / RE-CONVERT",
          body: "구매 가능성이 있는 고객에게\n디스플레이 광고로 재접점 형성",
        },
        {
          label: "NAVER SA",
          share: "15%",
          stage: "RE-CONVERT",
          body: "제품·건강 관련 검색 수요를\n구매 행동으로 연결",
        },
      ],
      mix: {
        title: "MEDIA MIX",
        shares: "65% → 20% → 15%",
        flow: "META → KAKAO DA → NAVER SA",
        note: "총 1,000만 원의 가상 예산을 기준으로 설계.",
      },
    },
    actionTitle: "Action",
    actions: [],
    resultEyebrow: "STRATEGY OUTPUT",
    resultSummaryLabel: "RESULT SUMMARY",
    result: [
      "기존 고객의 재구매 과정을 재인지 → 재고려 → 재전환으로 구조화하고, 각 단계에 맞는 메시지·광고 소재·매체 역할·예산을 연결한 퍼포먼스 마케팅 전략을 설계했습니다.",
    ],
    resultSections: [
      {
        label: "3-STEP FUNNEL",
        title: "재구매 여정 설계",
        body: "Re-Aware → Re-Consider → Re-Convert",
      },
      {
        label: "₩10M MEDIA PLAN",
        title: "예산 운영 구조",
        body: "Meta · Kakao · Naver 역할 및 예산 배분",
      },
      {
        label: "3 CHANNEL ROLES",
        title: "매체별 역할 정의",
        body: "인지 · 고려 · 전환 단계에 따라\n매체 목적 분리",
      },
      {
        label: "RETENTION CREATIVE",
        title: "재구매 메시지",
        body: "기존 고객의 재구매 시점을 환기하는\n메시지·광고 소재 전략",
      },
    ],
    learned: {
      lead: "광고비를 나누는 것이 아니라,\n고객 행동에 예산을 배분하는 것.",
      highlight:
        "미디어 믹스는 단순히 예산을 채널별로 나누는 작업이 아니라, 고객이 어떤 단계에 있는지에 따라 각 매체의 역할과 메시지를 연결하는 과정이라는 것을 배웠습니다.",
      body: [
        "또한 데이터를 단순히 제시하는 데서 끝나는 것이 아니라, 어떤 데이터를 근거로 어떤 매체를 선택하고 얼마의 예산을 배분했는지 설명할 수 있어야 전략이 설득력을 가진다는 점을 경험했습니다.",
      ],
      flow: ["DATA", "FUNNEL", "MEDIA", "CREATIVE", "CONVERSION"],
    },
  };
