import type { Metadata } from "next";
import { Megaphone } from "lucide-react";
import announcements from "@/data/announcements.json";

export const metadata: Metadata = {
  title: "Announcements — The Hour Club",
  description: "Club announcements, events, and schedule changes.",
};

export default function AnnouncementsPage() {
  const sorted = announcements.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <section className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Megaphone className="w-4 h-4" aria-hidden="true" />
            Club News
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Announcements
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Stay up to date with events, schedule changes, and club news.
          </p>
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="space-y-6">
            {sorted.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-xl border border-warm-gray p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-navy-dark">
                    {a.title}
                  </h2>
                  {a.category && (
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber/10 text-amber-dark">
                      {a.category}
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-muted mb-4">
                  {new Date(a.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-text-muted leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
