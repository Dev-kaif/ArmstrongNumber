import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

function isArmstrong(num: number): boolean {
  const digits = num.toString().split("");
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(Number(digit), power),
    0
  );
  return sum === num;
}

// Check if its armstrong number or not
export const isItArmstrong = async (req: Request, res: Response) => {
  try {
    const { number } = req.body;
    const userId = req.user?.id as string;

    if (
      number === undefined ||
      typeof number !== "number" ||
      !Number.isInteger(number) ||
      number <= 0
    ) {
      res
        .status(400)
        .json({ error: "A positive integer 'number' is required." });
      return;
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    // Armstrong check
    const result = isArmstrong(number);

    if (result) {
      // Checks if user already has that number to reduce duplications
      const existing = await prisma.armstrongNumber.findUnique({
        where: {
          number_userId: {
            number,
            userId,
          },
        },
      });

      if (!existing) {
        await prisma.armstrongNumber.create({
          data: {
            number,
            userId,
          },
        });
      }
    }

    res.status(200).json({
      isArmstrong: result,
      message: result
        ? "The number is an Armstrong number and has been saved."
        : "The number is not an Armstrong number.",
    });
    return;
  } catch (error:any) {
    console.error(" error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
    return;
  }
};

// GET users all numbers
export const getUserArmstrongNumbers = async (req: Request, res: Response) => {
  try {
    const id  = req.user?.id

    const armstrongNumbers = await prisma.armstrongNumber.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(armstrongNumbers);
    return;
  } catch (error:any) {
    console.error("getUserArmstrongNumbers error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
    return;
  }
};
