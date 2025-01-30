const { Router } = require("express");
const {
  getCars,
  getOneCar,
  searchCars,
  addCar,
  updateCar,
  deleteCar,
} = require("../Controller/cars.controller.js");
const CarsValidator = require("../Middlewares/cars_validation_middleware.js");
const CarsRouter = Router();
const {verifyAccessToken} = require("../Middlewares/verify_token_middleware.js")
const {likeCar, disLikeCar} = require("../Controller/likes.controller.js")

CarsRouter.get("/get_cars", getCars);
CarsRouter.get("/get_one_car/:id", getOneCar);
CarsRouter.get("/search_cars", searchCars);
CarsRouter.post("/add_car", [CarsValidator, verifyAccessToken], addCar);
CarsRouter.put("/update_car/:id", verifyAccessToken, updateCar);
CarsRouter.delete("/delete_car/:id", verifyAccessToken, deleteCar);
CarsRouter.post("/like", verifyAccessToken, likeCar)
CarsRouter.post("/dislike", verifyAccessToken, disLikeCar)

module.exports = CarsRouter;
