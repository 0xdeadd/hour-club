"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Info,
  Plus,
  Pencil,
  Trash2,
  X,
  MessageSquare,
} from "lucide-react";

interface Meeting {
  id: string;
  day_of_week: number;
  time: string;
  tags: string[];
  note: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface MeetingNotice {
  id: string;
  text: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface MeetingForm {
  day_of_week: number;
  time: string;
  tags: string;
  note: string;
  sort_order: number;
}

interface NoticeForm {
  text: string;
  sort_order: number;
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first, Sunday last

const ALL_TAGS = [
  "Open",
  "Open Discussion",
  "Step Study",
  "Big Book Study",
  "11th Step",
  "Women",
  "Young People",
];

const emptyMeetingForm: MeetingForm = {
  day_of_week: 1,
  time: "",
  tags: "",
  note: "",
  sort_order: 0,
};

const emptyNoticeForm: NoticeForm = {
  text: "",
  sort_order: 0,
};

const tagColorMap: Record<string, string> = {
  Women: "bg-pink-100 text-pink-800",
  "Young People": "bg-purple-100 text-purple-800",
  "Big Book Study": "bg-blue-100 text-blue-800",
  "Step Study": "bg-emerald-100 text-emerald-800",
  "11th Step": "bg-teal-100 text-teal-800",
};

function TagBadge({ label }: { label: string }) {
  const color = tagColorMap[label] || "bg-amber/10 text-amber-dark";
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}
    >
      {label}
    </span>
  );
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [notices, setNotices] = useState<MeetingNotice[]>([]);
  const [loading, setLoading] = useState(true);

  // Meeting form state
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [editingMeetingId, setEditingMeetingId] = useState<string | null>(null);
  const [meetingForm, setMeetingForm] = useState<MeetingForm>(emptyMeetingForm);
  const [savingMeeting, setSavingMeeting] = useState(false);
  const [meetingError, setMeetingError] = useState("");

  // Notice form state
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeForm, setNoticeForm] = useState<NoticeForm>(emptyNoticeForm);
  const [savingNotice, setSavingNotice] = useState(false);
  const [noticeError, setNoticeError] = useState("");
  const [showNoticeManager, setShowNoticeManager] = useState(false);

  const fetchData = useCallback(async () => {
    const [meetingsRes, noticesRes] = await Promise.all([
      fetch("/api/meetings"),
      fetch("/api/meeting-notices"),
    ]);
    if (meetingsRes.ok) setMeetings(await meetingsRes.json());
    if (noticesRes.ok) setNotices(await noticesRes.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Group meetings by day
  const grouped = DAY_ORDER.reduce<Record<number, Meeting[]>>((acc, day) => {
    const dayMeetings = meetings.filter((m) => m.day_of_week === day);
    if (dayMeetings.length > 0) acc[day] = dayMeetings;
    return acc;
  }, {});

  // Meeting CRUD handlers
  function openAddMeeting() {
    setMeetingForm(emptyMeetingForm);
    setEditingMeetingId(null);
    setShowMeetingForm(true);
    setMeetingError("");
  }

  function openEditMeeting(meeting: Meeting) {
    setMeetingForm({
      day_of_week: meeting.day_of_week,
      time: meeting.time,
      tags: meeting.tags.join(", "),
      note: meeting.note || "",
      sort_order: meeting.sort_order,
    });
    setEditingMeetingId(meeting.id);
    setShowMeetingForm(true);
    setMeetingError("");
  }

  function closeMeetingForm() {
    setShowMeetingForm(false);
    setEditingMeetingId(null);
    setMeetingForm(emptyMeetingForm);
    setMeetingError("");
  }

  async function handleMeetingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSavingMeeting(true);
    setMeetingError("");

    const tags = meetingForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      day_of_week: meetingForm.day_of_week,
      time: meetingForm.time,
      tags,
      note: meetingForm.note || null,
      sort_order: meetingForm.sort_order,
    };

    const url = editingMeetingId
      ? `/api/meetings/${editingMeetingId}`
      : "/api/meetings";
    const method = editingMeetingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setMeetingError(data.error || "Something went wrong");
      setSavingMeeting(false);
      return;
    }

    closeMeetingForm();
    setSavingMeeting(false);
    fetchData();
  }

