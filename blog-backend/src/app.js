const express = require("express");
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");
const signupRouter = require("./routes/signupRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/signup", signupRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Now listening on Port ${PORT}`);
})