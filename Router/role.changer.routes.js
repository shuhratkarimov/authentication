const { Router } = require("express");
const checkerRoleChanger = require("../Middlewares/role_changer_checker_middleware")
const {verifyAccessToken} = require("../Middlewares/verify_token_middleware")
const changeUserRole = require("../Controller/role.changer.controller")
const RoleCheckerRouter = Router()

RoleCheckerRouter.post("/change_role/:id", [verifyAccessToken, checkerRoleChanger], changeUserRole)

module.exports = RoleCheckerRouter