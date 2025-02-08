import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  const { id } = params;

  try {
    const json = await prisma.jsonData.findUnique({
      where: { id },

      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
      },
    });
    return NextResponse.json(json);
  } catch (error) {
    console.error("Error fetching JSON data", error);
    return NextResponse.json(
      {
        error: "Error fetching JSON data",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  const { id } = params;

  try {
    await prisma.jsonData.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting JSON data", error);
    return NextResponse.json(
      {
        error: "Error deleting JSON data",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, content } = await request.json();
  const id = params.id;

  try {
    const json = await prisma.jsonData.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        name,
        content,
      },
    });
    return NextResponse.json(json);
  } catch (error) {
    console.error("Error updating JSON", error);
    return NextResponse.json({ error: "Error updating JSON" }, { status: 500 });
  }
}
