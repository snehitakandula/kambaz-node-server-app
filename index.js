import express from "express";
import cors from "cors";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import "dotenv/config";
import session from "express-session";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import QuizzesRoutes from "./Kambaz/Quizzes/routes.js";
import mongoose from "mongoose";

// ------------------- MongoDB -------------------
const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING ||
  "mongodb://127.0.0.1:27017/kambaz";

mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB Atlas successfully!"))
  .catch((error) => console.error("MongoDB connection error:", error));

const app = express();

// ------------------- CORS -------------------
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

// Required for secure cookies on Render
app.set("trust proxy", 1);

// ------------------- SESSION -------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);


app.use(express.json());

// ------------------- ROUTES -------------------
UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
ModulesRoutes(app);
AssignmentsRoutes(app);
QuizzesRoutes(app);
Lab5(app);
Hello(app);

// ------------------- START SERVER -------------------
app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on http://localhost:4000");
});
