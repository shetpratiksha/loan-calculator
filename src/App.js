import React, { Component } from 'react';
//import logo from './logo.svg';
import LoanCalc from './container/LoanCalc';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends Component{
  render(){
    return(
     <BrowserRouter>
      <LoanCalc />
      </BrowserRouter>
    )
  }
}
export default App;
