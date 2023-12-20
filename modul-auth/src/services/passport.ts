import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Set up JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async (payload: any, done) => {
    try {

      const user = await prisma.user.findUnique({
        where: { user_id: payload.user_id },
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Set up Google OAuth2 strategy
const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

passport.use(
  "google",
  new GoogleStrategy(
    googleOptions,
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);

      prisma.user
        .upsert({
          where: { googleId: profile.id },
          update: {
            email: profile.emails[0].value,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            picture: profile.photos[0].value,
          },
          create: {
            googleId: profile.id,
            email: profile.emails[0].value,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            picture: profile.photos[0].value,
          },
        })
        .then((user) => {
          
          // Call the `cb` function with the authenticated user
          return cb(null, user);
        })
        .catch((error) => {
          console.log(error);

          // Call the `cb` function with the error
          return cb(error, false);
        });
    }
  )
);
``;

export default passport;
