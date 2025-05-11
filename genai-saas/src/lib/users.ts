import { NextResponse } from "next/server";
import { prisma } from "./prisma";

export async function createUser(clerkId: string, email: string) {
  try {
    const user = await prisma.user.create({
      data: {
        clerkId: clerkId,
        email: email,
        credits: 5,
        subscriptionStatus: "FREE",
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Failed to create User:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
