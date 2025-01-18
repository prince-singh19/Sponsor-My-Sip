import { connectDB } from "@/lib/database";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query || query.trim() === "") {
    return NextResponse.json({ profiles: [] }, { status: 200 });
  }

  try {
    await connectDB(); 
    const profiles = await ProfileInfoModel.find({
      username: { $regex: query, $options: "i" },
    });

    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching profiles." },
      { status: 500 }
    );
  }
}
