import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, MapPin, ShieldCheck } from "lucide-react";
import { ArrowLink, PageIntro, SectionLabel, SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About | Baharul Islam" }, { name: "description", content: "Meet Baharul Islam, a field-first crop-protection company built around formulation, guidance and supply." }, { property: "og:title", content: "About | Baharul Islam" }, { property: "og:description", content: "A field-first approach to responsible crop protection." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <div className="site-container inner-page">
        <PageIntro eyebrow="03 — Baharul Islam" title="Built in the field, not the boardroom." description="We help growers and agri-partners make precise crop-protection decisions with reliable formulations, clear application guidance and responsive local support." />

        <section className="about-story reveal-up reveal-delay-1">
          <div className="about-statement">
            <SectionLabel>Our point of view</SectionLabel>
            <p className="font-display">"Protection should be precise enough to respect the crop, and practical enough to work in the field."</p>
          </div>
          <div className="about-copy">
            <p>Every season begins with a different pressure: a new pest window, a wet spell, a late sowing or a tighter harvest plan. Baharul Islam brings a focused portfolio and a field-first mindset to those decisions.</p>
            <p>Our work connects formulation knowledge with the people who apply it. That means less guesswork, clearer programs and support that stays close to the crop.</p>
            <ArrowLink to="/contact">Speak with the agri team</ArrowLink>
          </div>
        </section>

        <section className="about-leader reveal-up">
          <SectionLabel>Leadership</SectionLabel>
          <div className="leader-card">
            <img src="/baharulislam.jpeg" alt="Baharul Islam — Managing Director" className="leader-photo" width={320} height={320} loading="lazy" />
            <div className="leader-info">
              <h2 className="font-display leader-name">Baharul Islam</h2>
              <p className="leader-title">Managing Director</p>
              <p className="leader-bio">Driving Baharul Islam's mission to deliver field-ready crop protection and practical agronomy support across Bangladesh.</p>
            </div>
          </div>
        </section>

        <section className="principles-section">
          <SectionLabel>What guides us</SectionLabel>
          <div className="principles-grid">
            <article className="principle-card reveal-up">
              <FlaskConical size={21} />
              <h2 className="font-display">Formulated with intent</h2>
              <p>Focused product families, clear use cases and consistent quality for the programs they serve.</p>
            </article>
            <article className="principle-card reveal-up reveal-delay-1">
              <ShieldCheck size={21} />
              <h2 className="font-display">Safety in the process</h2>
              <p>Responsible recommendations start with label awareness, correct timing and careful application.</p>
            </article>
            <article className="principle-card reveal-up reveal-delay-2">
              <MapPin size={21} />
              <h2 className="font-display">Close to the field</h2>
              <p>Regional context matters. We listen to the crop, the weather and the grower before advising.</p>
            </article>
          </div>
        </section>

        <section className="about-metrics reveal-up">
          <div><strong className="font-display">14</strong><span>Years in crop science</span></div>
          <div><strong className="font-display">6</strong><span>Field research stations</span></div>
          <div><strong className="font-display accent-text">98%</strong><span>On-time supply target</span></div>
          <div><strong className="font-display">28</strong><span>Crop categories covered</span></div>
        </section>
      </div>
    </SiteShell>
  );
}
