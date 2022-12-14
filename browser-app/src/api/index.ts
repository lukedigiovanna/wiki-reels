import axios from 'axios';
import { Article } from '../types/articles';
import { stemmer } from 'stemmer';

/***************************
 WIKIPEDIA DATABASE API STUFF
***************************/
const removeTag: (content: string, tag: string) => string = (content: string, tag: string) => {
    const html = document.createElement("html");
    html.innerHTML = content;

    // removes boxes that notify of things like the article not having enough citations.
    // this information is not relevant to this application, so we ignore it.
    const remove = html.getElementsByClassName(tag);
    for (let i = 0; i < remove.length; i++) {
        remove[i].parentNode?.removeChild(remove[i]);
    }
    
    return html.innerHTML;
}

const parseArticle: (content: string) => string = (content: string) => {
    const toRemove = ["ambox", "hatnote"];
    toRemove.forEach(className => {
        content = removeTag(content, className);
    });
    return content;
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
                .split(' ').map(a => stemmer(a)).join(' ')
                .slice(0, 1000); // apply stemmer
    while (text[text.length - 1] !== ' ') {
        text = text.slice(0, text.length - 1);
    }
    text = text.trim();
    return text;
}

export const getArticle: (title: string) => Promise<Article> = async (title: string) => {
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
        body: body,
        content: tokenized,
        categories,
    }

    return article;
}

export const randomArticle: () => Promise<Article> = async () => {
    const random = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&formatversion=2&rnlimit=1&rnnamespace=0`
    );
    const { title } = random.data.query.random[0];
    
    return await getArticle(title);
}

const forbiddenCategories = [
    "AC",
    "articles lacking reliable references",
    "articles lacking sources",
    "articles needing additional references",
    "articles needing coordinates",
    "articles to be expanded",
    "articles with dead external links", 
    "articles with unsourced statements", 
    "containing video clips",
    "Creative Commons",
    "description is different from Wikidata", 
    "hCards",
    "identifiers", 
    "lacking in-text citations",
    "missing coordinates", 
    "needing translation from",  
    "stub articles", 
    "to be expanded",
    "Wikidata", 
    "with short description", 
    "with unsourced statements",
]

export const getCategories: (article: string) => Promise<string[]> = async (article: string) => {
    const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=categories&titles=${article}&formatversion=2`);


    const categories: any[] = response.data.query.pages[0].categories;
    const categoryNames: string[] = categories
                                    .map((cat: any) => cat.title.substring(9))
                                    .filter((v: string) => forbiddenCategories.every((f) => !v.includes(f)));

    return categoryNames;
}

/***************************
 SQL DATABASE API STUFF
***************************/

const domain = "http://localhost:4000";
export const createUser = async (uid: string) => {
    const response = await axios.post(`${domain}/api/users`, { uid });
    return response.data;
}

export const submitRating = async (uid: string, article: string, rating: number) => {
    // need to submit the rating into the SQL database.
    const response = await axios.post(`${domain}/api/ratings`, { user: uid, articleTitle: article, rank: rating});
    return response.data;
}

/***************************
 FIREBASE DATABASE API STUFF
***************************/
export const submitArticle = async (article: Article) => {
    const response = await axios.post(`${domain}/api/articles`, { 
        title: article.title,
        content: article.content,
        categories: article.categories
    });
    return response.data;
}