  async function handleDeleteMeeting(id: string) {
    if (!confirm("Delete this meeting?")) return;
    const res = await fetch(`/api/meetings/${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  }

  // Notice CRUD handlers
  function openAddNotice() {
    setNoticeForm(emptyNoticeForm);
    setEditingNoticeId(null);
    setShowNoticeForm(true);
    setNoticeError("");
  }

  function openEditNotice(notice: MeetingNotice) {
    setNoticeForm({
      text: notice.text,
      sort_order: notice.sort_order,
    });
    setEditingNoticeId(notice.id);
    setShowNoticeForm(true);
    setNoticeError("");
  }

  function closeNoticeForm() {
    setShowNoticeForm(false);
    setEditingNoticeId(null);
    setNoticeForm(emptyNoticeForm);
    setNoticeError("");
  }

  async function handleNoticeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSavingNotice(true);
    setNoticeError("");

    const payload = {
      text: noticeForm.text,
      sort_order: noticeForm.sort_order,
    };

    const url = editingNoticeId
      ? `/api/meeting-notices/${editingNoticeId}`
      : "/api/meeting-notices";
    const method = editingNoticeId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setNoticeError(data.error || "Something went wrong");
      setSavingNotice(false);
      return;
    }

    closeNoticeForm();
    setSavingNotice(false);
    fetchData();
  }

  async function handleDeleteNotice(id: string) {
    if (!confirm("Delete this notice?")) return;
    const res = await fetch(`/api/meeting-notices/${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  }

  // Tag toggle helper for the form
  function toggleTag(tag: string) {
    const current = meetingForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const newTags = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    setMeetingForm({ ...meetingForm, tags: newTags.join(", ") });
  }

  const selectedTags = meetingForm.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

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
            Find a meeting that works for you. All meetings are held at The Hour
            Club unless otherwise noted.
          </p>
        </div>
      </section>

      {/* Additional meetings notice */}
      <section className="bg-warm-white border-b border-warm-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          {notices.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-sm">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="flex items-center gap-2 text-text-muted"
                >
                  <Info
                    className="w-4 h-4 text-navy shrink-0"
                    aria-hidden="true"
                  />
                  <span>{notice.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Action buttons */}
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={() => setShowNoticeManager(!showNoticeManager)}
              className="inline-flex items-center gap-2 border border-warm-gray text-navy-dark font-semibold px-4 py-2.5 rounded-lg hover:bg-warm-white transition-colors text-sm"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              Edit Notices
            </button>
            <button
              onClick={openAddMeeting}
              className="inline-flex items-center gap-2 bg-amber text-navy-dark font-semibold px-4 py-2.5 rounded-lg hover:bg-amber-light transition-colors text-sm"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Add Meeting
            </button>
          </div>

          {/* Notice manager */}
          {showNoticeManager && (
            <div className="mb-6 bg-white rounded-xl border border-warm-gray overflow-hidden">
              <div className="bg-navy-dark text-white px-6 py-3 flex items-center justify-between">
                <h2 className="font-semibold text-lg">Meeting Notices</h2>
                <button
                  onClick={openAddNotice}
                  className="inline-flex items-center gap-1.5 bg-amber text-navy-dark font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-light transition-colors text-xs"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  Add Notice
                </button>
              </div>
              {notices.length === 0 ? (
                <p className="px-6 py-4 text-sm text-text-muted">
                  No notices yet.
                </p>
              ) : (
                <div className="divide-y divide-warm-gray">
                  {notices.map((notice) => (
                    <div
                      key={notice.id}
                      className="px-6 py-3 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-2 text-sm text-text-muted min-w-0">
                        <Info
                          className="w-4 h-4 text-navy shrink-0"
                          aria-hidden="true"
                        />
                        <span className="truncate">{notice.text}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openEditNotice(notice)}
                          className="p-1.5 text-text-muted hover:text-amber-dark transition-colors rounded-lg hover:bg-amber/10"
                          aria-label={`Edit notice`}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteNotice(notice.id)}
                          className="p-1.5 text-text-muted hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                          aria-label={`Delete notice`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Meeting form modal */}
          {showMeetingForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
              <div className="bg-white rounded-xl border border-warm-gray shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between bg-navy-dark text-white px-6 py-4 rounded-t-xl">
                  <h2 className="font-semibold text-lg">
                    {editingMeetingId ? "Edit Meeting" : "Add Meeting"}
                  </h2>
                  <button
                    onClick={closeMeetingForm}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleMeetingSubmit} className="p-6 space-y-4">
                  {meetingError && (
                    <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
                      {meetingError}
                    </p>
                  )}
                  <div>
                    <label
                      htmlFor="day_of_week"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Day of Week *
                    </label>
                    <select
                      id="day_of_week"
                      required
                      value={meetingForm.day_of_week}
                      onChange={(e) =>
                        setMeetingForm({
                          ...meetingForm,
                          day_of_week: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    >
                      {DAY_ORDER.map((d) => (
                        <option key={d} value={d}>
                          {DAYS[d]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Time *
                    </label>
                    <input
                      id="time"
                      type="text"
                      required
                      placeholder="e.g. 8:00 AM"
                      value={meetingForm.time}
                      onChange={(e) =>
                        setMeetingForm({ ...meetingForm, time: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-dark mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ALL_TAGS.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                              isSelected
                                ? "bg-navy-dark text-white border-navy-dark"
                                : "bg-white text-navy-dark border-warm-gray hover:border-navy"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="note"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Note
                    </label>
                    <input
                      id="note"
                      type="text"
                      placeholder="e.g. Al-Anon also meets at this time"
                      value={meetingForm.note}
                      onChange={(e) =>
                        setMeetingForm({ ...meetingForm, note: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sort_order"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Sort Order
                    </label>
                    <input
                      id="sort_order"
                      type="number"
                      value={meetingForm.sort_order}
                      onChange={(e) =>
                        setMeetingForm({
                          ...meetingForm,
                          sort_order: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeMeetingForm}
                      className="px-4 py-2 text-sm font-medium text-text-muted hover:text-navy-dark transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingMeeting}
                      className="inline-flex items-center gap-2 bg-amber text-navy-dark font-semibold px-5 py-2 rounded-lg hover:bg-amber-light transition-colors text-sm disabled:opacity-50"
                    >
                      {savingMeeting
                        ? "Saving..."
                        : editingMeetingId
                          ? "Save Changes"
                          : "Add Meeting"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Notice form modal */}
          {showNoticeForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
              <div className="bg-white rounded-xl border border-warm-gray shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between bg-navy-dark text-white px-6 py-4 rounded-t-xl">
                  <h2 className="font-semibold text-lg">
                    {editingNoticeId ? "Edit Notice" : "Add Notice"}
                  </h2>
                  <button
                    onClick={closeNoticeForm}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleNoticeSubmit} className="p-6 space-y-4">
                  {noticeError && (
                    <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
                      {noticeError}
                    </p>
                  )}
                  <div>
                    <label
                      htmlFor="notice_text"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Text *
                    </label>
                    <input
                      id="notice_text"
                      type="text"
                      required
                      placeholder='e.g. NA meets daily at 12:00 PM'
                      value={noticeForm.text}
                      onChange={(e) =>
                        setNoticeForm({ ...noticeForm, text: e.target.value })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="notice_sort_order"
                      className="block text-sm font-medium text-navy-dark mb-1"
                    >
                      Sort Order
                    </label>
                    <input
                      id="notice_sort_order"
                      type="number"
                      value={noticeForm.sort_order}
                      onChange={(e) =>
                        setNoticeForm({
                          ...noticeForm,
                          sort_order: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-warm-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeNoticeForm}
                      className="px-4 py-2 text-sm font-medium text-text-muted hover:text-navy-dark transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingNotice}
                      className="inline-flex items-center gap-2 bg-amber text-navy-dark font-semibold px-5 py-2 rounded-lg hover:bg-amber-light transition-colors text-sm disabled:opacity-50"
                    >
                      {savingNotice
                        ? "Saving..."
                        : editingNoticeId
                          ? "Save Changes"
                          : "Add Notice"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <p className="text-center text-text-muted py-12">
              Loading meetings...
            </p>
          )}

          {/* Empty state */}
          {!loading && meetings.length === 0 && (
            <div className="text-center py-16">
              <CalendarDays
                className="w-12 h-12 text-warm-gray mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-text-muted">
                No meetings yet. Add one to get started!
              </p>
            </div>
          )}

          {/* Schedule by day */}
          {!loading && Object.keys(grouped).length > 0 && (
            <div className="space-y-6">
              {DAY_ORDER.filter((d) => grouped[d]).map((day) => (
                <div
                  key={day}
                  className="bg-white rounded-xl border border-warm-gray overflow-hidden"
                >
                  <div className="bg-navy-dark text-white px-6 py-3">
                    <h2 className="font-semibold text-lg">{DAYS[day]}</h2>
                  </div>
                  <div className="divide-y divide-warm-gray">
                    {grouped[day].map((meeting) => (
                      <div
                        key={meeting.id}
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
                        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                          {meeting.tags.map((tag) => (
                            <TagBadge key={tag} label={tag} />
                          ))}
                          {meeting.note && (
                            <span className="text-xs text-text-muted italic ml-1">
                              {meeting.note}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => openEditMeeting(meeting)}
                            className="p-1.5 text-text-muted hover:text-amber-dark transition-colors rounded-lg hover:bg-amber/10"
                            aria-label={`Edit meeting at ${meeting.time}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMeeting(meeting.id)}
                            className="p-1.5 text-text-muted hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                            aria-label={`Delete meeting at ${meeting.time}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legend */}
          <div className="mt-12 bg-white rounded-xl border border-warm-gray p-6">
            <h3 className="font-semibold text-navy-dark mb-3">Meeting Types</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-text-muted">
              <div>
                <strong className="text-navy-dark">Open</strong> — Anyone is
                welcome to attend, whether you have a desire to stop or are there
                to support someone.
              </div>
              <div>
                <strong className="text-navy-dark">Discussion</strong> — Members
                share their experience, strength, and hope on a topic.
              </div>
              <div>
                <strong className="text-navy-dark">Step Study</strong> — Focused
                study and discussion of the 12 Steps.
              </div>
              <div>
                <strong className="text-navy-dark">Big Book Study</strong> —
                Reading and discussion of the Big Book of Alcoholics Anonymous.
              </div>
              <div>
                <strong className="text-navy-dark">11th Step</strong> — A meeting
                focused on prayer and meditation.
              </div>
              <div>
                <strong className="text-navy-dark">Women</strong> — A meeting for
                women in recovery.
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
