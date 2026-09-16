"use server";

import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@/lib/generated/prisma/enums";
import { unstable_rethrow } from "next/navigation";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const { id, firstName, lastName, imageUrl, emailAddresses } = user;

    await prisma.user.upsert({
      // upsert here because we want to create a new user if they don't exist, or update the existing user if they do
      where: {
        clerkId: id,
      },
      update: {
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: emailAddresses[0].emailAddress || "",
      },
      create: {
        clerkId: id,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: emailAddresses[0].emailAddress || "",
      },
    });
  } catch (error) {
    unstable_rethrow(error);
    console.log("Error onboarding user:", error);
  }
};

export const currentUserRole = async (): Promise<UserRole | null> => {
  try {
    const user = await currentUser();
    if (!user) {
      return null;
    }

    const userRole = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: { role: true },
    });

    return userRole?.role ?? null;
  } catch (error) {
    unstable_rethrow(error);
    console.log("Error getting current user role:", error);
    return null;
  }
};

export const getCurrentUserData = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: "No authenticated user found" };
    }
    const data = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        submissions: true,
        solvedProblems: true,
        playlists: {
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    unstable_rethrow(error);
    console.log("Error fetching current user data:", error);
  }
};
