import { useState } from "react";
import {
  CheckCircle,
  ArrowRight,
  BarChart3,
  Zap,
  Users,
  Clock,
  TrendingUp,
  RefreshCw,
  FileSearch,
  ChevronDown,
} from "lucide-react";
import { supabase } from "./supabase";
import { SiteFooter, navigate as appNavigate } from "./App";

const CHALLENGES = [
  "Data normalisation across supplier feeds",
  "Data cleansing and standardisation",
  "Merging inputs from multiple suppliers into one catalog",
  "Data validation and quality control",
  "Missing or incomplete product attributes",
  "Poor search visibility and low conversion rates",
  "Slow time-to-market for new product listings",
  "Omnichannel content readiness",
  "Duplicate SKU management",
  "Brand content consistency across channels",
  "Other",
];

const ROLES = [
  "Brand",
  "Manufacturer",
  "Wholesaler",
  "Supplier",
  "Distributor",
  "Retailer",
  "Marketplace",
];

const WHAT_TO_EXPECT = [
  {
    icon: FileSearch,
    title: "Your catalog quality report",
    desc: "We'll assess your product data and deliver a clear report showing where your catalog stands today — completeness, consistency, and enrichment gaps.",
  },
  {
    icon: Clock,
    title: "100 products run through the platform — free",
    desc: "We'll process your first 100 SKUs at no cost, so you can see exactly what DatavioAI produces before committing to anything.",
  },
  {
    icon: BarChart3,
    title: "A revenue impact breakdown",
    desc: "You'll see which data gaps are costing you the most — and a prioritized plan for what to fix first to drive measurable improvement.",
  },
  {
    icon: Users,
    title: "A specialist, not a script",
    desc: "You'll speak directly with a catalog intelligence expert who understands your industry and your catalog challenges.",
  },
];

const PROOF_POINTS = [
  {
    stat: "75%",
    label: "Organic traffic increase",
    sub: "Within 30 days for a 5,000-SKU retailer",
  },
  {
    stat: "1M+",
    label: "SKUs scored and enriched",
    sub: "For an industrial B2B distributor",
  },
  {
    stat: "4×",
    label: "Faster catalog intelligence",
    sub: "Vs. manual audit processes",
  },
  {
    stat: "40%",
    label: "Fewer product returns",
    sub: "Through accurate, complete listings",
  },
];

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  roles: string[];
  catalog_challenge: string;
  other_challenge: string;
};

const EMPTY_FORM: FormData = {
  first_name: "",
  last_name: "",
  email: "",
  company: "",
  roles: [],
  catalog_challenge: "",
  other_challenge: "",
};
const sendFormspreeSubmission = async (formData: FormData) => {
  try {
    const response = await fetch("https://formspree.io/f/mdabrbyo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        company: formData.company,
        roles: formData.roles.join(", "),
        catalog_challenge: formData.catalog_challenge,
        other_challenge: formData.other_challenge,
        _subject: `${formData.first_name}, thank you for requesting a DataVioAI demo!`,
        _replyto: formData.email,
        _autoresponse: `Hi ${formData.first_name},

Thank you for your interest in DataVioAI.

We're excited to show you how DataVioAI helps ecommerce businesses automate catalog enrichment, product data normalization, and catalog quality optimization at scale.

One of our team members will connect with you shortly to schedule your demo.

In the meantime, feel free to explore our website to learn more about the platform.

We look forward to speaking with you soon.

Best Regards,

Sunita
DataVioAI
https://datavioai.com`,
      }),
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    return { success: true };
  } catch (error) {
    console.error("Formspree submission error:", error);
    return { success: false, error };
  }
};

