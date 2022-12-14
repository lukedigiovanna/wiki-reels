import styled from "styled-components";

const Button = styled.button`
    padding: 10px;
    border-radius: 3px;
    border: none;
    filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.9));
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin: 6px;

    transition: 0.4s ease-in-out;

    &:hover {
        filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.9));
    }
`

const Logo = styled.img`
    width: 1.8rem;
    margin-right: 8px;
`

const Text = styled.p`
    margin: 0;
    font-weight: 400;
    font-size: 1.0rem;
`

export const GoogleSignInButton = (props: { onClick: () => void }) => {
    return (
        <Button onClick={props.onClick}>
            <Logo 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
            />
            <Text>
                Continue with Google
            </Text>
        </Button>
    );
};