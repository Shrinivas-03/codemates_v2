// Premium mock authors database
export const mockAuthors = {
  shrinivas: {
    name: "Shrinivas B",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
    bio: "CEO & Chief Next.js Architect at Codemates. Specialized in scaling digital platforms, advanced SEO engineering, and business process automations.",
    linkedin: "https://linkedin.com/in/shrinivas-b",
    twitter: "https://twitter.com/shrinivas_b",
    email: "shrinivas@codemates.in"
  },
  rohan: {
    name: "Rohan K",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
    bio: "Head of Automation and Workflow Engineering at Codemates. n8n expert, CRM integrator, and backend solutions consultant.",
    linkedin: "https://linkedin.com/in/rohan-k",
    twitter: "https://twitter.com/rohan_k",
    email: "rohan@codemates.in"
  }
};

// Premium mock categories database
export const mockCategories = {
  aiAutomation: { title: "AI Automation", slug: "ai-automation", description: "Scale operations with AI chatbots and intelligent pipelines.", icon: "Zap" },
  n8nWorkflows: { title: "n8n Workflows", slug: "n8n-workflows", description: "Orchestrate your business processes seamlessly with n8n.", icon: "Workflow" },
  customSoftware: { title: "Software Development", slug: "software-development", description: "Bespoke software products custom-engineered for your workflow.", icon: "Code" },
  crmSystems: { title: "CRM Systems", slug: "crm-systems", description: "Track leads and automate pipeline workflows to double your conversions.", icon: "Layers" },
  digitalTransformation: { title: "Digital Transformation", slug: "digital-transformation", description: "Modernize legacy pipelines and establish startup technology.", icon: "RefreshCw" }
};

