import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/Config";

const prisma = new PrismaClient();

// User Signup
export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ message: "Email is already registered." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name
      },
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET);

    res.status(201).json({
      message:
        "User registered successfully. You are now logged in. (No email verification in this basic example)",
      user: { id: newUser.id },
      token: token,
    });
    return;
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal server error during signup.",
      error: error.message,
    });
    return;
  }
};

// User Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id },
      token: token,
    });
    return;
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error during login.",
      error: error.message,
    });
    return;
  }
};
