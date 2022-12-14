import { useState } from "react"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../constants/firebase";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { createUser } from "../api";
import { GoogleSignInButton } from "./GoogleSignInButton";

const Container = styled.div`
    width: 500px;
    padding: 20px;
    margin-top: 100px;
    border: 1px solid black;
    border-radius: 8px;
    background-color: #eee;
`

const Title = styled.h1`
    font-family: sans-serif;
    text-align: center;
`

const Error = styled.p`
    color: red;
    font-family: sans-serif;
`

const Field = styled.div`
    margin-bottom: 5px;
`

const Label = styled.p`
    margin: 0 0 3px 0;
`

const Input = styled.input`
    padding: 3px;
    border-radius: 3px;
    font-family: sans-serif;
    font-size: 0.9rem;
    border: 1px solid black;
`

export const SignInForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<any>(null);

    return (
        <Container>
            <Title>
                Sign In
            </Title>
            <p>
                Sign in with email and password:
            </p>
            <form>
                <Field>
                    <Label>
                        Email:
                    </Label>
                    <Input type="text" onChange={e => {setEmail(e.target.value)}}/>
                </Field>
                <Field>
                    <Label>
                        Password:
                    </Label>
                    <Input type="password" onChange={e => {setPassword(e.target.value)}}/>
                </Field>
            </form>
            <button onClick={() => {
                signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    setUser(result.user);
                })
                .catch(error => {
                    console.log(error);
                    setError("An account does not exist with those credentials.");
                });
            }}>
                Login
            </button>
            <br />
            <GoogleSignInButton onClick={() => {
                signInWithPopup(auth, googleProvider)
                .then(async (result) => {
                    // issue a request to the api to attempt to create a user with this ID.
                    // in case this is the first sign in with their email.
                    await createUser(result.user.uid);
                    setUser(result.user);
                }).catch((e) => {
                    setError("Something went wrong :(");
                });
            }} />
            <Error>
                {error}
            </Error>
            {
                user &&
                <Navigate to="/" replace={true} />
            }
        </Container>
    )
}