"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUpRight,
  Award,
  BarChart3,
  Boxes,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Container,
  Cpu,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Github,
  Globe2,
  HeartPulse,
  Layers3,
  Linkedin,
  LockKeyhole,
  Menu,
  Network,
  Radar,
  Server,
  ShieldCheck,
  Terminal,
  Timer,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import type { LucideIcon } from "lucide-react";

const navItems = [
  ["Home", "home"],
  ["Projects", "projects"],
  ["Architecture", "architecture"],
  ["SRE", "sre"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Contact", "contact"],
];

const technologies = [
  ["Linux", Terminal], ["Git", GitBranch], ["GitHub Actions", Activity], ["Docker", Container],
  ["Kubernetes", Boxes], ["Terraform", Layers3], ["AWS", Cloud], ["Azure", Globe2],
  ["Ansible", Zap], ["Prometheus", Radar], ["Grafana", BarChart3], ["Bash", Code2],
] as const;

const pipeline = [
  ["Developer", Code2, "commit"], ["Git", GitBranch, "version"], ["CI/CD", Activity, "automate"],
  ["Docker", Container, "package"], ["Cloud", Cloud, "provision"], ["Kubernetes", Boxes, "orchestrate"],
  ["Monitoring", Radar, "observe"],
] as const;

const projects = [
  {
    number: "01",
    title: "Production Cloud Deployment",
    type: "DELIVERY PIPELINE",
    description: "A repeatable path from GitHub commit to a monitored application environment, with infrastructure expressed as code.",
    tech: ["AWS", "Linux", "Docker", "GitHub Actions", "Terraform", "Nginx"],
    icon: Cloud,
    accent: "cyan",
    nodes: ["GitHub", "Actions", "Docker", "AWS", "App", "Monitor"],
  },
  {
    number: "02",
    title: "Kubernetes Production Platform",
    type: "CONTAINER ORCHESTRATION",
    description: "A platform blueprint for running frontend and backend workloads with ingress, health checks, secrets, and autoscaling.",
    tech: ["Docker", "Kubernetes", "Helm", "AWS EKS"],
    icon: Boxes,
    accent: "lime",
    nodes: ["Ingress", "Frontend", "Backend", "Services", "Autoscale"],
  },
  {
    number: "03",
    title: "Infrastructure as Code",
    type: "CLOUD PROVISIONING",
    description: "Modular Terraform provisioning for a secure AWS network, compute layer, data layer, and tightly scoped access.",
    tech: ["Terraform", "AWS"],
    icon: Layers3,
    accent: "amber",
    nodes: ["VPC", "Subnets", "SGs", "EC2", "ALB", "RDS", "IAM"],
  },
  {
    number: "04",
    title: "SRE Monitoring & Incident Response",
    type: "RELIABILITY SYSTEM",
    description: "A signal-driven observability loop that turns application telemetry into useful alerts and documented recovery work.",
    tech: ["Prometheus", "Grafana", "Docker", "Linux"],
    icon: HeartPulse,
    accent: "rose",
    nodes: ["App", "Prometheus", "Grafana", "Alert", "Resolve"],
  },
] as const;

const skillGroups: { title: string; icon: LucideIcon; items: string[] }[] = [
  { title: "Operating Systems", icon: Server, items: ["Linux", "Bash", "SSH", "systemd", "Linux networking"] },
  { title: "Version Control", icon: GitBranch, items: ["Git", "GitHub"] },
  { title: "Containers", icon: Container, items: ["Docker", "Docker Compose"] },
  { title: "Orchestration", icon: Boxes, items: ["Kubernetes", "Helm"] },
  { title: "CI/CD", icon: Activity, items: ["GitHub Actions"] },
  { title: "Infrastructure", icon: Layers3, items: ["Terraform", "Ansible"] },
  { title: "Cloud", icon: Cloud, items: ["AWS", "Azure"] },
  { title: "Monitoring", icon: Radar, items: ["Prometheus", "Grafana", "CloudWatch"] },
  { title: "Networking", icon: Network, items: ["TCP/IP", "DNS", "HTTP/HTTPS", "Ports", "Load balancing"] },
];

const reliabilityPractices = [
  ["Incident Management", "Create calm, traceable response loops from detection to recovery.", AlertTriangle],
  ["Root Cause Analysis", "Separate symptoms from contributing factors and durable corrective work.", SearchIcon],
  ["Monitoring", "Instrument the signals that explain customer experience and system health.", Radar],
  ["Alerting", "Prefer actionable alerts with ownership, context, and clear thresholds.", BellIcon],
  ["Troubleshooting", "Use logs, metrics, traces, and container state to narrow the search space.", Terminal],
  ["Reliability Engineering", "Turn repeated operational lessons into resilient defaults and automation.", ShieldCheck],
] as const;

function SearchIcon({ size = 18 }: { size?: number }) { return <Activity size={size} />; }
function BellIcon({ size = 18 }: { size?: number }) { return <Zap size={size} />; }

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.75, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      <p>{copy}</p>
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const reduceMotion = useReducedMotion();

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const endpoint = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT;

    if (!endpoint) {
      setFormStatus("error");
      return;
    }

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      building: String(formData.get("building") || formData.get("subject") || ""),
      details: String(formData.get("details") || formData.get("message") || ""),
      website: String(formData.get("website") || ""),
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });
      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <main>
      <header className="nav-shell">
        <a href="#home" className="brand" aria-label="Abdul Rahman Qureshi home">
          <span className="brand-mark">ARQ</span>
          <span className="brand-copy"><strong>abdul.rahman</strong><small>cloud / deployment</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="#contact">Let&apos;s connect <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="hero section-pad" id="home">
        <div className="hero-grid" />
        <div className="hero-content">
          <Reveal>
            <div className="status-pill"><span className="status-dot" />Available for cloud &amp; DevOps opportunities <span className="status-slash">/</span> 2026</div>
            <h1>Abdul Rahman<br /><span>Qureshi</span></h1>
            <div className="hero-role"><span />Cloud &amp; Deployment Engineer</div>
            <p className="hero-description">I build, automate, deploy and monitor reliable cloud infrastructure and production applications.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View projects <ArrowUpRight size={16} /></a>
              <a className="button button-ghost" href="https://github.com" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
              <a className="button button-ghost" href="/abdul-cloud-website/abdul-rahman-qureshi-resume.pdf" download><Download size={16} /> Resume</a>
            </div>
            <div className="hero-meta"><span><span className="meta-dot" /> Linux-first</span><span><span className="meta-dot" /> Infrastructure as code</span><span><span className="meta-dot" /> Observable by default</span></div>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="hero-visual-wrap">
          <div className="hero-visual">
            <div className="visual-header"><span><span className="traffic red" /><span className="traffic yellow" /><span className="traffic green" /></span><span className="visual-label">deployment_pipeline.sh</span><span className="visual-live"><span />LIVE SIMULATION</span></div>
            <div className="pipeline">
              {pipeline.map(([label, Icon, sub], index) => (
                <div className="pipeline-step" key={label}>
                  <motion.div className={`pipeline-node node-${index}`} animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 rgba(91, 224, 255, 0)", "0 0 24px rgba(91, 224, 255, .22)", "0 0 0 rgba(91, 224, 255, 0)"] }} transition={{ duration: 2.8, repeat: Infinity, delay: index * .28 }}>
                    <Icon size={20} strokeWidth={1.7} /><span>{label}</span><small>{sub}</small>
                  </motion.div>
                  {index < pipeline.length - 1 && <div className="pipeline-connector"><span /><ArrowDown size={14} /></div>}
                </div>
              ))}
            </div>
            <div className="terminal-output"><span className="terminal-prompt">$</span> ./ship-to-production <span className="terminal-success">--verified</span><br /><span className="terminal-muted">&nbsp;&nbsp;pipeline completed in 03m 42s</span></div>
          </div>
        </Reveal>
        <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><div /></div>
      </section>

      <section className="tech-strip section-pad" aria-label="Technologies">
        <div className="strip-label">TOOLS I WORK WITH <span /></div>
        <div className="tech-grid">{technologies.map(([label, Icon]) => <div className="tech-item" key={label}><Icon size={16} /><span>{label}</span></div>)}</div>
      </section>

      <section className="section-pad content-section" id="projects">
        <SectionHeading eyebrow="Selected systems" title="Built to ship. Designed to stay up." copy="Portfolio projects modeled after the workflows that turn application code into dependable services. Each system is a focused technical exercise, clearly labeled as such." />
        <div className="projects-grid">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return <Reveal key={project.title} delay={index * .07} className="project-card-wrap"><article className={`project-card accent-${project.accent}`}>
              <div className="project-top"><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span><Icon size={22} /></div>
              <h3>{project.title}</h3><p>{project.description}</p>
              <div className="project-diagram">{project.nodes.map((node, nodeIndex) => <span className="diagram-node" key={node}><i>{String(nodeIndex + 1).padStart(2, "0")}</i>{node}{nodeIndex < project.nodes.length - 1 && <ChevronRight size={13} />}</span>)}</div>
              <div className="tag-list">{project.tech.map(item => <span key={item}>{item}</span>)}</div>
              <a className="project-link" href="#architecture">View system architecture <ArrowUpRight size={15} /></a>
            </article></Reveal>;
          })}
        </div>
      </section>

      <section className="section-pad architecture-section" id="architecture">
        <SectionHeading eyebrow="System design" title="Architecture, made legible." copy="A visual map of the path from source control to observable workload. Every layer has a job, an owner, and a signal." />
        <Reveal className="architecture-panel">
          <div className="architecture-toolbar"><div><span className="toolbar-dot" /> reference-architecture / v1.4</div><span className="toolbar-right"><LockKeyhole size={13} /> least privilege <span className="toolbar-sep">|</span> <Activity size={13} /> health checks enabled</span></div>
          <div className="arch-flow">
            {[['01', 'GitHub', GitBranch], ['02', 'GitHub Actions', Activity], ['03', 'Build + Test', Check], ['04', 'Docker', Container], ['05', 'Container Registry', Database], ['06', 'AWS', Cloud], ['07', 'Kubernetes', Boxes], ['08', 'Application', Server], ['09', 'Prometheus', Radar], ['10', 'Grafana', BarChart3]].map(([num, name, Icon], index) => <div className="arch-node-wrap" key={name as string}><div className={`arch-node ${index === 7 ? "active" : ""}`}><span>{num as string}</span><Icon size={19} /><strong>{name as string}</strong>{index === 7 && <em>serving traffic</em>}</div>{index < 9 && <div className="arch-line"><span /></div>}</div>)}
          </div>
          <div className="architecture-footer"><span><span className="legend-dot cyan" /> build &amp; delivery</span><span><span className="legend-dot lime" /> runtime</span><span><span className="legend-dot amber" /> observability</span><code>request_id: arq-7d2e9f</code></div>
        </Reveal>
      </section>

      <section className="section-pad sre-section" id="sre">
        <SectionHeading eyebrow="Reliability practice" title="Operate with signals, not guesses." copy="A small reliability dashboard that keeps service health visible, measurable, and connected to the work that improves it." />
        <div className="sre-layout">
          <Reveal className="reliability-dashboard"><div className="dashboard-head"><div><span className="live-indicator"><span /> LIVE</span><h3>Service health</h3></div><span className="updated">updated 12s ago</span></div><div className="metric-grid"><Metric label="Availability" value="99.97%" delta="+0.04%" icon={HeartPulse} /><Metric label="API latency" value="182ms" delta="−24ms" icon={Timer} /><Metric label="Error rate" value="0.18%" delta="−0.07%" icon={AlertTriangle} /><Metric label="Throughput" value="2.4k" delta="+12.8%" icon={TrendingUp} /></div><div className="chart-area"><div className="chart-labels"><span>REQUEST LATENCY / 24H</span><span>P95 <b>182ms</b></span></div><div className="fake-chart"><svg viewBox="0 0 800 160" preserveAspectRatio="none" aria-label="Latency trend"><path d="M0 117 C25 110 42 119 62 98 S92 109 115 88 S148 95 166 69 S190 89 210 82 S243 108 263 78 S299 74 320 90 S355 82 378 58 S405 76 425 68 S460 85 484 54 S512 71 535 47 S563 63 584 55 S614 78 636 42 S667 62 693 49 S727 69 752 37 S780 47 800 27" fill="none" stroke="currentColor" strokeWidth="3" /><path d="M0 160 L0 117 C25 110 42 119 62 98 S92 109 115 88 S148 95 166 69 S190 89 210 82 S243 108 263 78 S299 74 320 90 S355 82 378 58 S405 76 425 68 S460 85 484 54 S512 71 535 47 S563 63 584 55 S614 78 636 42 S667 62 693 49 S727 69 752 37 S780 47 800 27 L800 160Z" fill="currentColor" opacity=".08" /></svg></div><div className="chart-axis"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>NOW</span></div></div></Reveal>
          <div className="slo-column"><Reveal className="slo-card"><div className="card-kicker">SERVICE LEVEL OBJECTIVES</div><h3>Targets worth protecting.</h3><div className="slo-row"><span>Availability</span><strong>99.9%</strong><div className="slo-bar"><i style={{ width: "97%" }} /></div><small>99.97%</small></div><div className="slo-row"><span>API latency</span><strong>&lt; 300ms</strong><div className="slo-bar"><i style={{ width: "83%" }} /></div><small>182ms</small></div><div className="slo-row"><span>Error rate</span><strong>&lt; 1%</strong><div className="slo-bar"><i style={{ width: "91%" }} /></div><small>0.18%</small></div></Reveal><Reveal delay={.1} className="incident-card"><div className="incident-head"><span className="incident-icon"><AlertTriangle size={16} /></span><span>SIMULATED INCIDENT REPORT</span><span className="severity">SEV-2</span></div><h3>API service unavailable</h3><div className="incident-steps"><IncidentStep label="Detection" value="Prometheus alert" /><IncidentStep label="Investigation" value="Application logs + container status" /><IncidentStep label="Root cause" value="Configuration failure" /><IncidentStep label="Resolution" value="Correct configuration and redeployment" /><IncidentStep label="Prevention" value="Health checks + configuration validation" /></div></Reveal></div>
        </div>
        <div className="practice-grid">{reliabilityPractices.map(([title, copy, Icon], index) => <Reveal key={title} delay={index * .04}><div className="practice-item"><Icon size={18} /><div><h3>{title}</h3><p>{copy}</p></div></div></Reveal>)}</div>
      </section>

      <section className="section-pad skills-section" id="skills">
        <SectionHeading eyebrow="Technical toolkit" title="Depth across the delivery chain." copy="The practical tools and concepts I use to make systems easier to ship, operate, and recover." />
        <div className="skills-grid">{skillGroups.map(({ title, icon: Icon, items }, index) => <Reveal key={title} delay={index * .03}><div className="skill-group"><div className="skill-title"><Icon size={17} /><h3>{title}</h3></div><div className="skill-items">{items.map(item => <span key={item}>{item}</span>)}</div></div></Reveal>)}</div>
      </section>

      <section className="section-pad experience-section" id="experience"><div className="experience-inner"><Reveal><div className="eyebrow"><span className="eyebrow-dot" />Experience</div><h2>Learning the craft<br /><span>in the real world.</span></h2></Reveal><Reveal delay={.1} className="experience-card"><div className="experience-line"><span className="experience-dot" /></div><div className="experience-content"><span className="experience-date">JULY 2026 — PRESENT</span><h3>DevOps Intern <span>—</span> J-Spider</h3><p>A focused start in the discipline of delivery engineering: learning how automation, cloud infrastructure, and operational thinking combine to support reliable software.</p><div className="experience-tags"><span>DevOps</span><span>Cloud fundamentals</span><span>Automation</span></div></div><Award size={23} /></Reveal></div></section>

      <section className="section-pad resume-section" id="resume"><Reveal className="resume-banner"><div><div className="eyebrow"><span className="eyebrow-dot" />The short version</div><h2>Let&apos;s build systems<br />people can rely on.</h2><p>Download a concise resume, or start a conversation about cloud, delivery, and reliability work.</p></div><a className="button button-primary" href="/abdul-cloud-website/abdul-rahman-qureshi-resume.pdf" download><Download size={16} /> Download resume</a></Reveal></section>

      <section className="section-pad contact-section" id="contact"><div className="contact-grid"><Reveal><div className="contact-kicker">HAVE A SYSTEM TO SHIP?</div><h2>Let&apos;s talk<br /><span>infrastructure.</span></h2><p>Open to conversations about DevOps, cloud deployment, SRE practice, and early-career opportunities where careful engineering matters.</p><div className="contact-links"><a href="mailto:abdulrahman.qureshi@example.com"><span className="contact-icon">@</span> Email <ArrowUpRight size={15} /></a><a href="https://github.com" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={15} /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} /></a></div></Reveal><Reveal delay={.1} className="contact-form-wrap"><div className="contact-form-heading"><span className="card-kicker">SEND A MESSAGE</span><h3>Start a conversation.</h3><p>Share a little about what you&apos;re building. Your message will be saved to a private Google Sheet.</p></div><form className="contact-form" onSubmit={handleContactSubmit}><input className="contact-input" name="name" type="text" placeholder="Your name" aria-label="Your name" required /><input className="contact-input" name="email" type="email" placeholder="Email address" aria-label="Email address" required /><input className="contact-input" name="subject" type="text" placeholder="What are you building?" aria-label="What are you building?" required /><textarea className="contact-input contact-message" name="message" placeholder="Tell me a little about it..." aria-label="Message" rows={6} required /><input className="contact-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><button className="button button-primary contact-submit" type="submit" disabled={formStatus === "sending"}>{formStatus === "sending" ? "Sending..." : "Send message"} <ArrowUpRight size={16} /></button>{formStatus === "success" && <p className="form-feedback form-success" role="status">Message sent. I&apos;ll be in touch soon.</p>}{formStatus === "error" && <p className="form-feedback form-error" role="alert">The form is not connected yet. Add the Google Sheets endpoint in <code>.env.local</code>.</p>}</form></Reveal></div></section>

      <footer className="footer"><span>© 2026 Abdul Rahman Qureshi</span><span className="footer-center">Built with Next.js <i>•</i> TypeScript <i>•</i> Tailwind CSS</span><span className="footer-status"><span /> systems nominal</span></footer>
    </main>
  );
}

function Metric({ label, value, delta, icon: Icon }: { label: string; value: string; delta: string; icon: LucideIcon }) {
  return <div className="metric"><div className="metric-icon"><Icon size={16} /></div><span>{label}</span><strong>{value}</strong><small>{delta}</small></div>;
}

function IncidentStep({ label, value }: { label: string; value: string }) {
  return <div className="incident-step"><span>{label}</span><strong>{value}</strong></div>;
}
