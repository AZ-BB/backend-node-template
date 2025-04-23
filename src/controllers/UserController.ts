import { RequestHandler } from "express";
import { UserCreateType } from "../validationSchema/UserCreate";
import BadRequest from "../middlewares/handlers/errors/BadRequest";
import { UserLoginType } from "../validationSchema/UserLogin";
import { Result } from "../utils/Result";
import { UserServices } from "../services/UserServices";


const createUserAPI: RequestHandler = async (req, res, next) => {
    try {
        const { name, email, phoneNumber, password } = req.body as UserCreateType;

        const user = await UserServices.createUser({
            name,
            email,
            phoneNumber: phoneNumber || '',
            telegramId: '',
            password
        })

        res.status(201).json(new Result({
            status: true,
            message: 'User created successfully',
            data: user
        }))
    }
    catch (e) {
        next(e)
    }
}

const deleteUserAPI: RequestHandler<{ id: number }> = async (req, res, next) => {
    try {
        const { id } = req.params

        if (isNaN(id)) {
            throw new BadRequest("Invalid user id")
        }

        await UserServices.deleteUser(id)

        res.status(204).send()
    }
    catch (e) {
        next(e)
    }
}

const loginAPI: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body as UserLoginType

        const result = await UserServices.login(email, password)


        res.status(200).json(new Result({
            status: true,
            message: 'Login successful',
            data: result
        }))
    }

    catch (e) {
        next(e)
    }
}

export const UserController = {
    createUserAPI,
    deleteUserAPI,
    loginAPI
}