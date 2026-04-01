import type { Metadata } from "next";
import { Clock, CalendarDays, Info } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meeting Schedule — The Hour Club",
  description:
    "Full weekly meeting schedule for The Hour Club in Carrollton, GA. AA, NA, Al-Anon, and CMA meetings throughout the week.",
};

interface Meeting {
  time: string;
  tags: string[];
  note?: string;
}

interface DaySchedule {
  day: string;
  meetings: Meeting[];
}

const schedule: DaySchedule[] = [
  {
    day: "Monday",
    meetings: [
      { time: "8:00 AM", tags: ["Open", "Step Study"] },
      { time: "12:00 PM", tags: ["Open"] },
      { time: "5:30 PM", tags: ["Open"] },
    ],
  },
  {
    day: "Tuesday",
    meetings: [
      { time: "8:00 AM", tags: ["Open Discussion"] },
      { time: "12:00 PM", tags: ["Open Discussion"] },
      { time: "5:30 PM", tags: ["Open Discussion"] },
      { time: "8:00 PM", tags: ["Open"] },
    ],
  },
  {
    day: "Wednesday",
    meetings: [
      { time: "8:00 AM", tags: ["Open"] },
      { time: "10:30 AM", tags: ["Open", "Step Study", "Women"] },
      { time: "12:00 PM", tags: ["Open Discussion"] },
      { time: "5:30 PM", tags: ["Open Discussion"] },
      { time: "8:00 PM", tags: ["Open"] },
    ],
  },
  {
    day: "Thursday",
    meetings: [
      { time: "8:00 AM", tags: ["Open"] },
      { time: "12:00 PM", tags: ["Open Discussion"] },
      { time: "5:30 PM", tags: ["Open"] },
      { time: "8:00 PM", tags: ["Open", "Big Book Study"] },
    ],
  },
  {
    day: "Friday",
    meetings: [
      { time: "8:00 AM", tags: ["Open", "Big Book Study"] },
      { time: "12:00 PM", tags: ["Open"] },
      {
        time: "5:30 PM",
        tags: ["Open Discussion"],
        note: "Al-Anon also meets at this time",
      },
    ],
  },
  {
    day: "Saturday",
    meetings: [
      { time: "8:00 AM", tags: ["Open Discussion"] },
      { time: "12:00 PM", tags: ["Open Discussion"] },
      { time: "3:00 PM", tags: ["Open"] },
      { time: "5:30 PM", tags: ["Open Discussion"] },
      { time: "8:00 PM", tags: ["Open Discussion"] },
    ],
  },
  {
    day: "Sunday",
    meetings: [
      { time: "9:30 AM", tags: ["11th Step", "Open Discussion"] },
      { time: "1:00 PM", tags: ["Open Discussion"] },
      { time: "5:00 PM", tags: ["Open Discussion"] },
      { time: "8:00 PM", tags: ["Open Discussion", "Young People"] },
    ],
  },
];

function TagBadge({ label }: { label: string }) {
  const colorMap: Record<string, string> = {
    Women: "bg-pink-100 text-pink-800",
    "Young People": "bg-purple-100 text-purple-800",
    "Big Book Study": "bg-blue-100 text-blue-800",
    "Step Study": "bg-emerald-100 text-emerald-800",
    "11th Step": "bg-teal-100 text-teal-800",
  };

  const color = colorMap[label] || "bg-amber/10 text-amber-dark";

  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}>
      {label}
    </span>
  );
}

export default function MeetingsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <CalendarDays className="w-4 h-4" aria-hidden="true" />
            Weekly Schedule
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Meeting Schedule
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Find a meeting that works for you. All meetings are held at The Hour Club
            unless otherwise noted.
          </p>
        </div>
      </section>

      {/* Additional meetings notice */}
      <section className="bg-warm-white border-b border-warm-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <Info className="w-4 h-4 text-navy shrink-0" aria-hidden="true" />
              <span>
                <strong className="text-navy-dark">NA</strong> meets daily at 12:00 PM
              </span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Info className="w-4 h-4 text-navy shrink-0" aria-hidden="true" />
              <span>
                <strong className="text-navy-dark">CMA</strong> meets Thursday at 8:00 AM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="space-y-6">
            {schedule.map(({ day, meetings }) => (
              <div
                key={day}
                className="bg-white rounded-xl border border-warm-gray overflow-hidden"
              >
                <div className="bg-navy-dark text-white px-6 py-3">
                  <h2 className="font-semibold text-lg">{day}</h2>
                </div>
                <div className="divide-y divide-warm-gray">
                  {meetings.map((meeting, idx) => (
                    <div
                      key={idx}
                      className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                    >
                      <div className="flex items-center gap-2 sm:w-28 shrink-0">
                        <Clock
                          className="w-4 h-4 text-amber-dark shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-medium text-navy-dark whitespace-nowrap">
                          {meeting.time}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {meeting.tags.map((tag) => (
                          <TagBadge key={tag} label={tag} />
                        ))}
                        {meeting.note && (
                          <span className="text-xs text-text-muted italic ml-1">
                            {meeting.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-12 bg-white rounded-xl border border-warm-gray p-6">
            <h3 className="font-semibold text-navy-dark mb-3">Meeting Types</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-text-muted">
              <div>
                <strong className="text-navy-dark">Open</strong> — Anyone is welcome to
                attend, whether you have a desire to stop or are there to support someone.
              </div>
              <div>
                <strong className="text-navy-dark">Discussion</strong> — Members share
                their experience, strength, and hope on a topic.
              </div>
              <div>
                <strong className="text-navy-dark">Step Study</strong> — Focused study and
                discussion of the 12 Steps.
              </div>
              <div>
                <strong className="text-navy-dark">Big Book Study</strong> — Reading and
                discussion of the Big Book of Alcoholics Anonymous.
              </div>
              <div>
                <strong className="text-navy-dark">11th Step</strong> — A meeting focused
                on prayer and meditation.
              </div>
              <div>
                <strong className="text-navy-dark">Women</strong> — A meeting for women
                in recovery.
              </div>
            </div>
          </div>

          {/* Back to home */}
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="text-navy hover:text-amber transition-colors font-medium text-sm"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
