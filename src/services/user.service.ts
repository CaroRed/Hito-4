import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
};

const getUserById = async (uid: string) => {
    const user = await User.findByPk(uid);

    if (!user) {
        throw new Error("User not found");
    }

    return user.toJSON();
};

const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        throw new Error("User not found");
    }

    const userData = user.toJSON();

    return userData;
};

const createUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: passwordHashed });

    return newUser.toJSON();

};

const updateUserEmailAndPassword = async (uid: string, email: string, password: string) => {
    const user = await User.findByPk(uid);

    if (!user) {
        throw new Error("User not found");
    }

    const userData = user.toJSON();

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(userData.password, salt);

    //const updateUser = await UserModel.update(uid, email, passwordHashed);

    const res = await User.update(
        {
            email: email,
            password: passwordHashed
        },
        {
            where: {
                uid: userData.uid,
            },
        },
    );

    return res;
}

const deleteUserById = async (uid: string) => {
    const user = await User.findByPk(uid);

    if (!user) {
        throw new Error("User not found");
    }
    //const deleteUser = await UserModel.deleteUser(uid);

    const deleteUser = await User.destroy({
        where: {
            uid: uid,
        },
    });

    return deleteUser;
}

export const userService = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUserWithEmailAndPassword,
    updateUserEmailAndPassword,
    deleteUserById
}; 