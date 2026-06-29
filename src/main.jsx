import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const site = {
  brandName: "Graymans Media",
  domain: "graymansmedia.com",
};

function useThemeMode() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("site-theme") || "light";
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("site-theme", theme);
  }, [theme]);

  return [theme, () => setTheme((value) => (value === "dark" ? "light" : "dark"))];
}

const services = [
  {
    id: "01",
    title: "Brand Systems",
    text: "Positioning, visual identity, landing pages, and conversion copy that make your company easy to remember.",
    metric: "3.4x recall lift",
  },
  {
    id: "02",
    title: "Search Growth",
    text: "Technical SEO, content clusters, local discovery, and analytics dashboards built around buyer intent.",
    metric: "62% more organic leads",
  },
  {
    id: "03",
    title: "Paid Acquisition",
    text: "Google, Meta, and retargeting campaigns with tight creative testing and weekly optimization loops.",
    metric: "28% lower CPA",
  },
  {
    id: "04",
    title: "Automation Ops",
    text: "CRM pipelines, WhatsApp flows, lead scoring, and lifecycle journeys that keep sales teams moving.",
    metric: "41% faster follow-up",
  },
];

const cases = [
  {
    label: "D2C Skincare",
    challenge: "High ad spend but inconsistent repeat purchase behavior.",
    actions: ["Offer ladder rebuilt", "Meta creative sprint", "Email and WhatsApp win-back", "Weekly cohort dashboard"],
    results: ["2.7x ROAS", "34% repeat revenue"],
  },
  {
    label: "B2B SaaS",
    challenge: "Strong product, weak inbound demand and confusing landing pages.",
    actions: ["SEO topic map", "Demo page redesign", "LinkedIn retargeting", "CRM lead scoring"],
    results: ["51% more demos", "19% shorter sales cycle"],
  },
  {
    label: "Local Services",
    challenge: "Leads were coming from referrals, but search visibility was almost invisible.",
    actions: ["Local SEO cleanup", "Review engine", "Service-area pages", "Call tracking setup"],
    results: ["4.2x calls", "Top 3 map ranking"],
  },
];

