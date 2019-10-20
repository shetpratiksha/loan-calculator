import React from 'react'

const loanCalc = (props) =>{
    return(
        <div>
            <h3>Calculated loan interest</h3>
            <p>Loan Interest Rate: {props.interestRate}</p>
            <p>Monthly Payment: {props.monthlyPayment}</p>
        </div>
    )
}

export default loanCalc;