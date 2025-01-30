const Joi = require("joi");
const currentYear = new Date().getFullYear();

const CarsValidation = (data) => {
  try {
    const CarsValidationSchema = Joi.object({
      brand: Joi.string().min(2).max(30).trim().required().messages({
        "string.base": "Avtomobil brendi string ko'rinishida bo'lishi kerak!",
        "string.empty": "Avtomobil brendi bo'sh bo'lmasligi kerak!",
        "any.required": "Avtomobil brendi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Avtomobil brendi kamida 2ta belgidan iborat bo'lishi lozim!",
        "string.max":
          "Avtomobil brendi ko'pi bilan 50ta belgidan iborat bo'lishi mumkin!",
      }),
      model: Joi.string().min(2).max(30).trim().required().messages({
        "string.base": "Avtomobil modeli string ko'rinishida bo'lishi kerak!",
        "string.empty": "Avtomobil modeli bo'sh bo'lmasligi kerak!",
        "any.required": "Avtomobil modeli talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Avtomobil modeli kamida 2ta belgidan iborat bo'lishi lozim!",
        "string.max":
          "Avtomobil modeli ko'pi bilan 50ta belgidan iborat bo'lishi mumkin!",
      }),
      motor: Joi.number().min(1).max(10).required().messages({
        "number.base":
          "Avtomobil motori hajmi son ko'rinishida bo'lishi kerak!",
        "number.empty": "Avtomobil motori hajmi bo'sh bo'lmasligi kerak!",
        "any.required":
          "Avtomobil motori hajmi talab qilinadi va kiritilishi lozim!",
        "number.min": "Avtomobil motori hajmi kamida 1 bo'lishi lozim!",
        "number.max": "Avtomobil motori hajmi ko'pi bilan 10 bo'lishi mumkin!",
      }),
      color: Joi.string().min(2).max(30).trim().required().messages({
        "string.base": "Avtomobil rangi string ko'rinishida bo'lishi kerak!",
        "string.empty": "Avtomobil rangi bo'sh bo'lmasligi kerak!",
        "any.required": "Avtomobil rangi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Avtomobil rangi kamida 2ta belgidan iborat bo'lishi lozim!",
        "string.max":
          "Avtomobil rangi ko'pi bilan 30ta belgidan iborat bo'lishi mumkin!",
      }),
      gearbox: Joi.string()
        .valid("avtomat", "mexanika")
        .trim()
        .required()
        .messages({
          "string.base":
            "Avtomobil uzatmalar qutisi (korobka) turi string ko'rinishida bo'lishi kerak!",
          "string.empty":
            "Avtomobil uzatmalar qutisi (korobka) turi bo'sh bo'lmasligi kerak!",
          "any.required":
            "Avtomobil uzatmalar qutisi (korobka) turi talab qilinadi va kiritilishi lozim!",
          "any.only": `Avtomobil uzatmalar qutisi (korobka) turi faqat "avtomat" yoki "mexanika" bo'lishi mumkin!`,
        }),
      description: Joi.string().min(10).max(100).trim().required().messages({
        "string.base": "Avtomobil tavsifi string ko'rinishida bo'lishi kerak!",
        "string.empty": "Avtomobil tavsifi bo'sh bo'lmasligi kerak!",
        "any.required":
          "Avtomobil tavsifi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Avtomobil tavsifi kamida 10ta belgidan iborat bo'lishi lozim!",
        "string.max":
          "Avtomobil tavsifi ko'pi bilan 100ta belgidan iborat bo'lishi mumkin!",
      }),
      tinting: Joi.string().valid("bor", "yo'q").required().messages({
        "string.base":
          "Avtomobil tonirovkasi ma'lumoti string ko'rinishida bo'lishi kerak!",
        "string.empty":
          "Avtomobil tonirovkasi ma'lumoti bo'sh bo'lmasligi kerak!",
        "any.required":
          "Avtomobil tonirovkasi ma'lumoti talab qilinadi va kiritilishi lozim!",
        "any.only": `Avtomobil tonirovkasi faqat "bor" yoki "yo'q" bo'lishi mumkin!`,
      }),
      year: Joi.number().min(1950).max(currentYear).required().messages({
        "number.base":
          "Avtomobil ishlab chiqarilgan yil son ko'rinishida bo'lishi kerak!",
        "number.empty":
          "Avtomobil ishlab chiqarilgan yil bo'sh bo'lmasligi kerak!",
        "any.required":
          "Avtomobil ishlab chiqarilgan yil talab qilinadi va kiritilishi lozim!",
        "number.min": "Avtomobil ishlab chiqarilgan yil kamida 1950 bo'lishi lozim!",
        "number.max": `Avtomobil ishlab chiqarilgan yil ko'pi bilan ${currentYear} bo'lishi mumkin!`,
      }),
      distance: Joi.number().min(0).max(1000000).required().messages({
        "number.base":
          "Avtomobil bosib o'tgan masofasi son ko'rinishida bo'lishi kerak!",
        "number.empty":
          "Avtomobil bosib o'tgan masofasi bo'sh bo'lmasligi kerak!",
        "any.required":
          "Avtomobil bosib o'tgan masofasi talab qilinadi va kiritilishi lozim!",
        "number.min": "Avtomobil bosib o'tgan masofasi kamida 0 bo'lishi lozim!",
        "number.max": `Avtomobil bosib o'tgan masofasi ko'pi bilan 1000000 bo'lishi mumkin!`,
      }),
      price: Joi.number().min(0).required().messages({
        "number.base":
          "Avtomobil narxi son ko'rinishida bo'lishi kerak!",
        "number.empty":
          "Avtomobil narxi bo'sh bo'lmasligi kerak!",
        "any.required":
          "Avtomobil narxi talab qilinadi va kiritilishi lozim!",
        "number.min": "Avtomobil narxi kamida 0 bo'lishi lozim!"
      }),
    });
    return CarsValidationSchema.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = CarsValidation;
