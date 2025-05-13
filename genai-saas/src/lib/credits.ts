import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getUserCredits() {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        credits: true,
      }
    });

    return dbUser?.credits ?? 0;
  } catch (error) {
    console.log("Error fetching user credits:", error);
    return 0;
  }
}
