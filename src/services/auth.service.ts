import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/auth.util";
import { userService } from "./user.service";

const loginWithEmailAndPassword = async (email: string, password: string) => {
    // 1. verificar que existe el usuario
    const user = await userService.getUserByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    // 2. comparar los hash de contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Wrong password");
    }

    // 3. generar el token
    const token = generateAccessToken(user.email, user.id);

    return token;
};

const registerWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    const newUser = await userService.createUserWithEmailAndPassword(
        email,
        password
    );

    const token = generateAccessToken(newUser.email, newUser.id);

    return token;
};

export const authService = {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
};