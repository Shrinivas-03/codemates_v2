import { Metadata } from "next";
import LocationPage from "@/components/LocationPage";

export const metadata: Metadata = {
  title: "Website Development & Software Company in Gulbarga | Codemates",
  description: "Looking for a top website development company in Gulbarga? Codemates offers custom software, AI automation, and CRM development in Gulbarga.",
  keywords: [
    "website development company in gulbarga",
    "software company in gulbarga"
  ],
  alternates: {
    canonical: "https://codemates.in/gulbarga",
  }
};

export default function Page() {
  return <LocationPage city="Gulbarga" keywordPrefix="Top Software & Web Development" />;
}
