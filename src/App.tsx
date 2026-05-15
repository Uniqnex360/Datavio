import { useState, useEffect } from 'react';
import DemoPage from './DemoPage';
import PrivacyPage from './PrivacyPage';
import UseCasesPage from './UseCasesPage';
import AboutPage from './AboutPage';
import SolutionsPage from './SolutionsPage';

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => {
      setPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  return path;
}

export function navigate(to: string) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function Link({ to, className, children, onClick }: { to: string; className?: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

import {
  Search,
  Database,
  Layers,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  BarChart3,
  Tag,
  RefreshCw,
  Zap,
  Globe,
  ShieldCheck,
  ChevronDown,
  Mail,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Filter,
  Package,
  FolderOpen,
  Wand2,
} from 'lucide-react';

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return y;
}

// ─── Header ──────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Solutions', href: '/solutions', external: true },
  { label: 'Use Cases', href: '/use-cases', external: true },
  { label: 'About', href: '/about', external: true },
  { label: 'Contact', href: '/contact', external: true },
];

export function PageHeader() {
  const [open, setOpen] = useState(false);
  const scrollY = useScrollY();
  const solid = scrollY > 50;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? 'bg-white shadow-sm border-b border-slate-100 py-3' : 'bg-white py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex-shrink-0">
          <img src="/Datavio_logo.png" alt="DatavioAI" className="h-16 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href, external }) =>
            external ? (
              <a key={label} href={href} onClick={(e) => { e.preventDefault(); navigate(href); }}
                className="text-sm font-medium text-[#1B2F6E] hover:text-[#00AEEF] transition-colors">{label}</a>
            ) : (
              <a key={label} href={href} className="text-sm font-medium text-[#1B2F6E] hover:text-[#00AEEF] transition-colors">{label}</a>
            )
          )}
        </nav>

        <div className="hidden md:block">
          <Link to="/demo" className="bg-[#00AEEF] hover:bg-[#0099d6] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm">
            Book a Demo
          </Link>
        </div>

        <button className="md:hidden text-[#1B2F6E]" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
          {NAV_LINKS.map(({ label, href, external }) =>
            external ? (
              <a key={label} href={href} onClick={(e) => { e.preventDefault(); setOpen(false); navigate(href); }}
                className="block text-sm font-medium text-[#1B2F6E] hover:text-[#00AEEF]">{label}</a>
            ) : (
              <a key={label} href={href} className="block text-sm font-medium text-[#1B2F6E] hover:text-[#00AEEF]" onClick={() => setOpen(false)}>{label}</a>
            )
          )}
          <Link to="/demo" className="block mt-2 bg-[#00AEEF] text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center" onClick={() => setOpen(false)}>
            Book a Demo
          </Link>
        </div>
      )}
    </header>
  );
}

// ─── Hero Dashboard Slides ────────────────────────────────────────────────────

function PieDonut({ pct, color, label }: { pct: number; color: string; label: string }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg viewBox="0 0 72 72" className="w-full h-full">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
      <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 36 36)" />
      <text x="36" y="33" textAnchor="middle" fill={color} fontSize="11" fontWeight="bold">{pct}%</text>
      <text x="36" y="45" textAnchor="middle" fill="#94a3b8" fontSize="7">{label}</text>
    </svg>
  );
}

