import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .order("day_of_week", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { day_of_week, time, tags, note, sort_order } = body;

  if (day_of_week == null || !time) {
    return NextResponse.json(
      { error: "Day of week and time are required" },
      { status: 400 }
    );
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("meetings")
    .insert({ day_of_week, time, tags: tags || [], note: note || null, sort_order: sort_order ?? 0 })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
