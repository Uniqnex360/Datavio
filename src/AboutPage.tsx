import {
  Zap,
  Target,
  Users,
  ArrowRight,
  CheckCircle,
  Globe,
  Database,
  Sparkles,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { SiteFooter, PageHeader, navigate as appNavigate } from './App';

const VALUES = [
  {
    icon: Target,
    title: 'Outcome-first, always',
    desc: 'We measure our success by the revenue impact we create for our customers — not by features shipped or dashboards viewed. Every capability we build traces back to a real, measurable commerce outcome.',
  },
  {
    icon: Zap,
    title: 'Intelligence over intervention',
    desc: 'Manual catalog work doesn\'t scale. We build systems that learn, adapt, and improve automatically — so your catalog gets smarter over time without requiring more headcount.',
  },
  {
    icon: Shield,
    title: 'Trust through transparency',
    desc: 'We show our work. Every score, every enrichment, every flag comes with a clear rationale — so your team understands what changed, why it changed, and what to do next.',
  },
  {
    icon: Users,
    title: 'Built with practitioners',
    desc: 'DatavioAI was designed with input from catalog managers, ecommerce directors, and data engineers who live with these problems daily. We speak the language of product data because we\'ve been in the trenches.',
  },
];

const STATS = [
  { value: '1M+', label: 'SKUs processed', color: 'text-[#00AEEF]' },
  { value: '40%', label: 'Avg. reduction in returns', color: 'text-[#00C853]' },
  { value: '60%', label: 'Faster time-to-channel', color: 'text-[#1B2F6E]' },
  { value: '3×', label: 'Higher conversion on enriched PDPs', color: 'text-[#00AEEF]' },
];

const CAPABILITIES_SUMMARY = [
  { icon: Database, label: 'Catalog scoring & builder' },
  { icon: Sparkles, label: 'AI data enrichment' },
  { icon: Globe, label: 'Omnichannel content' },
  { icon: TrendingUp, label: 'Continuous governance' },
];

export default function AboutPage({ navigate }: { navigate: (to: string) => void }) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <PageHeader />

      {/* Hero */}
      <div className="bg-[#1B2F6E] relative overflow-hidden flex-shrink-0 pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00AEEF]/10 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00C853]/10 translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            About DatavioAI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-5">
            We Exist to Make Every<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#00C853]">
              Product Work Harder
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            DatavioAI is an AI-native product catalog intelligence platform built for modern commerce teams. We turn raw, inconsistent product data into enriched, governed, omnichannel-ready content — so every SKU drives its full revenue potential.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-16 space-y-16">

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold text-[#00AEEF] uppercase tracking-widest mb-3">Our Mission</p>
            <h2 className="text-3xl font-extrabold text-[#1B2F6E] mb-5 leading-tight">
              Product data should be a growth engine, not an operational burden.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-5">
              For too long, commerce teams have been locked in a cycle: manual cleanup projects that take months, regressions that undo the work, and AI initiatives that stall because the underlying data isn't ready.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-5">
              We built DatavioAI to break that cycle. Our platform provides a continuous intelligence layer that scores, enriches, cleanses, and governs your catalog automatically — so your team can focus on growth, not data plumbing.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              We believe that great product data is not a one-time project. It is an ongoing capability that compounds over time — and DatavioAI is the system that makes that compounding happen.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ value, label, color }) => (
              <div key={label} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <p className={`text-4xl font-extrabold mb-1 ${color}`}>{value}</p>
                <p className="text-sm font-semibold text-[#1B2F6E] leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What we build */}
        <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-[#00AEEF] uppercase tracking-widest mb-3">What We Build</p>
            <h2 className="text-3xl font-extrabold text-[#1B2F6E] mb-3">A complete catalog intelligence stack</h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              From raw data ingestion to governed, channel-ready product content — DatavioAI covers the full lifecycle of product information.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {CAPABILITIES_SUMMARY.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-xl p-5 text-center hover:border-[#00AEEF]/30 hover:shadow-sm transition-all">
                <div className="w-11 h-11 bg-[#00AEEF]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-[#00AEEF]" />
                </div>
                <p className="text-sm font-bold text-[#1B2F6E]">{label}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/" onClick={(e) => { e.preventDefault(); appNavigate('/'); }}
              className="inline-flex items-center gap-2 text-[#00AEEF] font-semibold text-sm hover:gap-3 transition-all">
              Explore all platform capabilities <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#00AEEF] uppercase tracking-widest mb-3">Our Values</p>
            <h2 className="text-3xl font-extrabold text-[#1B2F6E]">What we stand for</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5 p-6 bg-white border border-slate-200 rounded-2xl hover:border-[#00AEEF]/30 hover:shadow-sm transition-all">
                <div className="w-11 h-11 bg-[#00AEEF]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-[#00AEEF]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1B2F6E] mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#1B2F6E] rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white mb-3">Let's work together</h2>
            <p className="text-white/60 text-base max-w-lg mx-auto mb-7">
              Whether you're exploring options, facing a specific catalog challenge, or ready to get started — we'd love to hear from you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/demo"
                onClick={(e) => { e.preventDefault(); appNavigate('/demo'); }}
                className="inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:shadow-xl hover:shadow-[#00AEEF]/30 hover:-translate-y-0.5"
              >
                Book a Demo <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); appNavigate('/contact'); }}
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded-xl transition-all"
              >
                Contact Us
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs text-white/40">
              {[
                'Run 100 products free',
                'Full catalog quality report',
                'No commitment required',
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00C853]" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
