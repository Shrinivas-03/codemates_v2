import { Metadata } from "next";
import HomeClient from "./HomeClient";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Codemates India | Custom Software & Website Development Company",
  description:
    "Leading custom software development company, AI automation agency, and website development company. We deliver CRM development, n8n automation services, and digital transformation.",
  keywords: [
    "software development company",
    "custom software development company",
    "website development company",
    "web design company",
    "AI automation company",
    "CRM development company",
    "n8n automation services",
  ],
};

export default function Page() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Codemates",
    url: "https://codemates.in/",
  };

  return (
    <>
      <SchemaMarkup schema={websiteSchema} />
      <HomeClient />
    </>
  );
}
