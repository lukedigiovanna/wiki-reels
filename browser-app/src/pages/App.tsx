import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './MainPage';
import { SignInPage } from './SignInPage';

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<MainPage />}></Route>
        <Route path={"/sign-in"} element={<SignInPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
