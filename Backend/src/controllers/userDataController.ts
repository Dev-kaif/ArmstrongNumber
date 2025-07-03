import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// gloabal route to fetch all user and thier data
export const getAllUserData = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // prisma will skip that many
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        armstrongs: {
          select: {
            id: true,
            number: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const totalUsers = await prisma.user.count();

    res.status(200).json({
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
    return;
  }
};
