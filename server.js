const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const { db } = require("./db");

const showsRouter = require("./routes/showsRouter");
app.use("/shows", showsRouter);

const usersRouter = require("./routes/usersRouter");
app.use("/users", usersRouter);

app.listen(port, () => {
  db.sync();
  console.log(`Listening on port ${port}`);
});