const mongoose = require("mongoose");
const { level } = require("winston");
const { Schema } = mongoose;


const LikeSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {versionKey: false}
);

const DislikeSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'auths', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: true },
  createdAt: { type: Date, default: Date.now },
},
{versionKey: false}
);

const LikeModel = mongoose.model("likes", LikeSchema);
const DisLikeModel = mongoose.model("dislikes", DislikeSchema);

module.exports = {
  LikeModel,
  DisLikeModel
};