"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Megaphone, Plus, Pencil, Trash2, X } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  body: string | null;
  category: string | null;
  date: string;
  created_at: string;
  updated_at: string;
}

interface AnnouncementForm {
  title: string;
  date: string;
  category: string;
  body: string;
}

const emptyForm: AnnouncementForm = {
  title: "",
  date: "",
  category: "General",
  body: "",
};

const categories = ["News", "Event", "Schedule", "General"];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AnnouncementForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchAnnouncements = useCallback(async () => {
    const res = await fetch("/api/announcements");
    if (res.ok) {
      setAnnouncements(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  function openAdd() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function openEdit(announcement: Announcement) {
    setForm({
      title: announcement.title,
      date: announcement.date,
      category: announcement.category || "General",
      body: announcement.body || "",
    });
    setEditingId(announcement.id);
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
      date: form.date,
      category: form.category || null,
      body: form.body || null,
    };

    const url = editingId
      ? `/api/announcements/${editingId}`
      : "/api/announcements";
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
    fetchAnnouncements();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this announcement?")) return;

    const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchAnnouncements();
    }
  }

  return (
    <>
      {/* Header */}
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

      {/* Content */}
      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Add Announcement button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 bg-amber text-navy-dark font-semibold px-4 py-2.5 rounded-lg hover:bg-amber-light transition-colors text-sm"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Add Announcement
            </button>
          </div>

          {/* Form modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
              <div className="bg-white rounded-xl border border-warm-gray shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between bg-navy-dark text-white px-6 py-4 rounded-t-xl">
                  <h2 className="font-semibold text-lg">
                    {editingId ? "Edit Announcement" : "Add Announcement"}
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
                      htmlFor="date"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="body"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Body
                    </label>
                    <textarea
                      id="body"
                      rows={4}
                      value={form.body}
                      onChange={(e) =>
                        setForm({ ...form, body: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber resize-none"
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
                          : "Add Announcement"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <p className="text-center text-text-muted py-12">
              Loading announcements...
            </p>
          )}

          {/* Empty state */}
          {!loading && announcements.length === 0 && (
            <div className="text-center py-16">
              <Megaphone
                className="w-12 h-12 text-warm-gray mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-text-muted">
                No announcements yet. Add one to get started!
              </p>
            </div>
          )}

          {/* Announcement cards */}
          {!loading && announcements.length > 0 && (
            <div className="space-y-6">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-xl border border-warm-gray p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-2">
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
                    {/* Edit / Delete */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openEdit(a)}
                        className="p-1.5 text-text-muted hover:text-amber-dark transition-colors rounded-lg hover:bg-amber/10"
                        aria-label={`Edit ${a.title}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="p-1.5 text-text-muted hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                        aria-label={`Delete ${a.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mb-4">
                    {new Date(a.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  {a.body && (
                    <p className="text-text-muted leading-relaxed">{a.body}</p>
                  )}
                </div>
              ))}
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
