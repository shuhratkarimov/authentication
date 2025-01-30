const { Router } = require("express");
const {
  register,
  login,
  verify,
  logout,
  resendVerificationCode,
  forgotPassword,
  verifyForgotPasswordRecoverCode,
  resendRecoverForgotPasswordCode,
  addNewPassword,
  getUsers,
  show_user_data,
} = require("../Controller/auth.controller");
const AuthValidator = require("../Middlewares/auth_validation_middleware.js");
const {
  getNewAccessTokenUsingRefreshToken,
  verifyAccessToken,
} = require("../Middlewares/verify_token_middleware.js");
const checkerRoleChanger = require("../Middlewares/role_changer_checker_middleware")
const AuthRouter = Router();

AuthRouter.post("/register", AuthValidator, register);
AuthRouter.post("/login", login);
AuthRouter.post("/verify", verify);
AuthRouter.post("/get_forgot_password_code", forgotPassword);
AuthRouter.post("/verify_forgot_password_code", verifyForgotPasswordRecoverCode);
AuthRouter.post("/resend_recover_password_code", resendRecoverForgotPasswordCode);
AuthRouter.post("/add_new_password", addNewPassword);
AuthRouter.post("/resend_verification_code", resendVerificationCode);
AuthRouter.post("/refresh", getNewAccessTokenUsingRefreshToken);
AuthRouter.post("/logout", logout);
AuthRouter.get("/get_users", [verifyAccessToken, checkerRoleChanger], getUsers)
AuthRouter.get("/show_user_data", [verifyAccessToken], show_user_data)

module.exports = AuthRouter;
