import { Metadata } from "next";
import CareersClient from "./CareersClient";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Careers | Join Us as a Founding Growth Partner",
  description:
    "We are looking for entrepreneurial partners, startup visionaries, and growth-minded sales & marketing experts to build the future of AI automation and custom software solutions with Codemates.",
  keywords: [
    "Codemates Careers",
    "Founding Growth Partner",
    "Sales and Marketing Partnership",
    "Revenue Sharing Opportunities",
    "Startup Jobs India",
    "AI Automation Agency Jobs",
  ],
};

export default function CareersPage() {
  const careersSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Careers at Codemates",
    "description": "Founding Growth Partner opportunity at Codemates. Work on real-world projects, earn through revenue sharing, and scale your personal brand alongside our startup.",
    "publisher": {
      "@type": "Organization",
      "name": "Codemates",
      "url": "https://codemates.in"
    }
  };

  return (
    <>
      <SchemaMarkup schema={careersSchema} />
      <CareersClient />
    </>
  );
}
