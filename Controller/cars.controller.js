const CarsModel = require("../Schemas/cars.schema");
const mongoose = require("mongoose");
const BaseError = require("../Utils/base_error");
const {LikeModel, DisLikeModel} = require("../Schemas/like.schema")

////////////// get

async function getCars(req, res, next) {
  try {
    let { brand } = req.query;
    let cars = await CarsModel.find({
      brand: { $regex: brand, $options: "i" },
    }).sort({ price: -1 });
    if (!cars) {
      return next(
        BaseError.BadRequest(404, "Hali avtomobillar mavjud emas...")
      );
    }
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
}

////////////// search

async function searchCars(req, res, next) {
  try {
    let { model } = req.query;
    let cars = await CarsModel.find({
      model: { $regex: model, $options: "i" },
    });
    if (cars.length === 0) {
      return next(
        BaseError.BadRequest(
          404,
          "Ushbu qidiruv bo'yicha avtomobillar topilmadi..."
        )
      );
    }
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
}

////////////// getOne

async function getOneCar(req, res, next) {
  try {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return next(
        BaseError.BadRequest(404, "ID noto'g'ri formatda kiritilmoqda...")
      );
    }
    const car = await CarsModel.findById(id).lean();
    if (!car) {
      return next(BaseError.BadRequest(404, "Bunday avtomobil mavjud emas..."));
    }
    const likes = await LikeModel.find({carId: id})
    const dislikes = await DisLikeModel.find({carId: id})
    car.likes = likes.length
    car.dislikes = dislikes.length
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
}

////////////// add

async function addCar(req, res, next) {
  try {
    const car = new CarsModel(req.body);
    await car.save();
    res.status(201).json({
      message: "Yangi avtomobil ro'yxatga muvaffaqiyatli qo'shildi!",
    });
  } catch (error) {
    next(error);
  }
}

////////////// update

async function updateCar(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(BaseError.BadRequest(400, "Noto'g'ri ID formati!"));
    }
    const foundCar = await CarsModel.findById(id);
    if (!foundCar) {
      return next(BaseError.BadRequest(404, "Bunday avtomobil topilmadi..."));
    }
    await CarsModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      message: `${foundCar.brand} ${foundCar.model} avtomobilining ma'lumotlari muvaffaqiyatli yangilandi!`,
    });
  } catch (error) {
    next(error);
  }
}

////////////// delete

async function deleteCar(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(BaseError.BadRequest(400, "Noto'g'ri ID formati!"));
    }
    const foundCar = await CarsModel.findById(id);
    if (!foundCar) {
      return next(BaseError.BadRequest(404, "Bunday avtomobil topilmadi..."));
    }
    await CarsModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: `${foundCar.brand} ${foundCar.model} avtomobilining ma'lumotlari muvaffaqiyatli o'chirib tashlandi!`,
    });
  } catch (error) {
    next(error);
  }
}

////////////// export

module.exports = {
  getCars,
  getOneCar,
  searchCars,
  addCar,
  updateCar,
  deleteCar,
};
