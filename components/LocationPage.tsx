import SchemaMarkup from "@/components/SchemaMarkup";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";

export default function LocationPage({ city, keywordPrefix }: { city: string, keywordPrefix: string }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Codemates ${city}`,
    "image": "https://codemates.in/logo.png",
    "url": `https://codemates.in/${city.toLowerCase()}`,
    "telephone": "+91-7348975886",
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": city
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Do you provide ${keywordPrefix} services in ${city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, we are a leading ${keywordPrefix} provider serving businesses in and around ${city} with premium enterprise solutions.`
        }
      },
      {
        "@type": "Question",
        "name": `Can I hire a software developer in ${city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Absolutely. Codemates provides top-tier software engineers, AI experts, and CRM developers to businesses located in ${city}.`
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white pt-32 pb-20 px-6 font-sans relative overflow-hidden">
      <div className="absolute top-[10%] left-[10%] w-[45vw] h-[45vw] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-[50%] right-[10%] w-[45vw] h-[45vw] bg-purple-500/5 blur-[180px] rounded-full pointer-events-none" />
      
      <SchemaMarkup schema={localBusinessSchema} />
      <SchemaMarkup schema={faqSchema} />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 px-4.5 py-1.5 rounded-full text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
          <MapPin size={12} /> SERVING {city.toUpperCase()}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 capitalize">
          {keywordPrefix} Company in {city}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Codemates is your trusted technology partner in {city}. We specialize in custom software development, enterprise CRM systems, AI automation, and high-performance website development.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-16">
           <div className="flex items-start gap-3 bg-white/5 p-6 rounded-2xl border border-white/5">
             <CheckCircle2 className="text-cyan-400 shrink-0" />
             <div>
               <h3 className="font-bold text-white mb-1">Custom Software Solutions</h3>
               <p className="text-sm text-gray-400">Bespoke ERP and management systems engineered for businesses in {city}.</p>
             </div>
           </div>
           <div className="flex items-start gap-3 bg-white/5 p-6 rounded-2xl border border-white/5">
             <CheckCircle2 className="text-cyan-400 shrink-0" />
             <div>
               <h3 className="font-bold text-white mb-1">AI & n8n Automation</h3>
               <p className="text-sm text-gray-400">Streamline your operations with intelligent LLM applications and workflows.</p>
             </div>
           </div>
           <div className="flex items-start gap-3 bg-white/5 p-6 rounded-2xl border border-white/5">
             <CheckCircle2 className="text-cyan-400 shrink-0" />
             <div>
               <h3 className="font-bold text-white mb-1">Premium Web Development</h3>
               <p className="text-sm text-gray-400">High-speed, SEO-friendly responsive websites tailored for your brand.</p>
             </div>
           </div>
           <div className="flex items-start gap-3 bg-white/5 p-6 rounded-2xl border border-white/5">
             <CheckCircle2 className="text-cyan-400 shrink-0" />
             <div>
               <h3 className="font-bold text-white mb-1">CRM Development</h3>
               <p className="text-sm text-gray-400">Custom lead management and sales software built from the ground up.</p>
             </div>
           </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 p-10 rounded-[30px] backdrop-blur-md text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-white">Hire a Top Developer in {city}</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">Get a custom software quote and let our experts architect your digital transformation today.</p>
          
          <Link href="/estimate" className="inline-flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4.5 rounded-xl transition duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            Schedule Free Discovery Call <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
