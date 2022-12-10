import axios from 'axios';
import { Article } from '../types/articles';

export const randomArticle: () => Promise<Article> = async () => {
    const random = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&formatversion=2&rnlimit=1&rnnamespace=0`
    );
    const { title } = random.data.query.random[0];
    
    // with the title, get the page's content
    const parse = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&prop=text&format=json&redirects=true`
    )

    const categories = await getCategories(title);

    const article: Article = {
        title,
        body: parse.data.parse.text["*"],
        categories
    }

    return article;
}

const forbiddenCategories = [
    "All stub articles", "Articles with short description", "All articles to be expanded",
    "All articles with dead external links", "Articles containing video clips",
    "All articles with unsourced statements", "All articles lacking in-text citations",
    "Short description is different from Wikidata", "All articles lacking reliable references"
]

export const getCategories: (article: string) => Promise<string[]> = async (article: string) => {
    const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?
            action=query&
            format=json&
            prop=categories&
            titles=${article}&
            formatversion=2`);


    const categories: any[] = response.data.query.pages[0].categories;
    const categoryNames: string[] = categories
                                    .map((cat: any) => cat.title.substring(9))
                                    .filter((v) => !forbiddenCategories.includes(v));

    return categoryNames;
}