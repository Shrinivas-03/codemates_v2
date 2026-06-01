import { Metadata } from "next";
import LocationPage from "@/components/LocationPage";

export const metadata: Metadata = {
  title: "Website Development & Software Company in Bangalore | Codemates",
  description: "Hire a premium website development company in Bangalore. Codemates provides top custom software and AI automation company services in Bangalore.",
  keywords: [
    "website development company in bangalore",
    "software development company in bangalore",
    "AI automation company in bangalore"
  ],
  alternates: {
    canonical: "https://codemates.in/bangalore",
  }
};

export default function Page() {
  return <LocationPage city="Bangalore" keywordPrefix="Premium Software & Web Development" />;
}
