const unknownEndpoints = () => {
  const error = new Error("Unknown Endpoints");
  error.status = 404;
  throw error;
};

const errorHandler = (err, req, res, next) => {
  //Mongoose Bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.render("index", { errorMsg: err.message });
  }

  //Mongoose validation Error
  if (err.name === "ValidationError") {
    console.log(err);
    const message = Object.values(err.errors).map((val) => val.message);
    const arrayIntoString = message.join(",");
    return res.render("index", { errorMsg: arrayIntoString });
  }

  //Mongoose Dublicat key
  if (err.code === 11000) {
    return res.render("index", { errorMsg: err.message });
  }

  res.render("index", { errorMsg: err.message });
};

module.exports = {
  unknownEndpoints,
  errorHandler,
};
