import { PrismaClient } from "@prisma/client";

class RatingsService {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    get404(): string {
        return `<h1> Forbidden </h1>`
    }

    async getAll(): Promise<any[]> {
        const results = await this.prisma.rating.findMany({})
        return results;
    }

    async postRating(user: string, rank: number, article: string) {
        const data = await this.prisma.rating.create({
            data: {
                app_user: user,
                rank: rank,
                article_title: article
            }
        });
        return data;
    }
}

export default new RatingsService();