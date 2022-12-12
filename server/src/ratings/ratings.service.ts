import prisma from "../config/prisma";

class RatingsService {
    
    async getAll(): Promise<any[]> {
        const results = await prisma.rating.findMany()
        return results;
    }

    async postRating(user: string, rank: number, article: string) {
        const data = await prisma.rating.create({
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