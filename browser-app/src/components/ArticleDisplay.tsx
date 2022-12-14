import { Article } from "../types/articles";
import styled from "styled-components";
import { submitArticle, submitRating } from "../api";
import { auth } from "../constants/firebase";

const ArticleTitle = styled.h1`
    font-family: sans-serif;
    margin: 0;
`

const CategoryList = styled.p`
    margin: 0 0 11px 0;
    font-weight: 450;
    font-size: 0.8rem;
    font-family: sans-serif;
`

const ArticleContainer = styled.div`
    border: 1px solid #333;
    border-radius: 5px;
    padding: 8px 16px 16px 16px;
    margin: 10px;
`

export const ArticleDisplay = (props: {article: Article | null, newArticle: () => void}) => {
    const submit = async (rank: number) => {
        await submitRating(auth.currentUser?.uid as string, props.article?.title as string, rank);
        await submitArticle(props.article as Article);
        props.newArticle();
    }
    
    return (
        <>
            {
                props.article != null &&
                <>
                    <button onClick={async () => {
                        submit(1);
                    }}>
                        Like
                    </button>
                    <button onClick={async () => {
                        submit(0);
                    }}>
                        Neutral
                    </button>
                    <button onClick={async () => {
                        submit(-1);
                    }}>
                        Dislike
                    </button>
                    <ArticleContainer>
                        <ArticleTitle>
                            {props.article.title}
                        </ArticleTitle>
                        <CategoryList>
                            {props.article.categories.map((cat, index: number) => <span key={index}>{" ● " + cat}</span>)}
                        </CategoryList>
                        <div dangerouslySetInnerHTML={{__html: props.article.body}}>
                        
                        </div>
                    </ArticleContainer>
                </>
            }
            {
                !props.article && 
                <p>
                    loading...
                </p>
            }
        </>
    )
}