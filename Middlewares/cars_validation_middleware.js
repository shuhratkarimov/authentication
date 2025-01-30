const CarsValidation = require("../Validator/cars.validation");

module.exports = function CarsValidator(req, res, next) {
  try {
    const { error } = CarsValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    return next();
  } catch (error) {
    throw new Error(error.message);
  }
};
