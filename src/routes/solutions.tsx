import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Bug, Droplets, Flower2, Wheat } from "lucide-react";
import cropRows from "@/assets/crop-rows.jpg";
import { ArrowLink, PageIntro, SectionLabel, SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/solutions")({
  head: () => ({ meta: [{ title: "Crop Solutions | Baharul Islam" }, { name: "description", content: "Crop-stage protection programs for paddy, vegetables, fruit, orchard, cereals and pulses." }, { property: "og:title", content: "Crop Solutions | Baharul Islam" }, { property: "og:description", content: "Practical crop protection programs matched to crop stage and field pressure." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: SolutionsPage,
});

const solutionItems = [
  [Wheat, "Paddy & cereals", "Stem borer, blast and rust programs", "Protect tillering, leaf development and grain fill with a planned sequence."],
  [Flower2, "Vegetables", "Leaf roller, aphid and mildew defence", "Keep intensive market-garden cycles moving with well-timed protection."],
  [Bug, "Fruit & orchard", "Scale, thrips and powdery mildew", "Systemic and contact options sequenced across the season to protect fruit set."],
  [Droplets, "Pulses & oilseeds", "Clean stands, stronger finish", "Targeted support for early weed pressure and late-season disease windows."],
] as const;

function SolutionsPage() {
  return <SiteShell><div className="site-container inner-page"><PageIntro eyebrow="02 — Crop programs" title="Protection that follows the growth curve." description="A good crop program is more than a product list. We pair product families with timing, pressure and field context for practical decisions." /><div className="solutions-feature reveal-up reveal-delay-1"><img src={cropRows} alt="Aligned green crop rows viewed from above" loading="lazy" width={1280} height={800} /><div className="solutions-feature-copy"><SectionLabel>Protection curve / 01</SectionLabel><h2 className="font-display">One season. Three decisive windows.</h2><p>Start early, protect the canopy and hold the finish. Ask our team for a program shaped around your crop and region.</p><ArrowLink to="/contact">Build a field program</ArrowLink></div></div><div className="solution-grid">{solutionItems.map(([Icon, crop, title, body], index) => <article key={crop} className={`solution-card reveal-up reveal-delay-${Math.min(index + 1, 4)}`}><div className="solution-icon"><Icon size={20} /></div><span className="solution-number">0{index + 1}</span><small>{crop}</small><h2 className="font-display">{title}</h2><p>{body}</p><ArrowUpRight className="solution-arrow" size={17} /></article>)}</div></div></SiteShell>;
}
