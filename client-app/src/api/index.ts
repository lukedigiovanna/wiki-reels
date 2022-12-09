import axios from 'axios';
import { Article } from '../types/articles';

export const randomArticle: () => Promise<Article> = async () => {
    const random = await axios.get(
        `https://en.wikipedia.org/w/api.php?
            action=query&
            format=json&
            list=random&
            formatversion=2&
            rnlimit=1&
            rnnamespace=0`
    );
    const { title } = random.data.query.random[0];
    
    // with the title, get the page's content
    const parse = await axios.get(
        `https://en.wikipedia.org/w/api.php?
            action=parse&
            page=${title}&
            prop=text&
            format=json&
            redirects=true`
    )

    const article: Article = {
        title,
        body: parse.data.parse.text["*"]
    }

    return article;
}