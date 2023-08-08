import React from 'react';
import transactions from "../../assets/transactions.svg";
import "./style.css"

function NoTransactions() {
  return (
    <div className='notransac'>
    <img src={transactions} alt={transactions} style={{width:"400px" , margin:"4rem"}} />
    <p style={{textAlign:"center", fontSize:"1.2rem"}}>You Have No Transactions currently.</p>
    </div>
  )
}

export default NoTransactions