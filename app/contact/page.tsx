import { Metadata } from "next";
import ContactClient from "./ContactClient";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Contact Us | Hire Software & CRM Developers | Codemates",
  description:
    "Contact Codemates to hire a software development company, CRM developers, and AI automation specialists. Request a custom software quote today.",
  keywords: [
    "hire software development company",
    "hire CRM developer",
    "hire n8n developer",
    "hire AI automation expert",
    "custom software quote",
    "website development cost",
  ],
  alternates: {
    canonical: "https://codemates.in/contact",
  },
};

export default function Page() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Codemates",
    url: "https://codemates.in/contact",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How quickly will you respond?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We respond to all verified project inquiries within 24 hours. Our solution architects analyze your requirements and follow up with a structured technical briefing schedule.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide free consultation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide a complete, complimentary 30-minute system strategy call where we examine your existing workflows, database architecture, and project goals to deliver a high-level roadmap.",
        },
      },
      {
        "@type": "Question",
        name: "Can you sign NDA agreements?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. We routinely establish mutual Non-Disclosure Agreements (NDAs) before discussing sensitive business logic, user workflows, or proprietary software architectures.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide hosting and maintenance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer enterprise-grade cloud hosting management (AWS, Vercel, Docker deployments) and monthly support SLAs that cover version updates, API integrations, and security patches.",
        },
      },
      {
        "@type": "Question",
        name: "Can you build custom CRM and ERP systems?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, bespoke enterprise software is one of our primary core disciplines. We build customized, multi-tenant CRM/ERP systems optimized with automated ledger accounting, clerk workflows, and live analytics.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide AI automation solutions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we specialize in advanced AI orchestrations using LLMs, n8n pipeline orchestrators, Vector databases (Pinecone/pgvector), and custom RAG knowledge retrievers.",
        },
      },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={contactSchema} />
      <SchemaMarkup schema={faqSchema} />
      <ContactClient />
    </>
  );
}
