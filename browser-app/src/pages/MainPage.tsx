import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { randomArticle } from '../api';
import { Article } from '../types/articles';
import './wikipedia-styles.css';

const Container = styled.div`
    max-width: 800px;
    margin: auto;
    display: block;
`

const Title = styled.h1`
    font-family: sans-serif;
`

const ArticleTitle = styled.h1`
    font-family: sans-serif;
    margin: 0;
`

const CategoryList = styled.p`
    margin: 0 0 7px 0;
    font-weight: 450;
    font-size: 0.8rem;
    font-family: sans-serif;
`

export const MainPage = () => {
    const [article, setArticle] = useState<Article | null>(null);

    const newArticle = async () => {
        setArticle(null);
        const res = await randomArticle();
        setArticle(res);
    }

    useEffect(() => {
        // fill in a random article when the page loads
        (async () => {
            newArticle();
        })();
    }, []);

    return (
        <Container>
            <Title>
                Wiki-Reels
            </Title>
            <button onClick={async () => {
                newArticle();
            }}>
                Like
            </button>
            <button onClick={async () => {
                newArticle();
            }}>
                Neutral
            </button>
            <button onClick={async () => {
                newArticle();
            }}>
                Dislike
            </button>

            {
                article &&
                <>
                    <ArticleTitle>
                        {article.title}
                    </ArticleTitle>
                    <CategoryList>
                        {article.categories.map((cat) => <span>{" ● " + cat}</span>)}
                    </CategoryList>
                    <div dangerouslySetInnerHTML={{__html: article.body}}>
                    
                    </div>
                </>
            }
            {
                !article && 
                <p>
                    loading...
                </p>
            }
        </Container>
    )
}