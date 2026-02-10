export const metadata = {
  title: 'Careers — PingMeUp',
  description: 'Hiring developer intern (remote, must be based in Pune). Email info@pingmeup.in with proof of work.',
};
import ApplyForm from './ApplyForm';

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-visible pb-24 lg:pb-32">
        <div className="bg-gradient-to-tr from-sky-500 via-indigo-600 to-indigo-700 py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Join PingMeUp — Dev Intern
            </h1>
            <p className="text-lg text-indigo-100 max-w-3xl mx-auto mb-8">
              Software Engineering Intern (Development). Remote-capable but must be based in Pune. Show us your work, not your certificates.
            </p>

            <div className="flex items-center justify-center gap-4">
              <a
                href="mailto:info@pingmeup.in?subject=Intern%20Application%20(Dev)&body=Hi%20PingMeUp%2C%0A%0AI%20would%20like%20to%20apply%20for%20the%20developer%20intern%20role.%20Here%20are%20my%20projects%3A%20%0A%0A%5Bpaste%20links%20here%5D%0A%0AThanks%2C"
                className="inline-flex items-center gap-3 px-6 py-4 bg-white text-gray-900 rounded-full font-semibold shadow-lg hover:scale-[1.02] transition-transform"
              >
                Apply via Email
              </a>

              {/* <a
                href="#quick-apply"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/20 text-white rounded-full border border-white/20 hover:bg-white/30 transition-colors"
              >
                Quick Apply (no attachments)
              </a> */}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 -mt-10 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-2xl font-bold mb-3">Why we hire builders — not resumes</h2>
                <p className="text-gray-600 mb-4">
                  Qualifications don't matter here. If you're self-motivated, curious, and can build things that work — we'll give you a shot.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">1</div>
                    <div>
                      <p className="font-semibold">Show your work</p>
                      <p className="text-sm text-gray-500">GitHub repos, live projects, or any demos.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">2</div>
                    <div>
                      <p className="font-semibold">Be coachable</p>
                      <p className="text-sm text-gray-500">We value learning velocity over formal experience.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">3</div>
                    <div>
                      <p className="font-semibold">Based in Pune</p>
                      <p className="text-sm text-gray-500">Role is remote but applicants must be located in Pune.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Proof of work — examples (temporarily hidden)
              <div>
                <h3 className="text-lg font-semibold mb-3">Proof of work — examples</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { title: 'Project Alpha', url: '#', tag: 'React' },
                    { title: 'CLI Tool', url: '#', tag: 'Go' },
                    { title: 'Portfolio', url: '#', tag: 'HTML' },
                    { title: 'API Service', url: '#', tag: 'Node' },
                    { title: 'Open-source PRs', url: '#', tag: 'OSS' },
                    { title: 'Mini App', url: '#', tag: 'Next.js' },
                  ].map((p) => (
                    <a
                      key={p.title}
                      href={p.url}
                      className="block p-3 border border-gray-100 rounded-xl hover:shadow group bg-white"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-sm">{p.title}</div>
                        <div className="text-xs text-gray-400">{p.tag}</div>
                      </div>
                      <div className="text-xs text-gray-500">Live demo / repo</div>
                    </a>
                  ))}
                </div>
              </div>
              */}
            </div>

            {/* Quick Apply (temporarily hidden)
            <div id="quick-apply" className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Quick Apply</h3>
              <p className="text-sm text-gray-500 mb-4">Fill this and we'll compose an email for you — no uploads required.</p>
              <ApplyForm />
            </div>
            */}
          </div>
        </div>
      </section>
    </main>
  );
}

