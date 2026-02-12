"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/constants/services";

const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Let's discuss",
] as const;

export function ContactSection() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: connect to backend API
    setIsSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-linear-to-b from-muted/20 to-background px-4 py-16 sm:px-6 sm:py-24 lg:py-28"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-chart-1 opacity-20 blur-[100px] animate-[blob-float_15s_ease-in-out_infinite]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-2/3 h-96 w-96 rounded-full bg-chart-3 opacity-15 blur-[120px] animate-[blob-float_18s_ease-in-out_infinite_reverse]"
        aria-hidden
      />
      {/* Green blur behind form */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/25 blur-[100px] lg:left-1/3"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 max-w-xl sm:mb-12"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-500 sm:text-sm">
            Get in touch
          </p>
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-4xl lg:text-5xl">
            Let&apos;s work together.
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Have an idea, a project, or a problem? Tell me what you need and
            I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="group relative lg:col-span-2"
          >
            {/* Green glow on hover */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              style={{
                boxShadow: "0 0 80px 50px rgba(20, 184, 166, 0.18)",
              }}
              aria-hidden
            />
            {isSubmitted ? (
              <Card className="relative border-teal-500/20 bg-card/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <CheckCircle2 className="mb-4 h-12 w-12 text-teal-500" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    Message sent!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you within 24
                    hours.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="relative border-border/60 bg-card/80 backdrop-blur-sm transition-shadow duration-300 group-hover:border-teal-500/30 group-hover:shadow-[0_0_40px_20px_rgba(20,184,166,0.08)]">
                <CardContent className="p-4 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Name <span className="text-teal-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-teal-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Service selection */}
                    <div className="space-y-2">
                      <Label>
                        What do you need?{" "}
                        <span className="text-teal-500">*</span>
                      </Label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {SERVICES.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setSelectedService(service.id)}
                            className={cn(
                              "min-h-[44px] rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all duration-200",
                              selectedService === service.id
                                ? "border-teal-500 bg-teal-500/10 text-teal-500"
                                : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                            )}
                          >
                            <span className="block font-semibold">
                              {service.title}
                            </span>
                            <span className="block text-xs opacity-70">
                              {service.tagline}
                            </span>
                          </button>
                        ))}
                      </div>
                      <input
                        type="hidden"
                        name="service"
                        value={selectedService}
                        required
                      />
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <Label>Budget range</Label>
                      <div className="flex flex-wrap gap-2">
                        {BUDGET_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedBudget(option)}
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                              selectedBudget === option
                                ? "border-teal-500 bg-teal-500/10 text-teal-500"
                                : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                            )}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <input
                        type="hidden"
                        name="budget"
                        value={selectedBudget}
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Project details{" "}
                        <span className="text-teal-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project, timeline, and goals..."
                        rows={5}
                        required
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full shadow-lg shadow-primary/20 sm:w-auto"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Sidebar info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-500">
                  Contact info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0 text-teal-500" />
                    <span>yoqubjonovjahongir10@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0 text-teal-500" />
                    <span>Seoul, South Korea</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-500">
                  Socials
                </h3>
                <div className="flex flex-col gap-2">
                  <Link
                    href="https://github.com/jakhon37"
                    target="_blank"
                    className="text-sm text-muted-foreground transition-colors hover:text-teal-500"
                  >
                    GitHub →
                  </Link>
                  <Link
                    href="https://linkedin.com/in/jakhon-yokubov"
                    target="_blank"
                    className="text-sm text-muted-foreground transition-colors hover:text-teal-500"
                  >
                    LinkedIn →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-500">
                  Response time
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  I typically respond within 24 hours. For urgent requests,
                  mention it in the message and I&apos;ll prioritize.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
