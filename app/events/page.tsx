"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Plus,
  Pencil,
  Trash2,
  X,
  Users,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  people_involved: string | null;
  created_at: string;
  updated_at: string;
}

interface EventForm {
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  people_involved: string;
}

const emptyForm: EventForm = {
  title: "",
  description: "",
  event_date: "",
  event_time: "",
  people_involved: "",
};

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function monthYear(dateStr: string) {
  const [year, month] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPast, setShowPast] = useState(false);

  const fetchEvents = useCallback(async () => {
    const res = await fetch("/api/events");
    if (res.ok) {
      setEvents(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  function openAdd() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function openEdit(event: Event) {
    setForm({
      title: event.title,
      description: event.description || "",
      event_date: event.event_date,
      event_time: event.event_time || "",
      people_involved: event.people_involved || "",
    });
    setEditingId(event.id);
    setShowForm(true);
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      description: form.description || null,
      event_date: form.event_date,
      event_time: form.event_time || null,
      people_involved: form.people_involved || null,
    };

    const url = editingId ? `/api/events/${editingId}` : "/api/events";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setSaving(false);
      return;
    }

    closeForm();
    setSaving(false);
    fetchEvents();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;

    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchEvents();
    }
  }

  const today = todayStr();
  const upcoming = events.filter((e) => e.event_date >= today);
  const past = events.filter((e) => e.event_date < today);

  // Group upcoming by month
  const grouped = upcoming.reduce<Record<string, Event[]>>((acc, event) => {
    const key = monthYear(event.event_date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  return (
    <>
      {/* Header */}
      <section className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <CalendarDays className="w-4 h-4" aria-hidden="true" />
            Special Events
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Events &amp; Schedule
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Celebrations, potlucks, group conscience meetings, and other special
            events.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Add Event button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 bg-amber text-navy-dark font-semibold px-4 py-2.5 rounded-lg hover:bg-amber-light transition-colors text-sm"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Add Event
            </button>
          </div>

          {/* Form modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
              <div className="bg-white rounded-xl border border-warm-gray shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between bg-navy-dark text-white px-6 py-4 rounded-t-xl">
                  <h2 className="font-semibold text-lg">
                    {editingId ? "Edit Event" : "Add Event"}
                  </h2>
                  <button
                    onClick={closeForm}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
                      {error}
                    </p>
                  )}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Title *
                    </label>
                    <input
                      id="title"
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="event_date"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Date *
                    </label>
                    <input
                      id="event_date"
                      type="date"
                      required
                      value={form.event_date}
                      onChange={(e) =>
                        setForm({ ...form, event_date: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="event_time"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Time
                    </label>
                    <input
                      id="event_time"
                      type="text"
                      placeholder="e.g. 5:30 PM"
                      value={form.event_time}
                      onChange={(e) =>
                        setForm({ ...form, event_time: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber resize-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="people_involved"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      People Involved
                    </label>
                    <input
                      id="people_involved"
                      type="text"
                      placeholder="e.g. Paul, Staci"
                      value={form.people_involved}
                      onChange={(e) =>
                        setForm({ ...form, people_involved: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-4 py-2 text-sm font-medium text-text-muted hover:text-navy-dark transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 bg-amber text-navy-dark font-semibold px-5 py-2 rounded-lg hover:bg-amber-light transition-colors text-sm disabled:opacity-50"
                    >
                      {saving
                        ? "Saving..."
                        : editingId
                          ? "Save Changes"
                          : "Add Event"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <p className="text-center text-text-muted py-12">
              Loading events...
            </p>
          )}

          {/* Empty state */}
          {!loading && events.length === 0 && (
            <div className="text-center py-16">
              <CalendarDays
                className="w-12 h-12 text-warm-gray mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-text-muted">
                No events yet. Add one to get started!
              </p>
            </div>
          )}

          {/* Upcoming events grouped by month */}
          {!loading && Object.keys(grouped).length > 0 && (
            <div className="space-y-6">
              {Object.entries(grouped).map(([month, monthEvents]) => (
                <div
                  key={month}
                  className="bg-white rounded-xl border border-warm-gray overflow-hidden"
                >
                  <div className="bg-navy-dark text-white px-6 py-3">
                    <h2 className="font-semibold text-lg">{month}</h2>
                  </div>
                  <div className="divide-y divide-warm-gray">
                    {monthEvents.map((event) => (
                      <div key={event.id} className="px-6 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                          {/* Date & time */}
                          <div className="flex items-center gap-2 sm:w-36 shrink-0">
                            <CalendarDays
                              className="w-4 h-4 text-amber-dark shrink-0"
                              aria-hidden="true"
                            />
                            <span className="font-medium text-navy-dark whitespace-nowrap text-sm">
                              {formatDate(event.event_date)}
                            </span>
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-navy-dark">
                                  {event.title}
                                </h3>
                                {event.event_time && (
                                  <p className="text-sm text-text-muted flex items-center gap-1 mt-0.5">
                                    <Clock
                                      className="w-3.5 h-3.5"
                                      aria-hidden="true"
                                    />
                                    {event.event_time}
                                  </p>
                                )}
                              </div>
                              {/* Edit / Delete */}
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={() => openEdit(event)}
                                  className="p-1.5 text-text-muted hover:text-amber-dark transition-colors rounded-lg hover:bg-amber/10"
                                  aria-label={`Edit ${event.title}`}
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(event.id)}
                                  className="p-1.5 text-text-muted hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                                  aria-label={`Delete ${event.title}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            {event.description && (
                              <p className="text-sm text-text-muted mt-1">
                                {event.description}
                              </p>
                            )}
                            {event.people_involved && (
                              <p className="text-xs text-text-muted mt-1.5 flex items-center gap-1">
                                <Users
                                  className="w-3.5 h-3.5"
                                  aria-hidden="true"
                                />
                                {event.people_involved}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past events (collapsed) */}
          {!loading && past.length > 0 && (
            <div className="mt-8">
              <button
                onClick={() => setShowPast(!showPast)}
                className="text-sm text-text-muted hover:text-navy-dark transition-colors font-medium"
              >
                {showPast
                  ? "Hide past events"
                  : `Show ${past.length} past event${past.length === 1 ? "" : "s"}`}
              </button>
              {showPast && (
                <div className="mt-4 bg-white rounded-xl border border-warm-gray overflow-hidden opacity-70">
                  <div className="bg-navy-dark/70 text-white px-6 py-3">
                    <h2 className="font-semibold text-lg">Past Events</h2>
                  </div>
                  <div className="divide-y divide-warm-gray">
                    {past.map((event) => (
                      <div key={event.id} className="px-6 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                          <div className="flex items-center gap-2 sm:w-36 shrink-0">
                            <CalendarDays
                              className="w-4 h-4 text-text-muted shrink-0"
                              aria-hidden="true"
                            />
                            <span className="font-medium text-text-muted whitespace-nowrap text-sm">
                              {formatDate(event.event_date)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-navy-dark/70">
                                  {event.title}
                                </h3>
                                {event.event_time && (
                                  <p className="text-sm text-text-muted flex items-center gap-1 mt-0.5">
                                    <Clock
                                      className="w-3.5 h-3.5"
                                      aria-hidden="true"
                                    />
                                    {event.event_time}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={() => openEdit(event)}
                                  className="p-1.5 text-text-muted hover:text-amber-dark transition-colors rounded-lg hover:bg-amber/10"
                                  aria-label={`Edit ${event.title}`}
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(event.id)}
                                  className="p-1.5 text-text-muted hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                                  aria-label={`Delete ${event.title}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            {event.description && (
                              <p className="text-sm text-text-muted mt-1">
                                {event.description}
                              </p>
                            )}
                            {event.people_involved && (
                              <p className="text-xs text-text-muted mt-1.5 flex items-center gap-1">
                                <Users
                                  className="w-3.5 h-3.5"
                                  aria-hidden="true"
                                />
                                {event.people_involved}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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
