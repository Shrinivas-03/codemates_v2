import { Metadata } from "next";
import LocationPage from "@/components/LocationPage";

export const metadata: Metadata = {
  title: "Website Development & Software Company in Chennai | Codemates",
  description: "Looking for a top website development company in Chennai? Codemates provides custom software development company services and CRM solutions in Chennai.",
  keywords: [
    "website development company in chennai",
    "software development company in chennai"
  ],
  alternates: {
    canonical: "https://codemates.in/chennai",
  }
};

export default function Page() {
  return <LocationPage city="Chennai" keywordPrefix="Top Software & Web Development" />;
}
