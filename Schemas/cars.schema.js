const { valid, required, ref } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const currentYear = new Date().getFullYear();
const CarsSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, "Avtomobil brendi yozilishi shart!"],
      minLength: [
        2,
        "Avtomobil brendi kamida 2 ta belgidan iborat bo'lishi kerak!",
      ],
      maxLength: [
        40,
        "Avtomobil brendi ko'pi bilan 30 ta belgidan iborat bo'lishi lozim!",
      ],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Avtomobil modeli kiritilishi lozim!"],
      minLength: [2, "Avtomobil modeli kamida 10 ta belgidan iborat bo'lishi kerak!"],
      maxLength: [30, "Avtomobil modeli ko'pi bilan 30 ta belgidan iborat bo'lishi lozim!"],
    },
    motor: {
      type: Number,
      required: [true, "Avtomobil motori kiritilishi lozim!"],
      min: [1, "Avtomobil motori hajmi kamida 1 bo'lishi kerak!"],
      max: [10, "Avtomobil motori hajmi ko'pi bilan 10 bo'lishi mumkin!"],
    },
    color: {
      type: String,
      required: [true, "Avtomobil rangi yozilishi shart!"],
      minLength: [
        2,
        "Avtomobil rangi kamida 2 ta belgidan iborat bo'lishi kerak!",
      ],
      maxLength: [
        40,
        "Avtomobil rangi ko'pi bilan 30 ta belgidan iborat bo'lishi lozim!",
      ],
      trim: true,
    },
    gearbox: {
      type: String,
      required: [true, "Avtomobil uzatmalar qutisi yozilishi shart!"],
      valid: ["avtomat", "mexanika"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Avtomobil tavsifi yozilishi shart!"],
      minLength: [
        10,
        "Avtomobil tavsifi kamida 10 ta belgidan iborat bo'lishi kerak!",
      ],
      maxLength: [
        100,
        "Avtomobil tavsifi ko'pi bilan 100 ta belgidan iborat bo'lishi lozim!",
      ],
      trim: true,
    },
    tinting: {
      type: String,
      required: [true, "Avtomobil tonirovkasi ma'lumoti yozilishi shart!"],
      valid: ["bor", "yo'q"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Avtomobil ishlab chiqarilgan yili kiritilishi lozim!"],
      min: [1950, "Avtomobil ishlab chiqarilgan yil kamida 1950 bo'lishi kerak!"],
      validate: {
        validator: function (value) {
          return value <= currentYear;
        },
        message: `Avtomobil ishlab chiqarilgan yil ko'pi bilan ${currentYear} bo'lishi mumkin`,
      },
    },
    distance: {
      type: Number,
      required: [true, "Avtomobil bosib o'tgan masofasi kiritilishi lozim!"],
      min: [0, "Avtomobil bosib o'tgan masofasi kamida 0 bo'lishi kerak!"],
      max: [1000000, "Avtomobil bosib o'tgan masofasi ko'pi bilan 1000000 bo'lishi mumkin!"],
    },
    price: {
      type: Number,
      required: [true, "Avtomobil narxi kiritilishi lozim!"],
      min: [0, "Avtomobil narxi kamida 0 bo'lishi kerak!"]
    },
    img: {
      type: Array,
      required: false
    }
  },
  { versionKey: false }
);

const CarsModel = mongoose.model("cars", CarsSchema);
module.exports = CarsModel;
