import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";

const App: React.FC = () =>{
  return (
    <div className="app">
      <span className="heading">Q's Gameshow</span>
      <LoginForm />
    </div>
  );
}

export default App;
