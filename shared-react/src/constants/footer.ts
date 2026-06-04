import type { FooterLinks } from "@shared-react/types/app";

export const footerLinks: FooterLinks[] = [
  {
    title: "COMPANY",
    content: [
      { title: "Who We Are", link: "/company/about" },
      { title: "Our Team", link: "/company/team" },
      { title: "Careers", link: "/company/careers" },
      { title: "Newsroom", link: "/company/news" },
    ],
  },
  {
    title: "HELP",
    content: [
      { title: "Support Center", link: "/help/support-center" },
      { title: "Live Chat", link: "/help/chat" },
      { title: "Report a Problem", link: "/help/report" },
      { title: "System Status", link: "/help/status" },
    ],
  },
  {
    title: "FAQ",
    content: [
      { title: "Account Issues", link: "/faq/account" },
      { title: "Billing Questions", link: "/faq/billing" },
      { title: "Technical Support", link: "/faq/tech" },
      { title: "Shipping Info", link: "/faq/shipping" },
    ],
  },
  {
    title: "RESOURCES",
    content: [
      { title: "Blog", link: "/resources/blog" },
      { title: "Ebooks", link: "/resources/ebooks" },
      { title: "Webinars", link: "/resources/webinars" },
      { title: "Community Forum", link: "/resources/forum" },
    ],
  },
];
