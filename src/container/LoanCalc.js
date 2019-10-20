import React, { Component, useState } from 'react';
import Slider from 'rc-slider';
import  { connect } from 'react-redux';
import classes from './LoanCalc.css';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import LoanCalcDetails from '../component/LoanCalc/LoanCalc';
import Sidebar from '../component/Sidebar/Sidebar';
// import * as actionTypes from '../store/actions';
// import "./styles.css";
import "rc-slider/assets/index.css";


const historyDataArray = [];
class LoanCalc extends Component{

    state = {
        LAmin: 500,
        LAmax: 5000,
        LAvalue:500,
        LDmin:6,
        LDmax:24,
        LDvalue:6,
        loanCalcData: [],
        localStorageData: [],
        error:false
    }
   
    sliderInputHandler(value){
        console.log('val '+value);
      //  let loanAmount, loanDuration;
        let loanAmount = this.state.LAvalue;
        let loanDuration = this.state.LDvalue;

        historyDataArray.push({
            'LA':loanAmount,
            'LD':loanDuration
        })
        this.onClickHandler(loanAmount,loanDuration);
    }
  
      
    onClickHandler = async(loanAmount,loanDuration) =>{
       
        // console.log('SA ',array)
         axios.get('https://ftl-frontend-test.herokuapp.com/interest?amount='+loanAmount+'&numMonths='+loanDuration)
             .then(response =>{
                 console.log(response.data);
                 const loanCalcArray = [];
                 loanCalcArray.push(
                         response.data
                     );
                    // let user = {...this.state.loanCalcData, loanCalcData: loanCalcArray};
                    this.setState({...this.state.loanCalcData,LAvalue:loanAmount,LDvalue:loanDuration, loanCalcData: loanCalcArray});
                    // this.setState({loanCalcData:loanCalcArray})
                     console.log('data',JSON.stringify(this.state));
                 
             })
             // .catch(error =>{
             //     this.setState({error: true})
             // })
     }

    onLoanDurationSliderChange = (LDvalue) =>{
      //  localStorage.setItem('loanD', LDvalue);
        this.setState({LDvalue});
    }

    onLoanDurationAfterChange = (LDvalue,LAvalue) => {
        console.log(LDvalue); //eslint-disable-line
        console.log('LA ',LAvalue);
    }

    onLoanAmountSliderChange = (LAvalue) =>{
        this.setState({LAvalue})
    }

    onLoanAmountAfterChange = (LAvalue) => {
        console.log(LAvalue); //eslint-disable-line
    }
    render(){
        return(
            
            <div className="row" style={{padding:'30px'}}>
                <h3 style={{textAlign:'center'}}>Loan Interest Calculator</h3>
                <div className="col-md-2" >
                <Sidebar
                    historyDataArray={historyDataArray}
                    clickItems={this.onClickHandler}
                />
                </div>
                <div className="col-md-10">
                Loan Amount: <Slider
                value={this.state.LAvalue} min={this.state.LAmin} max={this.state.LAmax}
                onChange={value =>this.onLoanAmountSliderChange(value)} 
               // onChange= {(value) =>this.sliderInputHandler(value)}
               // onAfterChange={value =>this.onLoanAmountAfterChange(value)}
                onAfterChange={value =>this.sliderInputHandler(value)}
                />
                <br />
                Loan Duration: <Slider dots
                value={this.state.LDvalue} min={this.state.LDmin} max={this.state.LDmax}
                onChange={this.onLoanDurationSliderChange} 
               // onChange= {(value) =>this.sliderInputHandler(value)}
               // onAfterChange={this.onLoanDurationAfterChange}
                onAfterChange={value =>this.sliderInputHandler(value)}
                />
                
                {this.state.loanCalcData.map((loanDetails,index) => (
                     <LoanCalcDetails
                     key={index}
                     interestRate={loanDetails.interestRate}
                    monthlyPayment={loanDetails.monthlyPayment.amount}
                        />
                ))}
                </div>
              
            </div>
        )
    }
}


// const mapStateToProps = state =>{
//     return{
//         ings: state.localStorageData,
//         //price: state.totalPrice
//     }
// }

// const mapDispatchToProps = dispatch =>{
//     return{
//         onSliderSlide: (ingName) => dispatch({type:actionTypes.SLIDER_SLIDE,value: ingName}),
//         //onLDSliderSlide: (ingName) => dispatch({type:actionTypes.LD_SLIDER_SLIDE, ingredientName:ingName})
//     }
// }
export default LoanCalc;