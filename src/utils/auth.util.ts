import jwt from "jsonwebtoken";

const secret = process.env.AUTH_SECRET;

if (!secret) {
    throw new Error("secret must be provided");
}

export const generateAccessToken = (
    email: string,
    uid: string,
    expiresIn = "1h"
) => {
    return jwt.sign({ email, uid }, secret, {
        expiresIn,
    });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, secret) as jwt.JwtPayload;
};