// Enriched mock blog posts formatted as Portable Text
export const blogPosts = [
  {
    _id: "mock-1",
    slug: "future-of-ai-automation",
    title: "The Future of AI Automation Services for Small Business",
    excerpt: "Discover how an AI automation company can help streamline operations and reduce costs for your growing business using intelligent automation solutions.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
    },
    category: mockCategories.aiAutomation,
    tags: [
      { name: "AI Automation", slug: "ai-automation" },
      { name: "SaaS", slug: "saas" },
      { name: "Business Growth", slug: "business-growth" }
    ],
    author: mockAuthors.shrinivas,
    publishedDate: "2026-06-01",
    readingTime: 6,
    featured: true,
    seoTitle: "AI Automation Services for Small Business | Codemates",
    seoDescription: "Discover how an AI automation company can help streamline operations, reduce operational costs, and scale your growing business with smart AI workflows.",
    seoKeywords: ["AI automation company", "business automation", "custom software solutions", "startup technology partner"],
    content: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Artificial Intelligence is no longer just a luxury for massive tech conglomerates. Today, small businesses and growing startups are utilizing AI automation services to eliminate repetitive tasks, optimize their customer funnels, and slash operating budgets. In this detailed architectural notes, we will break down how custom AI pipelines are built and why they are vital for modern small businesses." }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Why Generic AI Tools Fall Short" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Many business owners start by purchasing standard off-the-shelf subscriptions for AI writing assistants or generic chatbots. While these tools offer a quick start, they create massive silos. They do not hook into your CRM, they cannot access your internal inventory datasets, and they have no awareness of your localized customer support rules." }]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [{ _type: "span", text: "Custom AI automation is not about replacing your staff; it is about supercharging them with tailored data pipelines that automate 90% of manual processes." }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "How to Build a Custom AI Integration Pipeline" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "A successful business automation setup starts with a secure custom backend. For instance, here is a clean TypeScript example of an LLM integration pipeline routing leads into a CRM system dynamically:" }]
      },
      {
        _type: "code",
        language: "typescript",
        filename: "lib/aiPipeline.ts",
        code: `import { createClient } from '@supabase/supabase-js';

export async function processIncomingLead(leadData: any) {
  // 1. Analyze lead intent with custom LLM prompt
  const analysis = await callLLMAgent(leadData.message);
  
  // 2. Classify and route lead score
  const leadScore = analysis.intent === 'purchase' ? 95 : 40;

  // 3. Inject details into CRM database automatically
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  await supabase.from('leads').insert({
    name: leadData.name,
    email: leadData.email,
    score: leadScore,
    insights: analysis.summary
  });
}`
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "The Bottom Line for Startups" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Partnering with an experienced AI automation company like Codemates helps startups build enterprise-grade infrastructure at a fraction of the cost of hiring in-house ML developers. Contact our team to book a free consultation and get your customized project quote." }]
      }
    ]
  },
  {
    _id: "mock-2",
    slug: "n8n-workflow-automation-guide",
    title: "Ultimate Guide to n8n Workflow Automation",
    excerpt: "Learn how to use n8n for business process automation. A complete guide by a top n8n automation company on custom n8n workflows.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
    },
    category: mockCategories.n8nWorkflows,
    tags: [
      { name: "n8n Workflows", slug: "n8n-workflows" },
      { name: "Automation", slug: "automation" }
    ],
    author: mockAuthors.rohan,
    publishedDate: "2026-05-25",
    readingTime: 5,
    featured: false,
    seoTitle: "n8n Workflow Automation Guide | Codemates",
    seoDescription: "A comprehensive guide to building n8n workflows for custom CRM integrations and business process automation written by premium n8n developers.",
    seoKeywords: ["n8n workflows", "n8n automation services", "business automation company"],
    content: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Workflow automation is the engine that drives modern digital transformation. While tools like Zapier are popular, n8n has quickly emerged as the developer's choice. Its node-based layout, self-hosting options, and powerful custom code actions make it the ultimate platform for building secure, scalable business integrations." }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Why Developers Prefer n8n Over Zapier" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Unlike standard visual builders, n8n gives you complete data privacy. You can host n8n within your own cloud infrastructure, meaning sensitive client records and databases never touch third-party servers. Furthermore, n8n has no artificial limit on loops and logical branches." }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Integrating n8n with Supabase and Custom Webhooks" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "When building enterprise-grade workflows, you will often need to receive webhooks from n8n and query your active databases. Here is a sample code demonstrating how to construct an express-based webhook listener:" }]
      },
      {
        _type: "code",
        language: "javascript",
        filename: "server/webhook.js",
        code: `const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/n8n-trigger', (req, res) => {
  const event = req.body;
  
  if (event.status === 'success') {
    console.log(\`n8n Workflow \${event.workflowId} executed successfully!\`);
    // Perform custom server side action
  }
  
  res.status(200).json({ received: true });
});

app.listen(3000, () => console.log('Listening on port 3000'));`
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Building Your First n8n Workflow" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "To start orchestrating your custom business pipelines, you can easily pull in n8n's community nodes or deploy complex JavaScript code snippets right inside the workflow nodes. Our n8n developers can help architect custom node systems customized to your existing corporate applications." }]
      }
    ]
  },
  {
    _id: "mock-3",
    slug: "custom-software-vs-off-the-shelf",
    title: "Custom Software Development vs Off-the-Shelf: Which is Best?",
    excerpt: "Thinking about hiring a custom software development company? Read this before you decide between enterprise software development and SaaS.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
    },
    category: mockCategories.customSoftware,
    tags: [
      { name: "Software Development", slug: "software-development" },
      { name: "SaaS", slug: "saas" }
    ],
    author: mockAuthors.shrinivas,
    publishedDate: "2026-05-18",
    readingTime: 8,
    featured: false,
    seoTitle: "Custom Software vs Off-the-Shelf | Codemates",
    seoDescription: "Should you hire a custom software development company or buy off-the-shelf software? Learn the ROI and scalability comparisons here.",
    seoKeywords: ["custom software development company", "custom software solutions", "startup technology partner"],
    content: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Choosing the software that drives your company's daily routines is one of the most critical decisions a leader can make. The temptation to buy a standard off-the-shelf SaaS model is high—it is immediately accessible, has predictable upfront pricing, and requires no development time. However, as business scales, many organizations hit massive walls: user seat licensing costs spike, standard workflows are forced into systems that do not fit, and integration options remain severely restricted." }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Comparing the ROI Over 3 Years" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "While custom software development has a higher upfront cost, its long-term ROI easily crushes standard subscription software. Under custom licensing, you own the IP. You do not pay recurring licensing fees per user, meaning your team can grow infinitely with zero additional software overhead. Moreover, you can build tailored automation that saves hundreds of manual hours every week." }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Scalable Architecture for Custom Solutions" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "A premium custom software product utilizes microservices to guarantee 99.99% uptime and flexible feature additions. Here is a simple layout of a serverless microservice handler using Node.js:" }]
      },
      {
        _type: "code",
        language: "javascript",
        filename: "api/handler.js",
        code: `exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      message: "Custom software microservice response successful",
      receivedData: requestBody
    })
  };
};`
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Deciding the Path For Your Business" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "If your business depends on highly unique operations or proprietary formulas, hiring a custom software development company like Codemates is the single best decision you can make. We specialize in building fast, scalable software custom-tailored to your exact business rules." }]
      }
    ]
  },
  {
    _id: "mock-4",
    slug: "importance-of-crm-for-small-business",
    title: "Why You Need a CRM Development Company for Your Small Business",
    excerpt: "Explore the benefits of custom CRM development and how sales CRM software can boost your revenue and manage customer relationships effectively.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
    },
    category: mockCategories.crmSystems,
    tags: [
      { name: "CRM Development", slug: "crm-development" },
      { name: "Sales CRM", slug: "sales-crm" }
    ],
    author: mockAuthors.rohan,
    publishedDate: "2026-05-10",
    readingTime: 5,
    featured: false,
    seoTitle: "Why Custom CRM Development Wins For Small Business | Codemates",
    seoDescription: "Tired of bloated software subscriptions? Learn how custom CRM development can automate lead routing, improve sales velocity, and save you thousands.",
    seoKeywords: ["CRM development company", "custom CRM development", "sales CRM software"],
    content: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "A generic CRM with dozens of bloated panels and unused features is often worse than using a simple spreadsheet. Small businesses are frequently overwhelmed by complicated interfaces and high subscription costs, resulting in poor employee adoption rates. That is where a CRM development company comes in. By designing a custom sales CRM software solution, you build an application centered exclusively on your specific stages, simplifying lead inputs and automating reminders." }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Automating Lead Lifecycles" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "The primary goal of custom CRM development is process automation. For example, when a prospect fills out a contact form, the CRM can assign the lead, trigger an initial confirmation email, schedule a follow-up task, and ping your sales channel—all within milliseconds." }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Unleashing Sales Velocity" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "With custom CRM systems, you can easily integrate automatic calling, SMS reminders, and WhatsApp API webhooks, helping your reps respond instantly to inbound requests. Connect with our engineering division at Codemates to build a premium CRM tailored exactly to your pipeline." }]
      }
    ]
  },
  {
    _id: "mock-5",
    slug: "startup-technology-partner-guide",
    title: "How to Choose the Right Startup Technology Partner",
    excerpt: "Finding the right website development company and technology consulting company is crucial for startup success. Here is what to look for.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1200&q=80"
    },
    category: mockCategories.digitalTransformation,
    tags: [
      { name: "Startup Growth", slug: "startup-growth" },
      { name: "Digital Transformation", slug: "digital-transformation" }
    ],
    author: mockAuthors.shrinivas,
    publishedDate: "2026-05-01",
    readingTime: 7,
    featured: false,
    seoTitle: "Choosing the Right Startup Technology Partner | Codemates",
    seoDescription: "Uncover key criteria for choosing a custom software and website development company to act as your startup technology and growth partner.",
    seoKeywords: ["startup technology partner", "technology consulting company", "website development company"],
    content: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Startups fail not just due to lack of market fit, but often because of poor technology decisions in their early stages. Choosing an unscalable tech stack, hiring substandard junior devs, or rushing features creates massive technical debt that slows development to a crawl later on. Partnering with a dedicated startup technology partner is key to navigating early stage pivots, securing stable cloud configurations, and scaling securely." }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "The Role of Technology Consulting" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "A premium software consulting company does not just write code; they analyze your product idea, recommend cost-efficient serverless hosting options, design fast user journeys, and plan integrations that streamline growth. They serve as an extension of your leadership, advising on key tech moves." }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Secure, Scalable Infrastructure" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "From Docker containers and Kubernetes clusters to serverless edge platforms like Vercel, a high-quality partner ensures your application handles spikes in traffic flawlessly. At Codemates, we act as the growth and engineering pillar for ambitious startups worldwide. Get in touch to schedule a free technological architecture consultation today." }]
      }
    ]
  }
];
