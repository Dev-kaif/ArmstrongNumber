import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import verifyRoutes from "./routes/verificationRoutes";
import allUserDataRoutes from "./routes/userDataRoutes";

const app = express();

app.use(express.json());
app.use(cors({origin:"*"}));

app.use("/api/auth", authRoutes);
app.use("/api/armStrong", verifyRoutes);
app.use("/api/global", allUserDataRoutes);

app.listen(3000);
