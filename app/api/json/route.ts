import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  const jsoncheck = z.object({});

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      {
        error: "You are not authorized to access this route.",
      },
      {
        status: 401,
      },
    );
  }

  const data = await request.json();

  const name = data.name;
  const content = data.content;

  try {
    const mycontent = JSON.parse(content);

    const jsonTypeCheck = jsoncheck.parse(mycontent);

    if (jsonTypeCheck) {
      const json = await prisma.jsonData.create({
        data: {
          name,
          content,
          userId,
        },
      });
      return NextResponse.json(json);
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Only JSON Data is allowed",
      },
      {
        status: 422,
      },
    );
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      {
        error: "You are not authorized to access this route.",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const json = await prisma.jsonData.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        content: true,
      },
    });
    return NextResponse.json(json);
  } catch (error) {
    console.error("Error fetching JSON", error);
    return NextResponse.json(
      {
        error: "Error fetching JSON",
      },
      {
        status: 500,
      },
    );
  }
}
