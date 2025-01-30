const BaseError = require("../Utils/base_error")
const {LikeModel, DisLikeModel} = require("../Schemas/like.schema")

const likeCar = async (req, res, next) => {
    const {userId, carId} = req.body
    const existingLike = await LikeModel.findOne({ userId, carId });
    const existingDisLike = await DisLikeModel.findOne({ userId, carId });
    if (existingLike) {
      return next(BaseError.BadRequest(403, "Siz bu avtomobilga like bosgansiz!"))
    }
    if(existingDisLike){
      await DisLikeModel.findOneAndDelete(existingDisLike._id)
    }
    const like = new LikeModel({ userId, carId });
    await like.save();
    res.status(200).json({
        message: "Avtomobilga like bosildi!"
    })
  };

  const disLikeCar = async (req, res, next) => {
    const {userId, carId} = req.body
    const existingDisLike = await DisLikeModel.findOne({ userId, carId });
    if (existingDisLike) {
      return next(BaseError.BadRequest(403, "Siz bu avtomobilga dislike bosgansiz!"))
    }
    const existingLike = await LikeModel.findOne({ userId, carId });
    if(existingLike){
      await LikeModel.findOneAndDelete(existingLike._id)
    }
    const like = new DisLikeModel({ userId, carId });
    await like.save();
    res.status(200).json({
        message: "Avtomobilga dislike bosildi!"
    })
  };
  
  module.exports = {
    likeCar,
    disLikeCar
  }