import { createFileRoute } from "@tanstack/react-router";
import { Filter, Leaf, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { ProductCard, products } from "@/components/product-visual";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Products | Baharul Islam" }, { name: "description", content: "Explore Baharul Islam insecticide, herbicide, fungicide and crop-support product families." }, { property: "og:title", content: "Products | Baharul Islam" }, { property: "og:description", content: "Crop-protection products made for practical field programs." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => products.filter((product) => (category === "All" || product.category === category) && `${product.name} ${product.crops}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const categories = ["All", "Insecticide", "Herbicide", "Fungicide"];
  return <SiteShell><div className="site-container inner-page"><PageIntro eyebrow="01 — Product range" title="Chemistry that works with the crop." description="Browse our focused range of field-ready formulations. Product selection and application should always follow local label directions and agronomic guidance." /><div className="catalog-toolbar reveal-up reveal-delay-1"><div className="filter-row"><Filter size={15} aria-hidden="true" />{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={category === item ? "filter-active" : ""}>{item}</button>)}</div><label className="search-field"><Search size={15} aria-hidden="true" /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by product or crop" /></label></div><div className="product-grid product-grid-page">{filtered.map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}</div>{filtered.length === 0 ? <div className="empty-state"><Leaf size={22} /><p>No product matches that search.</p></div> : null}</div></SiteShell>;
}
