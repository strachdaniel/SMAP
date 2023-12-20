import passport from "passport";
import * as jwt from "jsonwebtoken";

export const getGoogleAuthCallback = (req: any, res) => {
  const payload = {
    user_id: req.user.user_id,
    email: req.user.email,
    roles: req.user.roles,
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "12h" } // options
  );

  res.redirect(process.env.CLIENT_REDIRECT_URL + "/?token=" + token);
};

export const verifyUser = (req: any, res) => {
  res.json(req.user);
};
