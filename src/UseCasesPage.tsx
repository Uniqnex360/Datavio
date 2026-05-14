import {
  Globe,
  Database,
  ShieldCheck,
  Layers,
  Tag,
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Package,
} from 'lucide-react';
import { SiteFooter, PageHeader, navigate as appNavigate } from './App';

const USE_CASES = [
  {
    segment: 'Ecommerce Retailers',
    icon: Globe,
    accent: { bg: 'bg-[#00AEEF]/10', icon: 'text-[#00AEEF]', border: 'border-[#00AEEF]/20', pill: 'bg-[#00AEEF]/10 text-[#00AEEF]' },
    challenge: 'Product pages with missing attributes, inconsistent descriptions, and poor search placement are quietly draining conversion and inflating return rates — without a clear signal of where to fix first.',
    solution: 'DatavioAI scores every PDP for completeness and content quality, enriches missing attributes automatically, and generates channel-optimized descriptions and titles that lift both search ranking and add-to-cart rates.',
    outcomes: [
      '3× higher conversion on fully enriched product pages',
      '40% reduction in returns through accurate descriptions',
      'Search visibility improved within 30 days of enrichment',
    ],
    capabilities: ['Catalog Scoring', 'Data Enrichment', 'Unique Product Content', 'AI Search Optimization'],
  },
  {
    segment: 'B2B Distributors',
    icon: Database,
    accent: { bg: 'bg-[#0891B2]/10', icon: 'text-[#0891B2]', border: 'border-[#0891B2]/20', pill: 'bg-[#0891B2]/10 text-[#0891B2]' },
    challenge: 'Hundreds of suppliers, each with their own taxonomy, units, and naming conventions. Merging those feeds into a single, trusted catalog manually is slow, error-prone, and always out of date.',
    solution: 'DatavioAI ingests supplier feeds in any format, normalizes taxonomy and units, deduplicates SKUs, and publishes a continuously governed master catalog — ready for your sales team, digital channels, and ERP.',
    outcomes: [
      '60% faster time-to-catalog for new supplier onboarding',
      'Single source of truth powering all downstream systems',
      'Duplicate SKU rate reduced to near-zero',
    ],
    capabilities: ['Catalog Builder', 'Data Cleansing & Standardisation', 'Continuous Governance'],
  },
  {
    segment: 'Manufacturers & Brands',
    icon: ShieldCheck,
    accent: { bg: 'bg-[#00C853]/10', icon: 'text-[#00C853]', border: 'border-[#00C853]/20', pill: 'bg-[#00C853]/10 text-[#00C853]' },
    challenge: 'Technical spec sheets are not retail-ready. Retail partners reject feeds, marketplaces suppress listings, and off-brand copy appears across channels because there is no single controlled content source.',
    solution: 'DatavioAI transforms technical product data into rich, structured, brand-consistent content for every retail channel — maintaining a single master record that automatically adapts to each partner\'s requirements.',
    outcomes: [
      'Zero feed rejections from retail partners',
      'Brand-consistent content across all digital shelves',
      'Faster new product launches across channels',
    ],
    capabilities: ['Unique Product Content', 'Data Enrichment', 'Catalog Builder', 'Continuous Governance'],
  },
  {
    segment: 'Wholesalers & Suppliers',
    icon: Package,
    accent: { bg: 'bg-[#00AEEF]/10', icon: 'text-[#00AEEF]', border: 'border-[#00AEEF]/20', pill: 'bg-[#00AEEF]/10 text-[#00AEEF]' },
    challenge: 'Products from multiple sources arrive in different formats, with inconsistent naming, varying attribute structures, and missing values that make catalog publishing slow and unreliable.',
    solution: 'DatavioAI cleanses, standardises, and merges product inputs from all your sources into a single clean output — so every product leaving your catalog is accurate, complete, and channel-ready.',
    outcomes: [
      'Consistent catalog output regardless of input quality',
      'Dramatic reduction in manual data handling hours',
      'Faster fulfillment of retailer and platform requirements',
    ],
    capabilities: ['Data Cleansing & Standardisation', 'Catalog Builder', 'Data Enrichment'],
  },
  {
    segment: 'Marketplaces',
    icon: Layers,
    accent: { bg: 'bg-[#0891B2]/10', icon: 'text-[#0891B2]', border: 'border-[#0891B2]/20', pill: 'bg-[#0891B2]/10 text-[#0891B2]' },
    challenge: 'As seller counts grow, maintaining consistent listing quality becomes impossible manually. Low-quality submissions degrade buyer experience, suppress search, and increase support volume.',
    solution: 'DatavioAI validates every seller submission against your quality standards, scores listings in real time, and provides sellers with actionable improvement guidance — keeping quality high at any volume.',
    outcomes: [
      'Consistent listing quality across thousands of sellers',
      'Faster seller onboarding with automated validation',
      'Better buyer experience driving higher repeat purchase rates',
    ],
    capabilities: ['Catalog Scoring', 'Continuous Governance', 'AI Search Optimization'],
  },
];

const CAPABILITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Catalog Scoring': Tag,
  'Catalog Builder': Database,
  'Data Enrichment': Sparkles,
  'Data Cleansing & Standardisation': Filter,
  'Continuous Governance': RefreshCw,
  'AI Search Optimization': Search,
  'Unique Product Content': BarChart3,
};

export default function UseCasesPage({ navigate }: { navigate: (to: string) => void }) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <PageHeader />

      {/* Hero */}
      <div className="bg-[#1B2F6E] relative overflow-hidden flex-shrink-0 pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00AEEF]/10 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Use Cases
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-5">
            How DatavioAI Works<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#00C853]">
              Across Every Commerce Model
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you manage 500 SKUs or 5 million, sell direct-to-consumer or through 200 retail partners — DatavioAI adapts to your catalog challenge and delivers measurable results.
          </p>
        </div>
      </div>

      {/* Use case cards */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-16 space-y-10">
        {USE_CASES.map(({ segment, icon: Icon, accent, challenge, solution, outcomes, capabilities }) => (
          <div key={segment} className={`border ${accent.border} rounded-2xl overflow-hidden`}>
            {/* Card header */}
            <div className="flex items-center gap-4 px-7 py-5 bg-slate-50 border-b border-slate-100">
              <div className={`w-12 h-12 ${accent.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${accent.icon}`} />
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${accent.pill}`}>{segment}</span>
              </div>
            </div>

            {/* Card body */}
            <div className="p-7 grid md:grid-cols-3 gap-6">
              {/* Challenge */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">The Challenge</p>
                <p className="text-slate-600 text-sm leading-relaxed">{challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">How DatavioAI Solves It</p>
                <p className="text-slate-600 text-sm leading-relaxed">{solution}</p>
              </div>

              {/* Outcomes + capabilities */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Outcomes</p>
                  <div className="space-y-1.5">
                    {outcomes.map((o) => (
                      <div key={o} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00C853] flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-xs leading-relaxed">{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Capabilities Used</p>
                  <div className="flex flex-wrap gap-1.5">
                    {capabilities.map((cap) => {
                      const CapIcon = CAPABILITY_ICONS[cap] ?? TrendingUp;
                      return (
                        <span key={cap} className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${accent.pill}`}>
                          <CapIcon className="w-3 h-3" /> {cap}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-[#1B2F6E] rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white mb-3">Ready to see DatavioAI on your catalog?</h2>
            <p className="text-white/60 text-base max-w-lg mx-auto mb-7">
              We'll run your first 100 products through the platform free and deliver a full catalog quality report showing exactly where your data stands.
            </p>
            <a
              href="/demo"
              onClick={(e) => { e.preventDefault(); appNavigate('/demo'); }}
              className="inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-[#00AEEF]/30 hover:-translate-y-0.5"
            >
              Book Your Free Demo <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
