import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

class AuthModel {

    static async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    static async comparePassword(password, hashed) {
        return bcrypt.compare(password, hashed);
    }

    static generateToken(user) {
        return jwt.sign(
            {
                id: user.id_user,
                email: user.email,
                role: user.roleName
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
    }
}

export default AuthModel;
