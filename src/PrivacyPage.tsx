import { Shield, Lock, Eye, Trash2, Mail } from 'lucide-react';
import { SiteFooter, PageHeader } from './App';

const POINTS = [
  {
    icon: Eye,
    title: 'What we collect',
    body: 'When you request a demo or contact us, we collect your name, work email, company name, and the details you share about your catalog challenges. We also collect standard technical data such as IP address and browser type to keep our services secure and functioning.',
  },
  {
    icon: Shield,
    title: 'How we use it',
    body: 'We use your information solely to respond to your enquiry, schedule and run your demo session, send you relevant updates about DatavioAI, and improve our platform. We do not sell, rent, or share your personal data with third parties for their own marketing purposes.',
  },
  {
    icon: Lock,
    title: 'How we protect it',
    body: 'Your data is encrypted in transit and at rest. Access is restricted to team members who need it to deliver your demo or support your account. We conduct regular security reviews and use industry-standard infrastructure to safeguard your information.',
  },
  {
    icon: Trash2,
    title: 'Your rights',
    body: 'You can request access to the data we hold about you, ask us to correct inaccuracies, or request deletion at any time. To exercise any of these rights, email us at privacy@datavio.com and we will respond within 30 days. You may also unsubscribe from marketing communications at any time via the link in any email we send.',
  },
  {
    icon: Mail,
    title: 'Contact',
    body: 'If you have questions about this policy or how we handle your data, please contact us at privacy@datavio.com. We are committed to resolving any concerns promptly and transparently.',
  },
];

export default function PrivacyPage({ navigate }: { navigate: (to: string) => void }) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <PageHeader />

      <div className="bg-[#1B2F6E] py-16 pt-36 px-6 text-center flex-shrink-0">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-5 mx-auto">
          <Shield className="w-7 h-7 text-[#00AEEF]" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
        <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed">
          We keep this simple. Here is exactly what data we collect, why we collect it, and how you can control it.
        </p>
        <p className="text-white/40 text-xs mt-4">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <div className="space-y-8">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-5 p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-[#00AEEF]/30 transition-colors">
              <div className="w-11 h-11 bg-[#00AEEF]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-[#00AEEF]" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#1B2F6E] mb-2">{title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-[#1B2F6E]/5 border border-[#1B2F6E]/10 rounded-2xl text-center">
          <p className="text-slate-600 text-sm leading-relaxed">
            We may update this policy occasionally. When we do, we will revise the date above. Continued use of our services after any update constitutes acceptance of the revised policy.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
