import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import verifyRoutes from "./routes/verificationRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/armStrong", verifyRoutes);

app.listen(3000);
