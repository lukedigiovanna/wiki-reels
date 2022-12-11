import axios from 'axios';
import { Article } from '../types/articles';
import { stemmer } from 'stemmer';

const parseArticle: (content: string) => string = (content: string) => {
    const html = document.createElement("html");
    html.innerHTML = content;

    // removes boxes that notify of things like the article not having enough citations.
    // this information is not relevant to this application, so we ignore it.
    const ambox = html.getElementsByClassName("ambox");
    for (let i = 0; i < ambox.length; i++) {
        ambox[i].parentNode?.removeChild(ambox[i]);
    }
    
    return html.innerHTML;
}

const tokenizeArticle: (content: string) => string = (content: string) => {
    // first extract any content explicitly in a "p" tag
    const html = document.createElement("html");
    html.innerHTML = content;
    let text = Array.from(html.getElementsByTagName("p")).map(p => p.innerText).join(" ");
    // tokenize the text.
    text =  text.toLowerCase()
                .replace(/\[.+\]/g, "") // remove references
                .replace(/\n/g, '') // remove new line characters
                .replace(/[^\w^\s]/g, '') // remove everything except text and whitespace
                .replace(/\s+/g, ' ') // replace any white space with a single space
                .trim() // remove leading and trailing whitespace
                .split(' ').map(a => stemmer(a)).join(' '); // apply stemmer
    console.log(text);
    return text;
}

export const randomArticle: () => Promise<Article> = async () => {
    const random = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&formatversion=2&rnlimit=1&rnnamespace=0`
    );
    const { title } = random.data.query.random[0];
    
    // with the title, get the page's content
    const parse = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&prop=text&format=json&redirects=true`
    )

    const content = parse.data.parse.text["*"];

    const body = parseArticle(content);
    const tokenized = tokenizeArticle(content);
    const categories = await getCategories(title);

    const article: Article = {
        title,
        body,
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