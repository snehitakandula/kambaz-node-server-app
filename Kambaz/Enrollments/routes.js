import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  app.post("/api/users/:uid/courses/:cid", async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) return res.sendStatus(401);
      uid = currentUser._id;
    }

    const status = await dao.enrollUserInCourse(uid, cid);
    res.json(status);
  });

  app.delete("/api/users/:uid/courses/:cid", async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) return res.sendStatus(401);
      uid = currentUser._id;
    }

    const status = await dao.unenrollUserFromCourse(uid, cid);
    res.json(status);
  });

  app.get("/api/courses/:cid/users", async (req, res) => {
    const { cid } = req.params;
    const users = await dao.findUsersForCourse(cid);
    res.json(users);
  });
}
