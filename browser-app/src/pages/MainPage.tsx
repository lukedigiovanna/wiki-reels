import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { randomArticle } from '../api';
import { Article } from '../types/articles';
import './wikipedia-styles.css';
import { auth } from '../constants/firebase';
import { ArticleDisplay } from '../components/ArticleDisplay';
import { Navigate } from 'react-router-dom';

const Container = styled.div`
    max-width: 800px;
    margin: auto;
    display: block;
`

const Title = styled.h1`
    font-family: sans-serif;
`

const SignedInDetails = styled.p`
    position: fixed;
    right: 10px;
    top: -10px;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: sans-serif;
`

const Italic = styled.span`
    font-style: italic;
`

export const MainPage = () => {
    const [article, setArticle] = useState<Article | null>(null);

    const newArticle = async () => {
        setArticle(null);
        const res = await randomArticle();
        setArticle(res);
    }

    useEffect(() => {
        if (auth.currentUser != null) {
            // fill in a random article when the page loads
            (async () => {
                newArticle();
            })();
        }
    }, []);

    return (
        <>
            <Container>
                <Title>
                    Wiki-Reels
                </Title>
                {
                    !auth.currentUser &&
                    <Navigate to="/sign-in" replace={true} />
                }
                <ArticleDisplay article={article} newArticle={newArticle}/>
            </Container>
            <SignedInDetails>
                Signed in as <Italic>{auth.currentUser?.email}</Italic>
            </SignedInDetails>
        </>
    )
}