const express = require("express");
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    if (req.body) {
        const { published } = req.body;
        if ( published ) {
            (published === 'true') ? req.body.published = true : req.body.published = false;
        }
    }
    next();
})

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Now listening on Port ${PORT}`);
})