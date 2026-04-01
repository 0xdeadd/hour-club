import {
  MapPin,
  Clock,
  CalendarDays,
  Heart,
  Users,
  Car,
  DoorOpen,
  HandHeart,
  Coffee,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-dark text-white">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-navy-light rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-light text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <Clock className="w-4 h-4" aria-hidden="true" />
            Open 24 Hours
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
            A Place of Recovery,{" "}
            <span className="text-amber-light">24 Hours a Day</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            The Hour Club is a welcoming recovery clubhouse in Carrollton, Georgia
            — hosting AA, NA, Al-Anon, and CMA meetings every day.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/meetings"
              className="inline-flex items-center gap-2 bg-amber text-navy-dark font-semibold px-6 py-3 rounded-lg hover:bg-amber-light transition-colors text-base"
            >
              <CalendarDays className="w-5 h-5" aria-hidden="true" />
              Find a Meeting
            </Link>
            <Link
              href="#getting-here"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-base"
            >
              <MapPin className="w-5 h-5" aria-hidden="true" />
              Get Directions
            </Link>
          </div>

          <address className="mt-10 not-italic text-white/50 text-sm">
            218 Mandeville Ave, Carrollton, GA 30117
          </address>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark">
              Everyone Is Welcome Here
            </h2>
            <p className="mt-4 text-text-muted text-lg leading-relaxed">
              Also known as the Consolidated Group, The Hour Club has been a cornerstone
              of recovery in Carrollton. Our doors are open around the clock, providing
              a safe and supportive space for anyone seeking help.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: "Open 24 Hours",
                description:
                  "Recovery doesn't keep office hours. Neither do we. Our clubhouse is open day and night.",
              },
              {
                icon: Users,
                title: "Multiple Fellowships",
                description:
                  "We host AA, NA, Al-Anon, and CMA meetings throughout the week to serve our community.",
              },
              {
                icon: Coffee,
                title: "Welcoming Space",
                description:
                  "A comfortable place to connect with others, share a cup of coffee, and find support.",
              },
              {
                icon: Heart,
                title: "All Are Welcome",
                description:
                  "No matter where you are in your journey, there is a seat for you here.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 border border-warm-gray hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-amber-dark" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-navy-dark mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Here */}
      <section id="getting-here" className="scroll-mt-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark">
              Getting Here
            </h2>
            <p className="mt-4 text-text-muted text-lg">
              We&apos;re located in the heart of Carrollton, Georgia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-warm-white rounded-xl p-6 border border-warm-gray">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-navy" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-dark mb-1">Address</h3>
                    <address className="not-italic text-text-muted text-sm leading-relaxed">
                      218 Mandeville Ave<br />
                      Carrollton, GA 30117
                    </address>
                  </div>
                </div>
              </div>

              <div className="bg-warm-white rounded-xl p-6 border border-warm-gray">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                    <DoorOpen className="w-5 h-5 text-navy" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-dark mb-1">Entrance</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      The entrance is located at the <strong>back of the building</strong>.
                      Come around to the rear and you&apos;ll find us.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-warm-white rounded-xl p-6 border border-warm-gray">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 text-navy" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-dark mb-1">Parking</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Parking is available at the <strong>rear of the building</strong>.
                      Overflow parking is available in the lot next door.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-warm-gray shadow-sm">
              <iframe
                title="The Hour Club location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.5!2d-85.0767!3d33.5804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x888a3d5e9f02e28d%3A0x6e5c6e4e5e5e5e5e!2s218%20Mandeville%20Ave%2C%20Carrollton%2C%20GA%2030117!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section id="get-involved" className="scroll-mt-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="relative overflow-hidden bg-navy-dark text-white rounded-2xl p-8 sm:p-12 lg:p-16">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber/10 rounded-full blur-[80px]" />

            <div className="relative max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold">Get Involved</h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                The Hour Club is self-supporting through the voluntary contributions of
                its members. There are many ways to help keep our doors open.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: HandHeart,
                    title: "Volunteer",
                    description:
                      "Help keep the clubhouse running by volunteering your time — from making coffee to setting up meetings.",
                  },
                  {
                    icon: Heart,
                    title: "Contribute",
                    description:
                      "Voluntary contributions help cover rent, utilities, coffee, and supplies to keep the doors open 24/7.",
                  },
                  {
                    icon: Users,
                    title: "Spread the Word",
                    description:
                      "Let others know about The Hour Club. Sometimes knowing there's a meeting nearby is all someone needs.",
                  },
                ].map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-amber-light" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/meetings"
                  className="inline-flex items-center gap-2 bg-amber text-navy-dark font-semibold px-6 py-3 rounded-lg hover:bg-amber-light transition-colors"
                >
                  <CalendarDays className="w-5 h-5" aria-hidden="true" />
                  View Meeting Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
