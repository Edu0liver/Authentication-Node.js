import { Router } from "express";
import { AuthenticateUserController } from "../../../../module/account/services/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../module/account/services/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes }