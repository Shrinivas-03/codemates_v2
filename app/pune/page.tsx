import { Metadata } from "next";
import LocationPage from "@/components/LocationPage";

export const metadata: Metadata = {
  title: "Website Development & Software Company in Pune | Codemates",
  description: "Top website development company in Pune. Codemates specializes in enterprise software development company services and AI automation in Pune.",
  keywords: [
    "website development company in pune",
    "software development company in pune"
  ],
  alternates: {
    canonical: "https://codemates.in/pune",
  }
};

export default function Page() {
  return <LocationPage city="Pune" keywordPrefix="Premium Software & Web Development" />;
}
