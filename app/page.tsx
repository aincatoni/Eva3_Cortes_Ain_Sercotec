"use client";

import { useEffect, useState } from "react";

import { AboutSection } from "@/components/AboutSection";
import { ContactFooter } from "@/components/ContactFooter";
import { ContactFormSection } from "@/components/ContactFormSection";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { LocationPointsSection } from "@/components/LocationPointsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteHeader } from "@/components/SiteHeader";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import {
  type ContactFormErrors,
  type ContactFormValues,
  initialContactFormValues,
  validateContactForm,
} from "@/lib/contact-form";
import { type HomeData } from "@/sanity/lib/queries";

type HomeApiResponse = {
  source: string;
  endpoint: string;
  fetchedAt: string;
  data: HomeData;
  message?: string;
  error?: string;
};

export default function Home() {
  const [payload, setPayload] = useState<HomeApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<ContactFormValues>(
    initialContactFormValues,
  );
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});

  useEffect(() => {
    let cancelled = false;

    async function loadHome() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/home");
        const json = (await response.json()) as HomeApiResponse;

        if (!response.ok) {
          throw new Error(
            json.error || json.message || "No se pudo cargar la home.",
          );
        }

        if (!cancelled) {
          setPayload(json);
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Error desconocido",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadHome();

    return () => {
      cancelled = true;
    };
  }, []);

  const hero = payload?.data.hero;
  const siteSettings = payload?.data.siteSettings;
  const aboutSection = payload?.data.aboutSection;
  const services = payload?.data.services ?? [];
  const testimonials = payload?.data.testimonials ?? [];
  const faqs = payload?.data.faqs ?? [];
  const contactInfo = payload?.data.contactInfo;
  const locationPoints = payload?.data.locationPoints ?? [];

  function handleServiceSelect(value: string) {
    setFormMessage(null);
    setFormValues((current) => ({ ...current, service: value }));
    setFormErrors((current) => ({ ...current, service: undefined }));
    document
      .getElementById("contacto-formulario")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleFieldChange(field: keyof ContactFormValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
    setFormMessage(null);
  }

  function handleFieldBlur(field: keyof ContactFormValues) {
    const nextErrors = validateContactForm(formValues);

    setFormErrors((current) => ({
      ...current,
      [field]: nextErrors[field],
    }));
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactForm(formValues);

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      setFormMessage("Corrige los campos marcados antes de continuar.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormMessage(null);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const json = (await response.json()) as {
        message?: string;
        errors?: ContactFormErrors;
      };

      if (!response.ok) {
        if (json.errors) {
          setFormErrors(json.errors);
        }

        setFormMessage(
          json.message || "No pudimos enviar tu solicitud. Intenta nuevamente.",
        );
        return;
      }

      setFormValues(initialContactFormValues);
      setFormErrors({});
      setFormMessage(json.message || "Solicitud enviada correctamente.");
    } catch {
      setFormMessage("No pudimos enviar tu solicitud. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] text-slate-950">
      <SiteHeader hero={hero} siteSettings={siteSettings} />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        {loading ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <p className="text-lg font-medium text-slate-900">
              Cargando contenido desde el endpoint...
            </p>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-[2rem] border border-rose-300 bg-rose-50 p-8 text-rose-950">
            <h1 className="text-2xl font-semibold">
              No pudimos cargar la home
            </h1>
            <p className="mt-3 text-sm text-rose-800">{error}</p>
            <p className="mt-6 text-sm text-rose-800">
              Revisa que exista contenido publicado en Sanity y prueba el
              endpoint en
              <span className="mx-1 font-semibold">/api/home</span>.
            </p>
          </div>
        ) : null}

        {!loading && !error ? (
          <>
            {hero ? <HeroSection hero={hero} /> : null}
            {aboutSection ? <AboutSection aboutSection={aboutSection} /> : null}
            <ServicesSection services={services} onSelect={handleServiceSelect} />
            <TestimonialsSection testimonials={testimonials} />
            <FaqSection faqs={faqs} />
            <LocationPointsSection locationPoints={locationPoints} />
            <ContactFormSection
              services={services}
              formValues={formValues}
              formErrors={formErrors}
              formMessage={formMessage}
              isSubmitting={isSubmitting}
              onSubmit={handleFormSubmit}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleFieldBlur}
            />
            {contactInfo ? <ContactFooter contactInfo={contactInfo} footerNote={siteSettings?.footerNote} /> : null}
          </>
        ) : null}
      </section>
    </main>
  )
}
