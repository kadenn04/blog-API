const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
require("dotenv").config();
const jwt = require('jsonwebtoken');


passport.use(
    new LocalStrategy( async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
            where: {
                username: username
            }
            })
        
        if (!user) {
            return done(null, false, { message: "Incorrect username"});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, {message: "Incorrect password"});
        }

        return done(null, user);
        
    } catch(err) {
        return done(err);
    }
  })
);



async function verifyCallback(jwt_payload, done) {
    try {
        const user = await prisma.user.findUnique({where: {id: jwt_payload.sub}});

        return done(null, user);
    } catch(err) {
        return done(err, false);
    }
}

const jwtStrategy = new JwtStrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, verifyCallback)

passport.use(jwtStrategy);

module.exports = passport;