import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import passport from "./services/passport";
import expresSession from "express-session";
import cors from "cors";
import authRouter from "./routes/authRouter";

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(cors("*"));
app.use(express.json());
app.use(
  expresSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  console.log(users);

  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("DATABASE_URL: ", process.env.DATABASE_URL);
});
