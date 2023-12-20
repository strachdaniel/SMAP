import express from "express";
import passport from "passport";
import {
  getGoogleAuthCallback,
  verifyUser,
} from "../controllers/authController";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  getGoogleAuthCallback
);
router.get(
  "/protected",
  passport.authenticate("jwt", {
    session: false,
    failiureMessage: "You are not logged in",
  }),
  (req: any, res) => {
    res.send(`Welcome, ${req.user.firstName} ${req.user.lastName}!`);
  }
);

router.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  verifyUser
);

export default router;
