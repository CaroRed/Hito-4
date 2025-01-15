import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { generateAccessToken } from "../utils/auth.util";
import { userService } from "./user.service";

const loginWithEmailAndPassword = async (email: string, password: string) => {
    // 1. verificar que existe el usuario
    const user = await User.findOne({
        where: { email },
        attributes: ["email", "password", "uid"],
    });


    if (!user) {
        throw new Error("User not found");
    }

    const userData = user.toJSON();

    // 2. comparar los hash de contraseña
    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
        throw new Error("Wrong password");
    }

    // 3. generar el token
    const token = generateAccessToken(userData.email, userData.uid);

    return { token: token };
};

const registerWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    const newUser = await userService.createUserWithEmailAndPassword(
        email,
        password
    );

    //console.log(newUser.uid);

    const token = generateAccessToken(newUser.email, newUser.uid);

    return { newUser, token };

};

export const authService = {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
};