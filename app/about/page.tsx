import { Metadata } from "next";
import AboutClient from "./AboutClient";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "About Us | Technology Consulting & Startup Partner | Codemates",
  description:
    "Learn about Codemates, a premium technology consulting company and startup technology partner. We build custom software, AI automation, and enterprise web solutions.",
  keywords: [
    "technology consulting company",
    "startup technology partner",
    "digital transformation company",
    "software development company",
  ],
  alternates: {
    canonical: "https://codemates.in/about",
  },
};

export default function Page() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Codemates",
    url: "https://codemates.in/about",
    description:
      "Learn about Codemates, a premium technology consulting company and startup technology partner.",
  };

  return (
    <>
      <SchemaMarkup schema={aboutSchema} />
      <AboutClient />
    </>
  );
}
