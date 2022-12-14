import prisma from "../config/prisma";
import { HttpException } from "../models/exception.model";

class UsersService {
    async createUser(uid: string) {
        try {
            const user = await prisma.app_user.create({
                data: {
                    id: uid
                }
            });
            return {
                status: "Created user with id: " + uid
            };
        }
        catch (e) {
            return {
                status: "User already exists"
            };
        }
    }
}

export default new UsersService();