import { Request, Response } from "express";
import { userService } from "../services/user.service";

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else
            res.status(500).json({ error: "Error de servidor" });
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(parseInt(id));
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            res.json(user);
        }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else
            res.status(500).json({ error: "Error de servidor" });
    }
};

const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            res.json(user);
        }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else
            res.status(500).json({ error: "Error de servidor" });
    }
};

const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const newUser = await userService.createUserWithEmailAndPassword(email, password);
        res.json(newUser);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });

        } else
            res.status(500).json({ error: "Error de servidor" });
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { id } = req.params;
        const updateUser = await userService.updateUserEmailAndPassword(parseInt(id), email, password);
        res.json(updateUser);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });

        } else
            res.status(500).json({ error: "Error de servidor" });
    }

}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteUser = await userService.deleteUserById(parseInt(id));
        res.json(deleteUser);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });

        } else
            res.status(500).json({ error: "Error de servidor" });
    }

}

export const userController = {
    getUsers,
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};
