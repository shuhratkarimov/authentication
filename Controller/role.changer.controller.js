const UserModel = require("../Schemas/auth.schema");
const BaseError = require("../Utils/base_error");
const logger = require("../service/logger");

async function changeUserRole(req, res, next) {
  try {
    const { new_role } = req.body;
    if (!new_role) {
      return next(BaseError.BadRequest(404, "new_role kiritilmadi!"))
    }
    const {id} = req.params
    const user = await UserModel.findById(id);
    if (!user) {
      return next(BaseError.BadRequest(404, "Bunday foydalanuvchi topilmadi!"));
    }
    if (!["admin", "user"].includes(new_role)) {
      return next(
        BaseError.BadRequest(
          403,
          `Faqatgina USER va ADMIN rollari o'zgartirilishi mumkin!`
        )
      );
    }
    if (user.role === new_role) {
      return next(
        BaseError.BadRequest(
          403,
          `${user.username}ning hozirgi roli ham ${new_role}`
        )
      );
    }
    const updatedUserWithNewRole = await UserModel.findByIdAndUpdate(id, {role: new_role})
    logger.info(
      `Foydalanuvchining roli o'zgartirildi: ${updatedUserWithNewRole.username}, yangi rol: ${new_role}`
    );
    res.status(200).json({
      message: `${updatedUserWithNewRole.username}ning roli o'zgartirildi:  yangi rol: ${new_role}`,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = changeUserRole;
