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

    const armstrongNumbers = await prisma.armstrongNumber.findMany({
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalArmstrongNumbers = await prisma.armstrongNumber.count();

    res.status(200).json({
      page,
      limit,
      totalArmstrongNumbers,
      totalPages: Math.ceil(totalArmstrongNumbers / limit),
      armstrongNumbers,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
    return;
  }
};