const faqs = [
  {
    q: "Website banne ke baad Hostinger pe deploy ho jayegi?",
    a: "Haan. React build ka static output dist folder me aayega, jise Hostinger hPanel File Manager ya FTP se public_html me upload kiya ja sakta hai.",
  },
  {
    q: "Kya content editable rahega?",
    a: "Abhi content React data arrays me clean tarike se rakha hai. Aap services, case studies, FAQs, phone/email, aur company name easily update kar sakte hain.",
  },
  {
    q: "Kya ye SEO friendly hai?",
    a: "Page title, meta description, semantic sections, readable content, and fast static build included hai. Hosting ke baad sitemap and Google Search Console add karna best next step hoga.",
  },
  {
    q: "Motion mobile pe heavy to nahi hoga?",
    a: "Animations CSS based hain, lightweight hain, aur reduced-motion preference respect karte hain.",
  },
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Header({ brandName, theme, onThemeToggle }) {
  const [open, setOpen] = useState(false);
  const links = ["Services", "Proof", "Process", "FAQ"];

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={`${brandName} home`}>
        <span className="brand-mark">{brandName.charAt(0)}</span>
        <span>{brandName}</span>
      </a>
      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={onThemeToggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          <span className="theme-icon" aria-hidden="true"></span>
        </button>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={open ? "nav is-open" : "nav"}>
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
            Start Growth
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ brandName, domain }) {
  const stats = [
    ["90-day", "growth sprints"],
    ["24/7", "lead tracking"],
    ["360", "brand systems"],
  ];

  return (
    <section className="hero" id="top">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">{domain} / websites, ads and automation</p>
        <h1>Modern growth systems for brands that want a sharper digital presence.</h1>
        <p className="hero-text">
          {brandName} brings your website, campaigns, SEO, CRM, and analytics into one polished customer journey,
          so visitors understand you faster and enquiries become easier to track.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#contact">Book a Strategy Call</a>
          <a className="button secondary" href="#services">Explore Services</a>
        </div>
      </div>
      <div className="hero-visual" aria-label="Animated digital growth dashboard" data-reveal>
        <div className="visual-grid" aria-hidden="true"></div>
        <div className="orbit orbit-one"></div>
        <div className="orbit orbit-two"></div>
        <div className="dashboard-card main-card">
          <span className="card-kicker">{brandName} Pulse</span>
          <strong>+148%</strong>
          <small>qualified pipeline in 12 weeks</small>
          <div className="sparkline" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div className="dashboard-card mini-card top">
          <span>SEO</span>
          <strong>82</strong>
        </div>
        <div className="dashboard-card mini-card bottom">
          <span>CPA</span>
          <strong>-28%</strong>
        </div>
      </div>
      <div className="stat-strip" data-reveal>
        {stats.map(([number, label]) => (
          <div key={label}>
            <strong>{number}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">What we deliver</p>
        <h2>Digital services built for attention, trust, and measurable revenue.</h2>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id} data-reveal>
            <span className="service-id">{service.id}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <strong>{service.metric}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  const [active, setActive] = useState(0);
  const current = useMemo(() => cases[active], [active]);

  return (
    <section className="section proof" id="proof">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Recent initiatives</p>
        <h2>Realistic growth playbooks, not vague marketing promises.</h2>
      </div>
      <div className="case-shell" data-reveal>
        <div className="case-tabs" role="tablist" aria-label="Case studies">
          {cases.map((item, index) => (
            <button
              key={item.label}
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
              type="button"
              role="tab"
              aria-selected={active === index}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="case-content">
          <p className="case-label">{current.label}</p>
          <h3>{current.challenge}</h3>
          <ul>
            {current.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
          <div className="result-row">
            {current.results.map((result) => (
              <strong key={result}>{result}</strong>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["01", "Audit the leaks", "We map traffic, offer, funnel, and follow-up so effort stops leaking between teams."],
    ["02", "Build the engine", "Website, campaign, content, and automation assets are shipped in focused weekly releases."],
    ["03", "Optimize weekly", "Every sprint ends with plain-English reporting and decisions for the next highest-return move."],
  ];

  return (
    <section className="section process" id="process">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Framework delivery</p>
        <h2>A compact operating system for modern digital growth.</h2>
      </div>
      <div className="timeline">
        {steps.map(([number, title, text]) => (
          <div className="timeline-item" key={number} data-reveal>
            <span>{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Partners({ brandName }) {
  return (
    <section className="partners" data-reveal>
      <p className="eyebrow">Trusted operating partner</p>
      <h2>{brandName} is designed for founders, sales teams, and marketing teams who want clarity.</h2>
      <div className="partner-metrics">
        <div><strong>38+</strong><span>launches shipped</span></div>
        <div><strong>12</strong><span>industries served</span></div>
        <div><strong>8.6cr</strong><span>tracked revenue influenced</span></div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">FAQ</p>
        <h2>Straight answers before we start.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <article className={open === index ? "faq-item is-open" : "faq-item"} key={item.q} data-reveal>
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{item.q}</span>
              <b>{open === index ? "-" : "+"}</b>
            </button>
            <p>{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact({ brandName }) {
  return (
    <section className="contact" id="contact" data-reveal>
      <div>
        <p className="eyebrow">Ready when you are</p>
        <h2>Let us turn {brandName} into a growth system.</h2>
        <p>
          Share your business goal, current website, and target market. We will suggest the highest-impact next sprint.
        </p>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Name
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Phone or Email
          <input type="text" placeholder="+91 98765 43210" />
        </label>
        <label>
          What do you need?
          <textarea placeholder="Website, SEO, ads, automation..." rows="4"></textarea>
        </label>
        <button className="button primary" type="submit">Send Enquiry</button>
      </form>
    </section>
  );
}

function App() {
  useReveal();
  const [theme, toggleTheme] = useThemeMode();

  useEffect(() => {
    document.title = `${site.brandName} | Growth, Web & Automation Studio`;
    const description = `${site.brandName} builds growth-ready websites, paid campaigns, SEO engines, and automation systems.`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, []);

  return (
    <>
      <Header brandName={site.brandName} theme={theme} onThemeToggle={toggleTheme} />
      <main>
        <Hero brandName={site.brandName} domain={site.domain} />
        <Services />
        <Proof />
        <Process />
        <Partners brandName={site.brandName} />
        <Faq />
        <Contact brandName={site.brandName} />
      </main>
      <footer>
        <span>{site.brandName}</span>
        <span>{site.domain}</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
