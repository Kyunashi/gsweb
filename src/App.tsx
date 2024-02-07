import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm"

const App: React.FC = () =>{
  return (
    <div className="app">
      <span className="heading">Q's Gameshow</span>
      <LoginForm />
      <SignupForm/>
    </div>
  );
}

export default App;
