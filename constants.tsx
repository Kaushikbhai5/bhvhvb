
import { 
  Users, 
  TrendingUp, 
  PenTool, 
  Wrench, 
  Twitter, 
  Linkedin, 
  Mail, 
  FileText, 
  Youtube, 
  Send 
} from 'lucide-react';
import { 
  SkillCategory, 
  Experience, 
  FeaturedWork, 
  ProofOfWork, 
  ContactLink 
} from './types';

export const HERO_CONTENT = {
  name: "Samad",
  title: "Web3 Community Manager",
  headline: "Building Active Web3 Communities.",
  subtext: "Community manager with 4 years of experience growing crypto communities through real engagement, clear communication, and consistent execution. I've worked with projects like Galxe, Web3Go (DIN), Nolus Protocol, Mantis, Tyche and many others across the Web3 ecosystem."
};

export const ABOUT_TEXTS = [
  "I'm a Web3 community manager with over 4 years of experience building and growing crypto communities.",
  "I started my journey in crypto back in 2021 and have since worked with multiple Web3 projects helping them improve engagement, onboard users, and create welcoming spaces for their communities.",
  "I've managed communities with over 700k+ members, led ambassador programs, organized AMAs and campaigns, and created content that makes complex DeFi concepts easy to understand.",
  "What I care about most is building real communities, not just growing numbers. My focus is always on activity, retention, and making users feel heard."
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Community Management",
    icon: Users,
    items: [
      "Discord & Telegram moderation",
      "Daily engagement strategies",
      "AMAs, contests, and events",
      "Ambassador programs",
      "Ticket support and user onboarding"
    ]
  },
  {
    category: "Growth & Engagement",
    icon: TrendingUp,
    items: [
      "Zealy and Galxe campaigns",
      "Community activation plans",
      "Regional growth (India)",
      "Retention strategies",
      "Feedback collection"
    ]
  },
  {
    category: "Content",
    icon: PenTool,
    items: [
      "Medium articles",
      "Twitter content",
      "Community announcements",
      "Guides and FAQs"
    ]
  },
  {
    category: "Tools",
    icon: Wrench,
    items: [
      "Discord bots",
      "Zealy",
      "Galxe",
      "Notion",
      "Google Sheets",
      "Basic automation"
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Galxe",
    role: "Community Moderator",
    desc: "Handled large-scale community moderation and user support.",
    points: [
      "Moderated and supported a large-scale Web3 community, ensuring fast onboarding help.",
      "Handled community queries professionally and reduced repeated issues using structured FAQs.",
      "Maintained safety and trust through rule enforcement, spam control, and scam prevention."
    ]
  },
  {
    company: "Web3Go (DIN)",
    role: "Community Manager",
    desc: "Managed Discord operations, engagement routines, and campaigns.",
    points: [
      "Managed Discord operations: moderation coverage, support flow, and engagement routines.",
      "Executed campaigns/events and helped improve retention through consistent activity.",
      "Simplified complex product/DeFi topics into beginner-friendly explanations."
    ]
  },
  {
    company: "Nolus Protocol",
    role: "Community Manager",
    desc: "Created educational content and ran engagement campaigns.",
    points: [
      "Created educational content and community updates to improve product understanding.",
      "Ran engagement activities and community campaigns to increase participation.",
      "Collected feedback, tracked sentiment, and reported insights to the team."
    ]
  },
  {
    company: "Mantis",
    role: "Regional Community Manager (India)",
    desc: "Led localized growth strategy for India.",
    points: [
      "Led localized growth strategy for India and kept community activity consistent.",
      "Hosted AMAs, contests, and community events to drive participation.",
      "Acted as a bridge between users and team, sharing feedback and market insights."
    ]
  }
];

export const FEATURED_WORK: FeaturedWork[] = [
  { 
    title: "Arbitrum Arc – CoW AMM Guide", 
    icon: FileText, 
    url: "https://medium.com/@samadsaifi403/the-arbitrum-arc-move-into-cow-amm-and-earn-big-with-50k-in-arb-rewards-87cf93a2c569",
    image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*ne1B5LRlmhzcgMpx.png",
    label: "Article",
    action: "Read on Medium"
  },
  { 
    title: "Get to Know Gems Launchpad", 
    icon: Youtube, 
    url: "https://youtube.com/@cryptolooters3287?si=c0bYuu_7tNuYaMm4",
    type: "video",
    videoId: "t0U0L2bb8zQ"
  },
  { 
    title: "CodeAssist - AI that learns from you", 
    icon: Twitter, 
    url: "https://x.com/samadsaifi56/status/1988790827670544563?s=20",
    image: "https://pbs.twimg.com/card_img/2014325493206790145/M_ILMOiV?format=png&name=small",
    label: "Post",
    action: "View on X"
  },
  { 
    title: "Swan Chain Mission: Mainnet Week 5", 
    icon: FileText, 
    url: "https://medium.com/@samadsaifi403/introducing-swan-chain-mission-mainnet-week-5-on-chain-dbbdaacc871d",
    image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*w4WXV2tbXu_RjuG0",
    label: "Article",
    action: "Read on Medium"
  },
];

export const PROOF_OF_WORK: ProofOfWork[] = [
  { 
    title: "Discord Activity", 
    desc: "Examples of engagement & support", 
    icon: Users,
    images: [
      "https://pbs.twimg.com/media/G_pJPNobAAIvxLF?format=png&name=small",
      "https://pbs.twimg.com/media/G_pMSaaX0AArBB8?format=png&name=small"
    ],
    isGallery: true
  },
  { 
    title: "Medium Articles", 
    desc: "Technical writing & guides", 
    icon: FileText, 
    url: "https://medium.com/@samadsaifi403" 
  },
  { 
    title: "Twitter Posts", 
    desc: "Announcements & threads", 
    icon: Twitter, 
    url: "https://x.com/samadsaifi56" 
  },
  { 
    title: "Events Screenshots", 
    desc: "Live event hosting proof", 
    icon: Youtube,
    images: [
      "https://pbs.twimg.com/media/G_pQE0RXoAAkZBC?format=jpg&name=large",
      "https://pbs.twimg.com/media/G_pQHgVbsAA7or-?format=jpg&name=large",
      "https://pbs.twimg.com/media/G_pQMhmbcAAXVNA?format=jpg&name=large",
      "https://pbs.twimg.com/media/G_p9RsasAA_MtV?format=jpg&name=small",
      "https://pbs.twimg.com/media/G_pQ_ylbAAIAxzc?format=jpg&name=small"
    ],
    isGallery: true
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  { label: "Twitter", icon: Twitter, url: "https://x.com/samadsaifi56", color: "text-sky-400" },
  { label: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/samad-saifi-343529283", color: "text-blue-500" },
  { label: "Medium", icon: FileText, url: "https://medium.com/@samadsaifi403", color: "text-white" },
  { label: "YouTube", icon: Youtube, url: "https://youtube.com/@cryptolooters3287?si=c0bYuu_7tNuYaMm4", color: "text-red-500" },
  { label: "Telegram", icon: Send, url: "https://t.me/samadsaifi55", color: "text-sky-300" },
  { label: "Email", icon: Mail, url: "mailto:samadsaifi304@gmail.com", color: "text-indigo-400" },
];
