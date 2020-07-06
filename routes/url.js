const validUrl = require("valid-url");
const createError = require("../utilis/createError");
const Url = require("../model/Url");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.post("/post", async (req, res, next) => {
    try {
      const { originalUrl, customUrl } = req.body;

      console.log(originalUrl);
      if (!validUrl.isUri(originalUrl))
        throw createError(400, "Please add a valid url");

      const url = await Url.findOne({ originalUrl });

      if (url) return genShortUrl(req, url.customUrl, res);

      const newBody = {
        originalUrl,
        customUrl,
      };
      console.log("hello");
      const createUrl = await Url.create(newBody);

      genShortUrl(req, createUrl.customUrl, res);
    } catch (error) {
      next(error);
    }
  });

  app.get("/:customUrl", async (req, res, next) => {
    try {
      const findUrl = await Url.findOne({ customUrl: req.params.customUrl });

      if (!findUrl) throw createError(404, "Url not found");

      res.redirect(findUrl.originalUrl);
    } catch (error) {
      next(error);
    }
  });
};

const genShortUrl = (req, customUrl, res) => {
  const shortUrl = `${req.protocol}://${req.get("host")}/${customUrl}`;

  res.render("index", { result: shortUrl });
};
