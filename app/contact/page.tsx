"use client";

import { useState } from "react";
import { MapPin, Car, DoorOpen, Send } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Frontend-only for now — no backend wired up
    setSubmitted(true);
  }

  return (
    <>
      <section className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Get In Touch
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Contact
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Find us, reach us, or drop us a message.
          </p>
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Location Info */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border border-warm-gray">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                    <MapPin
                      className="w-5 h-5 text-navy"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-dark mb-1">
                      Address
                    </h3>
                    <address className="not-italic text-text-muted text-sm leading-relaxed">
                      218 Mandeville Ave
                      <br />
                      Carrollton, GA 30117
                    </address>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-warm-gray">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                    <DoorOpen
                      className="w-5 h-5 text-navy"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-dark mb-1">
                      Entrance
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      The entrance is located at the{" "}
                      <strong>back of the building</strong>. Come around to the
                      rear and you&apos;ll find us.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-warm-gray">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                    <Car
                      className="w-5 h-5 text-navy"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-dark mb-1">
                      Parking
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Parking is available at the{" "}
                      <strong>rear of the building</strong>. Overflow parking is
                      available in the lot next door.
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-warm-gray shadow-sm">
                <iframe
                  title="The Hour Club location on Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.5!2d-85.0767!3d33.5804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x888a3d5e9f02e28d%3A0x6e5c6e4e5e5e5e5e!2s218%20Mandeville%20Ave%2C%20Carrollton%2C%20GA%2030117!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-warm-gray p-6 sm:p-8 h-fit">
              <h2 className="text-lg font-semibold text-navy-dark mb-6">
                Send a Message
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-navy-dark mb-1">
                    Message received!
                  </p>
                  <p className="text-sm text-text-muted">
                    Thanks for reaching out. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 border border-warm-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 border border-warm-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 border border-warm-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber text-navy-dark font-semibold py-3 rounded-lg hover:bg-amber-light transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
