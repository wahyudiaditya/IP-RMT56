function errorHandler(err, req, res, next) {
  console.log(err);

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      return;
    case "Unauthorized":
      res.status(401).json({ message: err.message });
      return;
    case "Forbidden":
      res.status(403).json({ message: err.message });
      return;
    case "BadRequest":
      res.status(400).json({ message: err.message });
    case "NotFound":
      res.status(404).json({ message: err.message });
      return;
    case "UploadError":
      res.status(500).json({ message: err.message });
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = errorHandler;
