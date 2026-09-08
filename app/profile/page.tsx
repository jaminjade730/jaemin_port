import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import {
  activities,
  education,
  history,
  skills,
  skillsSummary,
  toolGroups,
} from "@/data/profile";

export default function ProfilePage() {
  return (
    <div className="home-stage home-stage--board profile-page">
      <SiteNav />

      <div className="profile-page__body">
        <article className="bento-cell board-cell profile-page__photo">
          <Image
            src="/profile-avatar.png"
            alt="이재민"
            fill
            quality={95}
            className="object-cover"
            sizes="(max-width: 860px) 100vw, 32vw"
          />
        </article>

        <article className="bento-cell board-cell profile-page__intro">
          <p className="board-intro__pill">MARKETER</p>
          <h1 className="profile-page__name">이재민 · Lee Jaemin</h1>
          <dl className="profile-page__contact">
            <div>
              <dt>Birth</dt>
              <dd>2001.07.30</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href="tel:01063788360">010.6378.8360</a>
              </dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>
                <a href="mailto:jaeminmkt@gmail.com">jaeminmkt@gmail.com</a>
              </dd>
            </div>
          </dl>

          <Link href="/portfolio" className="profile-page__next">
            작업물 보기
            <span aria-hidden>→</span>
          </Link>
        </article>

        <article className="bento-cell board-cell profile-page__history">
          <p className="profile-cell__pill">HISTORY</p>
          <ul className="profile-list profile-list--history">
            {history.map((item) => (
              <li key={item.company}>
                <p className="profile-list__title">{item.company}</p>
                <p className="profile-list__meta">
                  {item.role} · {item.period}
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article className="bento-cell board-cell profile-page__education">
          <p className="profile-cell__pill">EDUCATION</p>
          <ul className="profile-list">
            {education.map((item) => (
              <li key={item.school}>
                <p className="profile-list__title">{item.school}</p>
                <p className="profile-list__meta">
                  {item.major} · {item.period}
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article className="bento-cell board-cell profile-page__activities">
          <p className="profile-cell__pill">ACTIVITIES</p>
          <ul className="profile-list">
            {activities.map((item) => (
              <li key={`${item.title}-${item.detail}`}>
                <p className="profile-list__title">{item.title}</p>
                <p className="profile-list__meta">
                  {item.period ? `${item.detail} · ${item.period}` : item.detail}
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article className="bento-cell board-cell profile-page__skills-panel">
          <p className="profile-cell__pill">SKILLS</p>
          <ul className="profile-list profile-list--skills profile-list--board profile-list--profile-skills">
            {skills.map((skill) => (
              <li key={skill.title}>
                <p className="profile-list__title">{skill.title}</p>
                <p className="profile-list__meta">{skill.body}</p>
              </li>
            ))}
          </ul>
          <p className="profile-skills-summary">{skillsSummary}</p>
        </article>

        <article className="bento-cell board-cell profile-page__tools-panel">
          <p className="profile-cell__pill">TOOLS</p>
          <ul className="profile-tool-groups profile-tool-groups--profile">
            {toolGroups.map((group) => (
              <li key={group.category} className="profile-tool-group">
                <p className="profile-tool-group__label">{group.category}</p>
                <ul className="profile-tools profile-tools--compact">
                  {group.tools.map((tool) => (
                    <li key={tool.name} className="profile-tool">
                      <img src={tool.icon} alt="" width={28} height={28} />
                      <span>{tool.name}</span>
                    </li>
                  ))}
                </ul>
                <p className="profile-tool-group__desc">{group.description}</p>
              </li>
            ))}
          </ul>
        </article>

        <p className="profile-page__rights">© 2026 ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
}
