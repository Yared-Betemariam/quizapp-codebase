import { getUserByEmail, getUserById } from "@/data/user";
import { defaultPlanId } from "@/data/website";
import connectDB from "@/mongoose/db";
import Users from "@/mongoose/models/questions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("email") as string;
    await connectDB();
    let user = await getUserByEmail(query);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    if (!body.email) {
      return NextResponse.json({ message: "Invalid" }, { status: 400 });
    }
    await connectDB();
    await Users.create({
      email: body.email,
      planId: defaultPlanId,
    });
    return NextResponse.json({ message: "Created" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
