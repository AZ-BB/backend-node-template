import { Router } from "express";
import { UserCreateSchema } from "../validationSchema/UserCreate";
import { Validation } from "../middlewares/Validation";
import { UserLoginSchema } from "../validationSchema/UserLogin";
import { UserController } from "../controllers/UserController";

const UserRouter = Router()

UserRouter.post('/', Validation.bodyValidation(UserCreateSchema), UserController.createUserAPI)

UserRouter.delete('/:id', UserController.deleteUserAPI)

UserRouter.post('/login', Validation.bodyValidation(UserLoginSchema), UserController.loginAPI)

export default UserRouter