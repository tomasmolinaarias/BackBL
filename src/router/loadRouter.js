import router from "./apiRouter.js";

export const load = (app) => {
  /* BACKEND */
  app.use("/api", router);
  // Redericionar Api
  app.use("*", (req, res) => res.redirect(`/api/`));
};
