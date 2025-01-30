const jwt = require("jsonwebtoken");
const BaseError = require("../Utils/base_error");
function checkerRoleChanger(req, res, next) {
  try {
    const { accesstoken } = req.cookies;
    const decoded = jwt.verify(accesstoken, process.env.ACCESS_SECRET_KEY);
    
    if (decoded.role !== "superadmin") {
      return next(
        BaseError.BadRequest(
          403,
          "Sizga bu amalni bajarish taqiqlanadi!"
        )
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkerRoleChanger