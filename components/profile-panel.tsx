import { activities, education, history, skills, tools } from "@/data/profile";
import { withAlpha } from "@/lib/color";

export function ProfilePanel() {
  return (
    <section id="profile" className="relative z-[1]">
      <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:pb-24">
        <p className="font-mono text-[11px] tracking-[0.22em] text-neutral-500">
          ■ PROFILE
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-suit)] text-3xl font-bold tracking-tight md:text-4xl">
          이재민 · Lee Jaemin
        </h2>
        <p className="mt-2 font-mono text-xs tracking-[0.16em] text-neutral-500">
          MARKETER
        </p>

        <div
          className="mt-12 space-y-0 border border-neutral-900/15 backdrop-blur-sm"
          style={{ background: withAlpha("#ECECEC", 0.72) }}
        >
          <div className="grid gap-2 border-b border-neutral-900/15 p-6 md:grid-cols-[160px_1fr]">
            <p className="font-mono text-xs tracking-[0.16em] text-neutral-400">
              01 · CONTACT
            </p>
            <dl className="space-y-2 text-base">
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <dt className="text-neutral-500">Birth</dt>
                <dd>2001.07.30</dd>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <dt className="text-neutral-500">Phone</dt>
                <dd>010.6378.8360</dd>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <dt className="text-neutral-500">E-mail</dt>
                <dd>
                  <a
                    className="underline underline-offset-4 hover:text-neutral-600"
                    href="mailto:jaeminmkt@gmail.com"
                  >
                    jaeminmkt@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-2 border-b border-neutral-900/15 p-6 md:grid-cols-[160px_1fr]">
            <p className="font-mono text-xs tracking-[0.16em] text-neutral-400">
              02 · SKILLS
            </p>
            <dl className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.title}>
                  <dt className="text-base font-medium">{skill.title}</dt>
                  <dd className="mt-1 text-sm leading-6 text-neutral-600">
                    {skill.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-2 border-b border-neutral-900/15 p-6 md:grid-cols-[160px_1fr]">
            <p className="font-mono text-xs tracking-[0.16em] text-neutral-400">
              03 · TOOLS
            </p>
            <p className="text-base leading-8 text-neutral-700">
              {tools
                .slice(0, 4)
                .map((tool) => tool.name)
                .join(" / ")}
              <br />
              {tools
                .slice(4)
                .map((tool) => tool.name)
                .join(" / ")}
            </p>
          </div>

          <div className="grid gap-2 border-b border-neutral-900/15 p-6 md:grid-cols-[160px_1fr]">
            <p className="font-mono text-xs tracking-[0.16em] text-neutral-400">
              04 · EDUCATION
            </p>
            <ul className="space-y-4">
              {education.map((item) => (
                <li key={item.school} className="text-base">
                  <p className="font-medium">{item.school}</p>
                  <p className="text-sm text-neutral-600">
                    {item.major} · {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-2 border-b border-neutral-900/15 p-6 md:grid-cols-[160px_1fr]">
            <p className="font-mono text-xs tracking-[0.16em] text-neutral-400">
              05 · HISTORY
            </p>
            <ul className="space-y-4">
              {history.map((item) => (
                <li key={item.company} className="text-base">
                  <p className="font-medium">{item.company}</p>
                  <p className="text-sm text-neutral-600">
                    {item.role} · {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-2 p-6 md:grid-cols-[160px_1fr]">
            <p className="font-mono text-xs tracking-[0.16em] text-neutral-400">
              06 · ACTIVITIES
            </p>
            <ul className="space-y-4">
              {activities.map((item) => (
                <li key={`${item.title}-${item.detail}`} className="text-base">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-neutral-600">
                    {item.period
                      ? `${item.detail} · ${item.period}`
                      : item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
