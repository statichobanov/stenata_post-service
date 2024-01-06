"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserRepository = require("../repostories/PostRepository");

function initPassport() {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const userRepository = new UserRepository();
          const user = await userRepository.findUserByEmail(email);
          if (!user || !(await user.isValidPassword(password))) {
            return done(null, false, {
              message: "Incorrect username or password",
            });
          }
          return done(null, user);
        } catch (error) {
          console.log("initPassport error", error);
          return done(error);
        }
      }
    )
  );
}

module.exports = initPassport;
