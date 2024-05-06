import express from "express";
import studentRouter from "./student";
import courseRouter from "./course";
import chapterRouter from "./chapter"

const app = express();

app.use("/student" , studentRouter)
app.use("/course" , courseRouter)
app.use("/chapter" , chapterRouter)

app.listen(3000, () => console.log("Server running on port 3000"));