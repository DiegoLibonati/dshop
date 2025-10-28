import { FooterSectionId } from "@src/entities/app";

export const FOOTER_LINKS: Record<FooterSectionId, Record<string, string>> = {
  company: {
    whoWeAre: "/company/about",
    ourTeam: "/company/team",
    careers: "/company/careers",
    newsroom: "/company/news",
  },
  help: {
    supportCenter: "/help/support-center",
    liveChat: "/help/chat",
    reportProblem: "/help/report",
    systemStatus: "/help/status",
  },
  faq: {
    accountIssues: "/faq/account",
    billingQuestions: "/faq/billing",
    technicalSupport: "/faq/tech",
    shippingInfo: "/faq/shipping",
  },
  resources: {
    blog: "/resources/blog",
    ebooks: "/resources/ebooks",
    webinars: "/resources/webinars",
    communityForum: "/resources/forum",
  },
};