export default function DemoPage({
  navigate,
}: {
  navigate: (to: string) => void;
}) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const set =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleRole = (role: string) => {
    setForm((f) => ({
      ...f,
      roles: f.roles.includes(role)
        ? f.roles.filter((r) => r !== role)
        : [...f.roles, role],
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (form.roles.length === 0) {
    setError("Please select at least one role that describes you.");
    return;
  }
  setLoading(true);
  setError("");

  try {
    const { error: dbError } = await supabase.from("demo_requests").insert({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      company: form.company,
      roles: form.roles,
      catalog_challenge: form.catalog_challenge,
      other_challenge:
        form.catalog_challenge === "Other" ? form.other_challenge : "",
    });

    if (dbError) {
      throw new Error("Database error");
    }

    // Send email via Supabase Edge Function
    const { error: emailError } = await supabase.functions.invoke('dynamic-responder', {
      body: { 
        email: form.email, 
        first_name: form.first_name 
      }
    });

    setEmailSent(!emailError);
    setSubmitted(true);
  } catch (err) {
    setError(
      "Something went wrong. Please try again or email us at sunita@datavioai.com",
    );
  } finally {
    setLoading(false);
  }
};

  const inputClass =
    "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition bg-white";
  const labelClass = "block text-sm font-semibold text-[#1B2F6E] mb-1.5";

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <header className="bg-white border-b border-slate-100 py-4 px-6 flex items-center justify-between flex-shrink-0">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="flex-shrink-0"
        >
         <img src="/Datavio_logo.png" alt="DatavioAI" className="h-20 w-auto" />

        </a>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="text-sm font-medium text-slate-500 hover:text-[#1B2F6E] transition-colors hidden sm:block"
        >
          ← Back to homepage
        </a>
      </header>

      <div className="bg-[#1B2F6E] relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.06)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00AEEF]/10 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00C853]/10 translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" /> Schedule Your Demo
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-5">
            See Exactly Where Your Catalog
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#00C853]">
              Stands — and What It's Worth.
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            We'll assess your product data and deliver a full catalog quality
            report showing where your data stands today and the exact steps to
            bring more revenue from it.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#00C853]/20 border border-[#00C853]/40 text-[#00C853] font-semibold text-sm px-5 py-2.5 rounded-full">
            <CheckCircle className="w-4 h-4" /> We'll run your first 100
            products through the platform — completely free
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-14">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-20 h-20 bg-[#00C853]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#00C853]" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#1B2F6E] mb-3">
                  {form.first_name}, thank you for requesting a DataVio AI demo!
                </h2>
                <p className="text-slate-500 text-base leading-relaxed max-w-sm mx-auto mb-6">
                  Our catalog intelligence team will contact you shortly to schedule your personalized DataVioAI demo and prepare your complimentary catalog quality analysis.
                </p>

                {emailSent && (
                  <div className="bg-[#00C853]/10 border border-[#00C853]/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 justify-center text-[#00C853] text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Confirmation email sent to {form.email}
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 rounded-xl p-5 text-left border border-slate-100 max-w-sm mx-auto mb-8">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wide mb-3">
                    What happens next
                  </p>
                  {[
                    "Confirmation email on its way to you",
                    "A specialist reaches out to book your time",
                    "We process your first 100 products — free",
                    "You receive your full catalog quality report",
                  ].map((s) => (
                    <div key={s} className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-[#00C853] flex-shrink-0" />
                      <span className="text-sm text-slate-600">{s}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  className="inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-semibold px-7 py-3 rounded-xl transition-colors"
                >
                  Back to DatavioAI <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-extrabold text-[#1B2F6E] mb-1">
                  Request Your Free Demo
                </h2>
                <p className="text-slate-500 text-sm mb-6">
                  Fill in your details and a catalog specialist will reach out
                  within one business day.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first_name" className={labelClass}>
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="first_name"
                        type="text"
                        required
                        placeholder="Jane"
                        value={form.first_name}
                        onChange={set("first_name")}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="last_name" className={labelClass}>
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="last_name"
                        type="text"
                        required
                        placeholder="Smith"
                        value={form.last_name}
                        onChange={set("last_name")}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Work Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={set("email")}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClass}>
                      Company Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      required
                      placeholder="Acme Distribution Co."
                      value={form.company}
                      onChange={set("company")}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      How would you describe yourself?{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <p className="text-xs text-slate-400 mb-2">
                      Select all that apply
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ROLES.map((role) => {
                        const selected = form.roles.includes(role);
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => toggleRole(role)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                              selected
                                ? "bg-[#00AEEF] border-[#00AEEF] text-white shadow-sm"
                                : "bg-white border-slate-200 text-slate-600 hover:border-[#00AEEF] hover:text-[#00AEEF]"
                            }`}
                          >
                            {role}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="catalog_challenge" className={labelClass}>
                      Biggest Catalog Challenge{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="catalog_challenge"
                        required
                        value={form.catalog_challenge}
                        onChange={set("catalog_challenge")}
                        className={`${inputClass} appearance-none pr-10 ${!form.catalog_challenge ? "text-slate-400" : "text-slate-900"}`}
                      >
                        <option value="" disabled>
                          Select your biggest challenge…
                        </option>
                        {CHALLENGES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {form.catalog_challenge === "Other" && (
                    <div>
                      <label htmlFor="other_challenge" className={labelClass}>
                        Tell us more <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="other_challenge"
                        required
                        rows={3}
                        placeholder="Describe your catalog challenge in a few sentences…"
                        value={form.other_challenge}
                        onChange={set("other_challenge")}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00AEEF] hover:bg-[#0099d6] disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#00AEEF]/30 flex items-center justify-center gap-2 text-base"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />{" "}
                        Submitting…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Get My Free Catalog Report{" "}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 pt-1">
                    By submitting this form you agree to our{" "}
                    <a
                      href="/privacy"
                      onClick={(e) => {
                        e.preventDefault();
                        appNavigate("/privacy");
                      }}
                      className="underline hover:text-[#00AEEF]"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="bg-gradient-to-br from-[#00C853]/10 to-[#00AEEF]/10 border border-[#00C853]/30 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#00C853]/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp className="w-5 h-5 text-[#00C853]" />
                </div>
                <div>
                  <p className="font-extrabold text-[#1B2F6E] text-sm mb-1">
                    Run 100 products — completely free
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Send us a sample of your product data and we'll run it
                    through the full DatavioAI platform. You'll receive a
                    detailed catalog quality report showing exactly where your
                    data stands and what it'll take to bring more revenue.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-4">
                What to expect
              </p>
              <div className="space-y-4">
                {WHAT_TO_EXPECT.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#00AEEF]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#00AEEF]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1B2F6E] text-sm mb-0.5">
                        {title}
                      </p>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1B2F6E] rounded-2xl p-5">
              <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-4">
                Proven results
              </p>
              <div className="grid grid-cols-2 gap-3">
                {PROOF_POINTS.map(({ stat, label, sub }) => (
                  <div key={stat} className="bg-white/10 rounded-xl p-3">
                    <p className="text-xl font-extrabold text-[#00AEEF] mb-0.5">
                      {stat}
                    </p>
                    <p className="text-white text-xs font-bold mb-0.5 leading-tight">
                      {label}
                    </p>
                    <p className="text-white/50 text-xs leading-tight">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
