import { Metadata } from "next";
import LocationPage from "@/components/LocationPage";

export const metadata: Metadata = {
  title: "Website Development & Software Company in Hyderabad | Codemates",
  description: "Hire a premium website development company in Hyderabad. We offer custom software development company services and AI automation in Hyderabad.",
  keywords: [
    "website development company in hyderabad",
    "software development company in hyderabad"
  ],
  alternates: {
    canonical: "https://codemates.in/hyderabad",
  }
};

export default function Page() {
  return <LocationPage city="Hyderabad" keywordPrefix="Premium Software & Web Development" />;
}
