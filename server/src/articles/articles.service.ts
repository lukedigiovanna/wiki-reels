import { getFirestore, Firestore } from "firebase-admin/firestore";

class ArticlesService {
    private readonly firestore: Firestore;

    constructor() {
        this.firestore = getFirestore();
    }

    async createArticle(title: string, content: string, categories: string[]) {
        await this.firestore.collection('articles').doc(title).set({
            content,
            categories
        });
    }
}

export default new ArticlesService();