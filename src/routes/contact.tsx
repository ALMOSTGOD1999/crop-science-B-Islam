import { createFileRoute } from "@tanstack/react-router";
import { Check, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageIntro, SectionLabel, SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Baharul Islam" },
      {
        name: "description",
        content:
          "Request a product recommendation or field program from the Baharul Islam agri team.",
      },
      { property: "og:title", content: "Contact | Baharul Islam" },
      {
        property: "og:description",
        content: "Send a crop and region — our agri team will help shape your next step.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <SiteShell>
      <div className="site-container inner-page">
        <PageIntro
          eyebrow="04 — Enquiry desk"
          title="Talk to our agri team."
          description="Send a crop and region — we’ll reply with a recommended product and rate. For urgent field situations, include the growth stage and what you are seeing."
        />
        <div className="contact-layout reveal-up reveal-delay-1">
          <div className="contact-details">
            <div className="contact-prompt">
              <SectionLabel>Start with the crop</SectionLabel>
              <p className="font-display">
                The more field context you share, the more precise our first response can be.
              </p>
            </div>
            <div className="contact-detail-list">
              <div>
                <Mail size={17} />
                <span>
                  <small>Email</small>rrupaenterprise@gmail. com
                </span>
              </div>
              <div>
                <Phone size={17} />
                <span>
                  <small>Phone</small>+91 9932460909
                </span>
              </div>
              <div>
                <MapPin size={17} />
                <span>
                  <small>Field desk</small>Ranitala,Bhagwangola-II,Lalbag,Murshidabad,West Bengal
                </span>
              </div>
            </div>
          </div>
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Name
                <input required name="name" placeholder="Your name" />
              </label>
              <label>
                Phone / email
                <input required name="contact" placeholder="How to reach you" />
              </label>
              <label>
                Crop
                <input required name="crop" placeholder="e.g. Paddy" />
              </label>
              <label>
                Region
                <input required name="region" placeholder="e.g. Chattogram" />
              </label>
            </div>
            <label>
              Issue or field note
              <textarea
                required
                name="issue"
                rows={5}
                placeholder="Rice stem borer appearing at tillering stage…"
              />
            </label>
            <button type="submit" className="button button-primary button-submit">
              {sent ? (
                <>
                  <Check size={16} /> Enquiry received
                </>
              ) : (
                <>
                  <Send size={16} /> Send enquiry
                </>
              )}
            </button>
            {sent ? (
              <p className="success-message" role="status">
                <Check size={15} /> Thanks — our agri team will reply within one working day.
              </p>
            ) : (
              <p className="form-note">We use your details only to respond to this enquiry.</p>
            )}
          </form>
        </div>
      </div>
    </SiteShell>
  );
}
