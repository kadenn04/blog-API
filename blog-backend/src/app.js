const express = require("express");
const session = require("express-session");
const passport = require("./authenticators/loginAuthenticator");

const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");

const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Now listening on Port ${PORT}`);
})