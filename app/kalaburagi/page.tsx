import { Metadata } from "next";
import LocationPage from "@/components/LocationPage";

export const metadata: Metadata = {
  title: "Website Development & Software Company in Kalaburagi | Codemates",
  description: "Looking for a top website development company in Kalaburagi? Codemates offers custom software, AI automation, and CRM development in Kalaburagi.",
  keywords: [
    "website development company in kalaburagi",
    "software company in kalaburagi",
    "AI automation company in kalaburagi",
    "CRM development company in kalaburagi"
  ],
  alternates: {
    canonical: "https://codemates.in/kalaburagi",
  }
};

export default function Page() {
  return <LocationPage city="Kalaburagi" keywordPrefix="Top Software & Web Development" />;
}
