import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
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

export const MainPage = () => {
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        // fill in a random article when the page loads
        (async () => {
            setArticle(await randomArticle());
        })();
    }, []);

    const newArticle = async () => {
        const res = await randomArticle();
        setArticle(res);
    }

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
                <div dangerouslySetInnerHTML={{__html: article.body}}>
                
                </div>
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