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
            return user;
        }
        catch (e) {
            throw new HttpException(`User already exists with uid '${uid}'`, 400);
        }
    }
}

export default new UsersService();