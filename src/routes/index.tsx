import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import cropRows from "@/assets/crop-rows.jpg";
import { ArrowLink, SectionLabel, SiteShell } from "@/components/site-shell";
import { fungicideProduct, herbicideProduct, insecticideProduct, ProductCard, ProductImage, products, WelcomeReveal } from "@/components/product-visual";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Baharul Islam | Precision Crop Protection" },
      { name: "description", content: "Field-tested insecticides, herbicides and fungicides from Baharul Islam crop science." },
      { property: "og:title", content: "Baharul Islam | Precision Crop Protection" },
      { property: "og:description", content: "Field-tested crop protection for every growing season." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <SiteShell>
      {showWelcome ? <WelcomeReveal onComplete={() => setShowWelcome(false)} /> : null}
      <div className="site-noise" aria-hidden="true" />
      <section className="hero-section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <SectionLabel><span className="status-dot" /> Crop protection — field-tested</SectionLabel>
            <h1 className="hero-title font-display reveal-assemble">BAHARUL<br />ISLAM</h1>
            <p className="hero-lede reveal-up reveal-delay-2">Targeted insecticides, herbicides and fungicides engineered to keep your crop moving from vulnerable seedling to protected, thriving harvest.</p>
            <div className="hero-actions reveal-up reveal-delay-3">
              <Link to="/products" className="button button-primary">Browse products <ArrowUpRight size={16} aria-hidden="true" /></Link>
              <Link to="/solutions" className="button button-ghost">Crop solutions</Link>
            </div>
            <div className="hero-stats reveal-up reveal-delay-4">
              <div><strong className="font-display">120+</strong><span>Formulations</span></div>
              <div><strong className="font-display">28</strong><span>Crops covered</span></div>
              <div><strong className="font-display accent-text">ISO</strong><span>Quality system</span></div>
            </div>
          </div>
          <div className="hero-products" aria-label="Our product categories">
            <div className="hero-product hero-product-left reveal-from-left reveal-delay-1"><ProductImage product={insecticideProduct} priority /><span>Insecticide</span></div>
            <div className="hero-product hero-product-center reveal-up reveal-delay-2"><ProductImage product={fungicideProduct} priority /><span className="accent-text">Fungicide</span></div>
            <div className="hero-product hero-product-right reveal-from-right reveal-delay-1"><ProductImage product={herbicideProduct} priority /><span>Herbicide</span></div>
            <div className="growth-meter" aria-hidden="true"><span /><span /><span /><span /><b /></div>
          </div>
        </div>
        <a href="#catalog" className="scroll-cue"><ArrowDown size={15} /> Scroll to explore</a>
      </section>

      <section id="catalog" className="site-container content-section">
        <div className="section-heading-row reveal-up">
          <div><SectionLabel>02 — Catalog</SectionLabel><h2 className="font-display section-title">Product families</h2></div>
          <Link to="/products" className="text-link">View all products <ArrowUpRight size={15} /></Link>
        </div>
        <div className="filter-row reveal-up reveal-delay-1"><span className="filter-active">All</span><span>Insecticides</span><span>Herbicides</span><span>Fungicides</span><span>Adjuvants</span></div>
        <div className="product-grid">{products.map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}</div>
      </section>

      <section className="site-container protection-section">
        <div className="protection-visual reveal-from-left"><img src={cropRows} alt="Aerial view of healthy crop rows" loading="lazy" width={1280} height={800} /><span className="image-corner-label">FIELD PROGRAM / 01</span></div>
        <div className="protection-copy reveal-up"><SectionLabel>03 — Protection curve</SectionLabel><h2 className="font-display section-title">From seedling to harvest</h2><p>One program across the season. We match chemistry to growth stage so protection scales with the crop — not against it.</p><div className="stage-list"><div><b>01</b><span><strong>Seedling → soft tissue</strong><small>Foliar fungicides for early blight and damping-off pressure.</small></span></div><div><b>02</b><span><strong>Vegetative → flowering</strong><small>Systemic insecticides plus selective herbicide for clean stands.</small></span></div><div><b className="accent-text">03</b><span><strong>Grain fill → harvest</strong><small>Pre-harvest protection that holds quality and reduces loss.</small></span></div></div><ArrowLink to="/solutions">Explore crop solutions</ArrowLink></div>
      </section>

      <section className="company-band">
        <div className="site-container company-band-inner reveal-up"><div><SectionLabel>04 — Company</SectionLabel><h2 className="font-display section-title">Built in the field, not the boardroom</h2></div><p>We develop, test and supply crop-protection chemistry with agri-team support on the ground, so every recommendation is matched to your soil, region and season.</p><Link to="/about" className="button button-outline">About Baharul Islam <ArrowUpRight size={16} /></Link></div>
      </section>

      <section className="site-container home-contact reveal-up"><div><SectionLabel>05 — Enquiry</SectionLabel><h2 className="font-display section-title">Talk to our agri team</h2><p>Send a crop and region — we’ll reply with a recommended product and rate.</p></div><Link to="/contact" className="button button-primary">Send an enquiry <ArrowUpRight size={16} /></Link></section>
    </SiteShell>
  );
}