const HERO_SLIDES = [
  {
    title: 'Brand Content Report',
    badge: 'Brand',
    badgeColor: 'bg-[#00AEEF]/15 text-[#00AEEF]',
    kpis: [
      { label: 'Total SKUs', value: '48,320', icon: Package, color: 'text-[#00AEEF]', bg: 'bg-[#00AEEF]/10' },
      { label: 'Enriched', value: '44,210', icon: Sparkles, color: 'text-[#00C853]', bg: 'bg-[#00C853]/10' },
      { label: 'Attributes Added', value: '218K', icon: Tag, color: 'text-[#1B2F6E]', bg: 'bg-[#1B2F6E]/10' },
    ],
    donuts: [
      { pct: 91, color: '#00AEEF', label: 'Complete' },
      { pct: 96, color: '#00C853', label: 'On-Brand' },
      { pct: 88, color: '#1B2F6E', label: 'Channel Ready' },
    ],
    bars: [
      { label: 'Titles & Descriptions', value: 96, color: '#00AEEF' },
      { label: 'Images & Rich Media', value: 89, color: '#00C853' },
      { label: 'Specs & Attributes', value: 82, color: '#1B2F6E' },
    ],
  },
  {
    title: 'Category Quality Report',
    badge: 'Category',
    badgeColor: 'bg-[#00C853]/15 text-[#00C853]',
    kpis: [
      { label: 'Categories', value: '1,240', icon: FolderOpen, color: 'text-[#00C853]', bg: 'bg-[#00C853]/10' },
      { label: 'Products Scored', value: '48,320', icon: BarChart3, color: 'text-[#00AEEF]', bg: 'bg-[#00AEEF]/10' },
      { label: 'Avg Quality Score', value: 'A', icon: Star, color: 'text-[#1B2F6E]', bg: 'bg-[#1B2F6E]/10' },
    ],
    donuts: [
      { pct: 87, color: '#00C853', label: 'Complete' },
      { pct: 93, color: '#00AEEF', label: 'Searchable' },
      { pct: 79, color: '#1B2F6E', label: 'Optimized' },
    ],
    bars: [
      { label: 'Electronics', value: 94, color: '#00AEEF' },
      { label: 'Home & Garden', value: 88, color: '#00C853' },
      { label: 'Apparel', value: 76, color: '#1B2F6E' },
    ],
  },
  {
    title: 'Data Quality Report',
    badge: 'Governance',
    badgeColor: 'bg-[#1B2F6E]/10 text-[#1B2F6E]',
    kpis: [
      { label: 'Records Cleansed', value: '31,540', icon: Filter, color: 'text-[#00AEEF]', bg: 'bg-[#00AEEF]/10' },
      { label: 'Normalised', value: '27,880', icon: Wand2, color: 'text-[#00C853]', bg: 'bg-[#00C853]/10' },
      { label: 'Duplicates Removed', value: '4,210', icon: RefreshCw, color: 'text-[#1B2F6E]', bg: 'bg-[#1B2F6E]/10' },
    ],
    donuts: [
      { pct: 95, color: '#00AEEF', label: 'Cleansed' },
      { pct: 92, color: '#00C853', label: 'Normalised' },
      { pct: 98, color: '#1B2F6E', label: 'Standardised' },
    ],
    bars: [
      { label: 'Data Cleansing', value: 95, color: '#00AEEF' },
      { label: 'Normalisation', value: 92, color: '#00C853' },
      { label: 'Standardisation', value: 98, color: '#1B2F6E' },
    ],
  },
];

