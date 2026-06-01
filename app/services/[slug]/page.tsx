import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/servicesData";
import SchemaMarkup from "@/components/SchemaMarkup";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import GlobalSubconsciousSynth from "@/components/GlobalSubconsciousSynth";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesData[resolvedParams.slug];
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `https://codemates.in/services/${resolvedParams.slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = servicesData[resolvedParams.slug];

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    description: service.content,
    serviceType: service.serviceType,
    provider: {
      "@type": "Organization",
      name: "Codemates",
      url: "https://codemates.in",
    },
    areaServed: "India",
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white pt-32 pb-20 px-6 font-sans relative overflow-hidden">
      <div className="absolute top-[10%] left-[10%] w-[45vw] h-[45vw] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-[50%] right-[10%] w-[45vw] h-[45vw] bg-purple-500/5 blur-[180px] rounded-full pointer-events-none" />
      
      <SchemaMarkup schema={serviceSchema} />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/services" className="text-cyan-400 hover:text-cyan-300 text-sm font-bold mb-8 inline-flex items-center gap-2">
          &larr; Back to Services
        </Link>
        <br />
        <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 px-4.5 py-1.5 rounded-full text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 mt-6">
          PREMIUM DIGITAL SERVICE
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          {service.h1}
        </h1>
        
        <h2 className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold mb-8">
          {service.h2}
        </h2>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mb-12">
          <p>{service.content}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
           <div className="flex items-start gap-3 bg-white/5 p-6 rounded-2xl border border-white/5">
             <CheckCircle2 className="text-cyan-400 shrink-0" />
             <div>
               <h3 className="font-bold text-white mb-1">Enterprise Grade</h3>
               <p className="text-sm text-gray-400">Built for scale, security, and maximum performance.</p>
             </div>
           </div>
           <div className="flex items-start gap-3 bg-white/5 p-6 rounded-2xl border border-white/5">
             <CheckCircle2 className="text-cyan-400 shrink-0" />
             <div>
               <h3 className="font-bold text-white mb-1">Custom Architecture</h3>
               <p className="text-sm text-gray-400">Tailor-made solutions perfectly fitted to your business logic.</p>
             </div>
           </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 p-10 rounded-[30px] backdrop-blur-md text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">Ready to start your project?</h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">Get a custom software quote and let our experts architect your digital transformation.</p>
          
          <Link href="/estimate" className="inline-flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4.5 rounded-xl transition duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            Get Custom Software Quote <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
