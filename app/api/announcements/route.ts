import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, date, body: announcementBody, category } = body;

  if (!title || !date) {
    return NextResponse.json(
      { error: "Title and date are required" },
      { status: 400 }
    );
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("announcements")
    .insert({ title, date, body: announcementBody, category })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
