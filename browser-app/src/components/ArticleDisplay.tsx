import { Article } from "../types/articles";
import styled from "styled-components";

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

export const ArticleDisplay = (props: {article: Article | null, newArticle: () => void}) => {
    return (
        <>
            <button onClick={async () => {
                props.newArticle();
            }}>
                Like
            </button>
            <button onClick={async () => {
                props.newArticle();
            }}>
                Neutral
            </button>
            <button onClick={async () => {
                props.newArticle();
            }}>
                Dislike
            </button>

            {
                props.article &&
                <>
                    <ArticleTitle>
                        {props.article.title}
                    </ArticleTitle>
                    <CategoryList>
                        {props.article.categories.map((cat, index: number) => <span key={index}>{" ● " + cat}</span>)}
                    </CategoryList>
                    <div dangerouslySetInnerHTML={{__html: props.article.body}}>
                    
                    </div>
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