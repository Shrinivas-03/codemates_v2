import { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Software & Web Development Services | AI & CRM Solutions | Codemates",
  description:
    "Explore our premium digital solutions: custom software development, website development services, AI automation, CRM development, and n8n workflow integration.",
  keywords: [
    "website development services",
    "custom software solutions",
    "AI business solutions",
    "business automation using n8n",
    "CRM software development",
  ],
  alternates: {
    canonical: "https://codemates.in/services",
  },
};

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software and Website Development",
    provider: {
      "@type": "Organization",
      name: "Codemates",
    },
    areaServed: "India",
  };

  return (
    <>
      <SchemaMarkup schema={serviceSchema} />
      <ServicesClient />
    </>
  );
}