function HeroDashboard() {
  const [slide, setSlide] = useState(0);
  const s = HERO_SLIDES[slide];

  useEffect(() => {
    const t = setInterval(() => setSlide((i) => (i + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-[#00AEEF]/10 to-[#00C853]/10 rounded-3xl blur-3xl pointer-events-none" />
      <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold text-[#1B2F6E] uppercase tracking-wider">{s.title}</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.badgeColor}`}>{s.badge}</span>
          </div>
          <span className="text-xs bg-[#00C853]/10 text-[#00C853] font-semibold px-2 py-0.5 rounded-full">Live</span>
        </div>

        <div className="p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {s.kpis.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className={`${bg} rounded-xl p-3 text-center`}>
                <div className="flex justify-center mb-1"><Icon className={`w-4 h-4 ${color}`} /></div>
                <p className={`text-sm font-extrabold ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
            {s.donuts.map(({ pct, color, label }) => (
              <div key={label} className="flex-1">
                <div className="w-16 h-16 mx-auto">
                  <PieDonut pct={pct} color={color} label={label} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2">
            {s.bars.map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-xs text-slate-500 font-medium">{label}</span>
                  <span className="text-xs font-bold" style={{ color }}>{value}%</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
          <button onClick={() => setSlide((slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#00AEEF] transition-colors text-slate-400 hover:text-[#00AEEF]">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="flex gap-1.5">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'w-5 bg-[#00AEEF]' : 'w-1.5 bg-slate-300'}`} />
            ))}
          </div>
          <button onClick={() => setSlide((slide + 1) % HERO_SLIDES.length)}
            className="w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#00AEEF] transition-colors text-slate-400 hover:text-[#00AEEF]">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-white pt-28 pb-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#00AEEF]/5 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00C853]/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-3.5 h-3.5 text-[#00AEEF]" />
            <span className="text-[#00AEEF] text-xs font-bold tracking-widest uppercase">AI-Powered Catalog Intelligence</span>
          </div>

          <h1 className="text-5xl lg:text-[3.5rem] font-extrabold text-[#1B2F6E] leading-[1.1] mb-5">
            Your Product Data.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#00C853]">
              Your Competitive Edge.
            </span>
          </h1>

          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-lg">
            Great product data and compelling content are the foundation of every high-converting digital experience. DatavioAI replaces the cleanup-and-regress cycle with a continuous omnichannel intelligence layer that scores, enriches, and governs your catalog — permanently.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link to="/demo" className="inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#00AEEF]/25 hover:-translate-y-0.5">
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#platform" className="inline-flex items-center gap-2 border-2 border-[#1B2F6E] text-[#1B2F6E] hover:bg-[#1B2F6E] hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-all">
              Explore Platform
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
            {['Free catalog assessment', 'Run 100 products free', 'Live in days, not months'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#00C853] flex-shrink-0" /> {t}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <HeroDashboard />
        </div>
      </div>

      <a href="#trust" className="block mt-12 text-center text-[#00AEEF]/40 hover:text-[#00AEEF] transition-colors animate-bounce mx-auto w-fit">
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────

const TRUST_SEGMENTS = [
  { label: 'Ecommerce Retailers',       icon: Globe,       color: 'bg-[#00AEEF]/10 text-[#00AEEF]' },
  { label: 'B2B Distributors',          icon: Database,    color: 'bg-[#0891B2]/10 text-[#0891B2]' },
  { label: 'Brands & Manufacturers',    icon: ShieldCheck, color: 'bg-[#00C853]/10 text-[#00C853]' },
  { label: 'Global Marketplaces',       icon: Layers,      color: 'bg-[#00AEEF]/10 text-[#00AEEF]' },
  { label: 'Direct-to-Consumer Brands', icon: Tag,         color: 'bg-[#0891B2]/10 text-[#0891B2]' },
];

function TrustBar() {
  return (
    <section id="trust" className="bg-slate-50 border-y border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by commerce teams across industries</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {TRUST_SEGMENTS.map(({ label, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
              <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-[#1B2F6E] whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem / Stats ──────────────────────────────────────────────────────────

function Problem() {
  const stats = [
    {
      value: '15–25%',
      label: 'Revenue unlocked by improving catalog quality',
      sub: 'High-quality product data and rich content directly lift conversion, search rankings, and repeat purchases — turning your catalog into a compounding growth asset.',
      icon: TrendingUp,
    },
    {
      value: '40%',
      label: 'Of online returns eliminated with accurate product content',
      sub: 'When customers get exactly what the listing promised — right specs, right images, right descriptions — trust builds and returns drop.',
      icon: BarChart3,
    },
    {
      value: '82%',
      label: 'Of AI commerce initiatives powered by clean, structured data',
      sub: 'AI shopping agents surface products with complete, well-structured attributes. Better data means more discovery, more visibility, more revenue.',
      icon: Zap,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#00AEEF]/10 text-[#00AEEF] text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            The Opportunity in Your Product Data
          </div>
          <h2 className="text-4xl font-extrabold text-[#1B2F6E] mb-4">Great product data is your most scalable growth lever</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Every attribute enriched, every feed normalized, every piece of content optimized — it all compounds into better discovery, stronger conversion, and fewer returns. DatavioAI makes that compounding continuous.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map(({ value, label, sub, icon: Icon }) => (
            <div key={value} className="group bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:shadow-md hover:border-[#00AEEF]/30 transition-all">
              <div className="inline-flex items-center justify-center w-11 h-11 bg-[#00AEEF]/10 rounded-xl mb-4 group-hover:bg-[#00AEEF]/20 transition-colors">
                <Icon className="w-5 h-5 text-[#00AEEF]" />
              </div>
              <div className="text-4xl font-extrabold text-[#1B2F6E] mb-1">{value}</div>
              <p className="font-semibold text-[#1B2F6E] mb-2 text-base">{label}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Platform Capabilities ────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    icon: Tag,
    title: 'Catalog Scoring',
    tagline: 'Know exactly where you stand.',
    desc: 'Get a real-time completeness, accuracy, and richness score for every product in your catalog. DatavioAI flags the gaps that cost you rankings, clicks, and conversions — so your team knows exactly where to focus.',
    accent: 'cyan',
  },
  {
    icon: Database,
    title: 'Catalog Builder',
    tagline: 'One source of truth for all your products.',
    desc: 'Ingest product data from any source — ERP, PIM, supplier feeds, or flat files — and transform it into a clean, validated, and consistently structured master catalog that powers every downstream channel.',
    accent: 'green',
  },
  {
    icon: Layers,
    title: 'Data Enrichment',
    tagline: 'Fill the gaps. Automatically.',
    desc: 'Our AI enriches missing attributes, normalizes inconsistent titles, generates channel-specific descriptions, and structures raw product data into retail-ready records — no manual spreadsheet work required.',
    accent: 'navy',
  },
  {
    icon: Filter,
    title: 'Data Cleansing & Standardisation',
    tagline: 'Clean input. Consistent output.',
    desc: 'Detect and resolve duplicate SKUs, conflicting values, and non-standard formats across every supplier feed. DatavioAI applies intelligent cleansing rules to deliver a standardized, trustworthy catalog — automatically.',
    accent: 'cyan',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Governance',
    tagline: 'Protect your catalog quality at scale.',
    desc: 'Set quality thresholds, define data standards, and let DatavioAI monitor your catalog 24/7. Automated QA workflows catch regressions, alert your team, and prevent bad data from ever reaching the shelf.',
    accent: 'navy',
  },
  {
    icon: Search,
    title: 'AI Search Optimization',
    tagline: 'Be found first. Every time.',
    desc: 'Go beyond keyword stuffing. DatavioAI applies semantic enrichment, intelligent attribute mapping, and omnichannel keyword strategies to ensure your products surface in every search — on-site, marketplace, and AI-driven.',
    accent: 'green',
  },
  {
    icon: Sparkles,
    title: 'Unique Product Content',
    tagline: 'Stand out on every shelf.',
    desc: 'Generate differentiated, brand-consistent product descriptions, bullet points, and rich content — at scale. DatavioAI creates unique, conversion-optimized copy for every SKU, tailored to each channel\'s audience.',
    accent: 'cyan',
  },
];

const accentMap: Record<string, { bg: string; icon: string; border: string; tag: string }> = {
  cyan:  { bg: 'bg-[#00AEEF]/10', icon: 'text-[#00AEEF]', border: 'border-[#00AEEF]/20', tag: 'bg-[#00AEEF]/10 text-[#00AEEF]' },
  navy:  { bg: 'bg-[#0891B2]/10', icon: 'text-[#0891B2]', border: 'border-[#0891B2]/20', tag: 'bg-[#0891B2]/10 text-[#0891B2]' },
  green: { bg: 'bg-[#00C853]/10', icon: 'text-[#00C853]', border: 'border-[#00C853]/20', tag: 'bg-[#00C853]/10 text-[#00C853]' },
};

function Platform() {
  const [active, setActive] = useState(0);
  const cap = CAPABILITIES[active];
  const a = accentMap[cap.accent];

  return (
    <section id="platform" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#00AEEF]/10 text-[#00AEEF] text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wide">
            Platform Capabilities
          </div>
          <h2 className="text-4xl font-extrabold text-[#1B2F6E] mb-3">One platform. Every catalog challenge solved.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            DatavioAI delivers a complete, AI-native catalog intelligence stack — from raw data ingestion to governed, channel-ready product content.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            {CAPABILITIES.map(({ icon: Icon, title, accent }, i) => {
              const ta = accentMap[accent];
              return (
                <button key={title} onClick={() => setActive(i)}
                  className={`text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${active === i ? 'border-transparent bg-white shadow-md' : 'border-transparent hover:bg-white/60'}`}>
                  <div className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center ${active === i ? ta.bg : 'bg-slate-200'}`}>
                    <Icon className={`w-4 h-4 ${active === i ? ta.icon : 'text-slate-500'}`} />
                  </div>
                  <span className={`font-semibold text-sm ${active === i ? 'text-[#1B2F6E]' : 'text-slate-500'}`}>{title}</span>
                  {active === i && <ChevronRight className="w-4 h-4 text-[#00AEEF] ml-auto flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className={`lg:col-span-3 bg-white border ${a.border} rounded-2xl p-7 shadow-sm`}>
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${a.tag} mb-4 uppercase tracking-wide`}>{cap.title}</span>
            <div className={`w-12 h-12 ${a.bg} rounded-xl flex items-center justify-center mb-4`}>
              <cap.icon className={`w-6 h-6 ${a.icon}`} />
            </div>
            <h3 className="text-2xl font-extrabold text-[#1B2F6E] mb-2">{cap.tagline}</h3>
            <p className="text-slate-500 leading-relaxed text-base mb-5">{cap.desc}</p>
            <Link to="/demo" className="inline-flex items-center gap-2 text-[#00AEEF] font-semibold text-sm hover:gap-3 transition-all">
              Book a demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Solutions ────────────────────────────────────────────────────────────────

const SEGMENTS = [
  {
    title: 'Ecommerce Retailers',
    tagline: 'Convert browsers into buyers.',
    desc: 'Richer product content means better search rankings, fewer returns, and higher add-to-cart rates. DatavioAI ensures every PDP is complete, compelling, and optimized for conversion at scale.',
    icon: Globe,
    accent: 'cyan',
  },
  {
    title: 'B2B Distributors',
    tagline: 'Turn supplier chaos into catalog confidence.',
    desc: 'Normalize thousands of supplier feeds, eliminate duplicate SKUs, and build a single trusted product catalog that empowers your sales team and accelerates digital commerce.',
    icon: Database,
    accent: 'navy',
  },
  {
    title: 'Manufacturers & Brands',
    tagline: 'Control your content everywhere it\'s sold.',
    desc: 'Maintain brand accuracy and content richness across every retail partner and digital channel — from a single source of truth. No more outdated specs, wrong images, or off-brand copy.',
    icon: ShieldCheck,
    accent: 'green',
  },
  {
    title: 'Marketplaces',
    tagline: 'Enforce quality. At any volume.',
    desc: 'Validate every seller submission against your data standards. DatavioAI scales to millions of listings — ensuring consistent quality, faster onboarding, and better buyer experiences.',
    icon: Layers,
    accent: 'cyan',
  },
];

function Solutions() {
  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#00C853]/10 text-[#00C853] text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wide">
            Built for Your Business
          </div>
          <h2 className="text-4xl font-extrabold text-[#1B2F6E] mb-3">The right solution for every commerce model</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            DatavioAI adapts to your catalog complexity, your team size, and your growth ambitions.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SEGMENTS.map(({ title, tagline, desc, icon: Icon, accent }) => {
            const a = accentMap[accent];
            return (
              <div key={title} className={`group bg-white border ${a.border} rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}>
                <div className={`w-11 h-11 ${a.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${a.icon}`} />
                </div>
                <h3 className="font-bold text-[#1B2F6E] mb-1 text-base">{title}</h3>
                <p className={`text-xs font-semibold ${a.icon} mb-2`}>{tagline}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Why DatavioAI ────────────────────────────────────────────────────────────

const COMPARISON = [
  { topic: 'Data quality visibility', before: 'Discovered after customer complaints or returns', after: 'Real-time scoring with proactive alerts' },
  { topic: 'Enrichment workflow', before: 'Manual data entry across spreadsheets and teams', after: 'AI-automated, attribute-level enrichment at scale' },
  { topic: 'Search performance', before: 'Guesswork-driven keyword updates', after: 'Omnichannel keyword optimization mapped to buyer intent' },
  { topic: 'Time to new channel', before: 'Weeks of mapping, reformatting, and QA', after: 'Days — with pre-built channel templates' },
  { topic: 'Governance & compliance', before: 'Reactive fixes after problems surface', after: 'Continuous monitoring with automated guardrails' },
];

function WhyDatavio() {
  return (
    <section id="why-datavio" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-[#1B2F6E] mb-4">One-time fixes decay. Systems compound.</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Every team has tried to clean the catalog. The pattern is always the same: audit, enrich, celebrate, regress. DatavioAI replaces the cleanup cycle with a permanent intelligence layer.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full bg-white text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-4 text-[#1B2F6E] font-bold text-xs uppercase tracking-wider w-1/4">Area</th>
                <th className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <X className="w-3.5 h-3.5 text-red-400" /> Traditional Approach
                  </span>
                </th>
                <th className="px-6 py-4 text-center bg-gradient-to-r from-[#00AEEF]/5 to-[#00C853]/5">
                  <span className="inline-flex items-center gap-1.5 text-[#1B2F6E] font-bold text-xs uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 text-[#00AEEF]" /> DatavioAI
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(({ topic, before, after }, i) => (
                <tr key={topic} className={`border-b border-slate-50 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                  <td className="px-6 py-5 font-semibold text-[#1B2F6E]">{topic}</td>
                  <td className="px-6 py-5 text-center text-slate-400">{before}</td>
                  <td className="px-6 py-5 text-center bg-gradient-to-r from-[#00AEEF]/3 to-[#00C853]/3">
                    <span className="inline-flex items-center gap-2 text-[#1B2F6E] font-medium">
                      <CheckCircle className="w-4 h-4 text-[#00C853] flex-shrink-0" /> {after}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          {[
            { stat: '3×', label: 'Higher Conversion', sub: 'With fully enriched product content', color: 'text-[#00AEEF]' },
            { stat: '60%', label: 'Faster Time-to-Market', sub: 'From data ingestion to channel-ready listings', color: 'text-[#1B2F6E]' },
            { stat: '40%', label: 'Reduction in Returns', sub: 'Through accurate, complete product information', color: 'text-[#00C853]' },
          ].map(({ stat, label, sub, color }) => (
            <div key={stat} className="text-center bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <p className={`text-4xl font-extrabold mb-1 ${color}`}>{stat}</p>
              <p className="font-bold text-[#1B2F6E] mb-1">{label}</p>
              <p className="text-xs text-slate-500">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "We manage around 8,000 SKUs across multiple categories, and keeping product data consistent across our channels was a constant drain on the team. DatavioAI gave us a clear picture of where the gaps were, filled them automatically, and built a governance layer so we stopped re-doing the same fixes. Organic search performance improved noticeably within the first few weeks.",
    name: 'Sarah Mitchell',
    title: 'VP of Ecommerce, Global Retail Brand',
    initials: 'SM',
  },
  {
    quote: "Every supplier sent data in a different format. Taxonomy mismatches were breaking our filters, and missing specs were eroding buyer trust. DatavioAI normalized our vendor feeds and gave us a catalog our sales team actually relies on.",
    name: 'James Okoye',
    title: 'Director of Product Operations, B2B Distributor',
    initials: 'JO',
  },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-[#1B2F6E] mb-3">Results commerce teams can count on</h2>
          <p className="text-slate-500 text-lg">Don't take our word for it.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 text-center">
            <div className="flex justify-center mb-4 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            </div>
            <blockquote className="text-xl text-[#1B2F6E] font-medium leading-relaxed mb-8">"{t.quote}"</blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#1B2F6E] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{t.initials}</div>
              <div className="text-left">
                <p className="font-bold text-[#1B2F6E] text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.title}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-5">
            <button onClick={() => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors text-slate-400"><ChevronLeft className="w-4 h-4" /></button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-[#00AEEF] w-5' : 'bg-slate-300'}`} />)}
            </div>
            <button onClick={() => setIdx((idx + 1) % TESTIMONIALS.length)} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors text-slate-400"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Band ─────────────────────────────────────────────────────────────────

function CtaBand() {
  return (
    <section id="contact" className="py-20 bg-[#1B2F6E] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00AEEF]/10 -translate-y-1/3 translate-x-1/3 pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00C853]/10 translate-y-1/2 -translate-x-1/4 pointer-events-none blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
          <Zap className="w-3.5 h-3.5" /> Get Started
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
          Stop patching your catalog.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#00C853]">Start compounding its value.</span>
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          Book a demo and we'll run your first 100 products through the DatavioAI platform — completely free. You'll receive a full catalog quality report showing exactly where your data stands and what it'll take to drive more revenue.
        </p>
        <div className="inline-flex items-center gap-2 bg-[#00C853]/20 border border-[#00C853]/30 text-[#00C853] font-semibold text-sm px-5 py-2.5 rounded-full mb-9">
          <CheckCircle className="w-4 h-4" /> Run 100 products free — get your catalog quality report
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
          <Link to="/demo" className="inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-[#00AEEF]/30 hover:-translate-y-0.5 text-base">
            Book Your Demo <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="mailto:info@datavio.com" className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white font-semibold px-8 py-4 rounded-xl transition-all text-base">
            <Mail className="w-4 h-4" /> Email Us Directly
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { text: 'Catalog quality report on your data' },
            { text: 'Tailored revenue improvement roadmap' },
            { text: 'Direct access to catalog specialists' },
          ].map(({ text }) => (
            <div key={text} className="flex items-center gap-2 justify-center">
              <CheckCircle className="w-4 h-4 text-[#00C853] flex-shrink-0" />
              <span className="text-white/70 text-sm">{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 text-sm text-white/40">
          <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@datavio.com</div>
          <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> www.datavioai.com</div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────

function ContactPage() {
  useEffect(() => {
    navigate('/demo');
  }, []);
  return null;
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer className="bg-slate-100 text-slate-500 py-14 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="inline-block bg-white rounded-xl px-5 py-3 mb-5 shadow-sm border border-slate-200">
<img src="/Datavio_logo.png" alt="DatavioAI" className="h-20 w-auto" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-slate-600 font-medium">
              Your product data is your most powerful growth asset. DatavioAI turns raw, inconsistent catalog data into enriched, governed, omnichannel-ready content — so every product works harder across every channel.
            </p>
          </div>
          <div>
            <p className="text-slate-700 text-sm font-bold mb-4">Platform</p>
            <ul className="space-y-2.5 text-sm">
              {['Catalog Scoring', 'Catalog Builder', 'Data Enrichment', 'Data Cleansing & Standardisation', 'Continuous Governance', 'AI Search Optimization', 'Unique Product Content'].map((item) => (
                <li key={item}><a href="#platform" className="hover:text-[#00AEEF] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-slate-700 text-sm font-bold mb-4">Company</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-[#00AEEF] transition-colors">About DatavioAI</Link></li>
              <li><Link to="/solutions" className="hover:text-[#00AEEF] transition-colors">Solutions</Link></li>
              <li><Link to="/use-cases" className="hover:text-[#00AEEF] transition-colors">Use Cases</Link></li>
              <li><Link to="/contact" className="hover:text-[#00AEEF] transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-[#00AEEF] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} DatavioAI. All rights reserved.</p>
          <p>www.datavioai.com</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

function Home() {
  return (
    <div className="font-sans antialiased">
      <PageHeader />
      <Hero />
      <TrustBar />
      <Problem />
      <Platform />
      <Solutions />
      <WhyDatavio />
      <Testimonials />
      <CtaBand />
      <SiteFooter />
    </div>
  );
}

// ─── App (router) ─────────────────────────────────────────────────────────────

export default function App() {
  const path = useRoute();
  if (path === '/demo') return <DemoPage navigate={navigate} />;
  if (path === '/privacy') return <PrivacyPage navigate={navigate} />;
  if (path === '/use-cases') return <UseCasesPage navigate={navigate} />;
  if (path === '/about') return <AboutPage navigate={navigate} />;
  if (path === '/solutions') return <SolutionsPage navigate={navigate} />;
  if (path === '/contact') return <ContactPage />;
  return <Home />;
}
