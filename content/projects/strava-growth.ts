import type { Project } from "@/lib/types";

const stravaGrowth: Project = {
  slug: "strava-growth",
  title: "Growing subscribers with human context",
  company: "Strava",
  role: "Senior Growth Designer",
  year: "2021-22",
  duration: "1 year",
  problem: "Early subscription growth efforts didn't always perform well, lacking connection to human problems & context",
  solution: "I shifted the team's approach to focus on real athlete challenges, helping drive $6.3MM in additional annual subscription revenue",
  skills: [
    "!Senior Product Designer",
    "!Growth Design",
    "Data Analysis",
    "Hypothesis Driven Design",
    "Marcomm Design",
    "Mobile App",
    "Multi-variant Experiments",
    "Research",
    "Web App",
    "Ideation Workshop",
  ],
  team: [
    {
      name: "Strava",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745850731/strava_voveuq.webp",
      href: "https://www.linkedin.com/company/strava-inc./",
    },
    {
      name: "Allison Boyd",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852355/allison-boyd_nuiq0t.webp",
      href: "https://www.linkedin.com/in/allison-boyd9/",
      role: "Senior PMM",
    },
    {
      name: "Andros Slowley",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852356/andros-slowley_yxs5wq.webp",
      href: "https://www.linkedin.com/in/androsslowley/",
      role: "Senior iOS Engineer",
    },
    {
      name: "Faraz Mohamed Rafi",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852356/faraz_znjezr.webp",
      href: "https://www.linkedin.com/in/greybeard1123/",
      role: "Senior Software Engineer",
    },
    {
      name: "Rip Sanghani",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852357/ripal-sanghani_cleanup_uwlpth.webp",
      href: "https://www.linkedin.com/in/ripalsanghani/",
      role: "Senior Product Manager",
    },
    {
      name: "Sarah Kelman",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852356/sarah-kelman_zdgpmb.webp",
      href: "https://www.linkedin.com/in/sarahkelman/",
      role: "Senior Product Researcher",
    },
    {
      name: "Tanyu Yuba",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852357/tanyu-yuba_d7qywp.webp",
      href: "https://www.linkedin.com/in/tanyuyuba/",
      role: "Senior Product Analyst",
    },
  ],
  cover: {
    primary: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742873197/strava-growth-cover-1_dwsdpv.webp",
      alt: "Strava subscription cancel modal",
    },
    secondary: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745864055/strava-growth-cover-02_vmvxii.webp",
      alt: "Strava youth running",
    },
  },
  stackHero: true,
  end: {
    image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745864060/strava-growth-fs_phk3vq.webp",
    process: [
      "What were my most successful experiments?",
      "Which experiments were failures & learning opportunities?",
      "How did I work with developers?",
      "What came from the team ideation workshop?",
      "How did I reverse-engineer our backlog of ideas?",
    ],
  },
  sections: [
    {
      number: "I",
      label: "Outcomes & Design Samples",
      icon: "solution",
      stack: true,
      blocks: [
        {
          type: "text",
          headline: "We fixed the experiment backlog to solve real problems, grew subscriptions, and didn’t wreck the product doing it.",
          body: "As the first designer on a newly established subscription growth team, I helped shift our approach by reverse engineering backlog ideas into human problems, collaborating with research to run ideation sessions along the athlete journey. Alongside building smarter growth experiments, I also made sure our work respected the overall product, working within an existing design system and partnering with designers to form new patterns. My contributions helped drive ~$6.3M in annual subscription growth revenue.",
        },
        {
          type: "stats",
          media: {
            type: "image",
            src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745879439/strava-growth-01_mc03zg.webp",
            alt: "Growth experiment on registration in Strava app detailing when subscriber free trial and when payment is required",
          },
          stats: [
            null,
            {
              title: "Est. annual booking impact",
              value: "$6.3M",
              direction: "up",
            },
            {
              title: "Subscription starts",
              value: "~90k",
              direction: "up",
            },
            null,
          ],
          position: "left",
        },
        {
          type: "group",
          blocks: [
            {
              type: "media",
              layout: "double",
              media: [
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745888194/strava-growth-02_ogyywo.webp",
                  alt: "Monthly or annual subscription rate selection in bottom sheet",
                },
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745887485/strava-growth-03_xjtc4t.webp",
                  alt: "Page showcasing different types of trail routes on Strava web for SEO",
                },
              ],
            },
            {
              type: "media",
              layout: "full",
              media: [
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745887483/strava-growth-04_ldtsl6.webp",
                  alt: "Various strava subscription UI cards with different features that are being upsold",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default stravaGrowth;
