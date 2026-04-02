import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Schedule — The Hour Club",
  description:
    "Special events, celebrations, potlucks, group conscience meetings, and more at The Hour Club.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
