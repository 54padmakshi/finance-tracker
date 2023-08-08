import React from 'react';
import "./style.css";
import {Row,Card} from "antd";
import Button from '../Button';


function Cards({showExpenseModal,showIncomeModal,income,expense,balance}) {

  return (
    <div>
      <Row className='row'>
         <Card title = "Current Balance" className='my-card'>
         <p>{balance}</p>
         <Button text="Reset Balance" blue={true}/>
          </Card>

           <Card title = "Total Income" className='my-card' >
         <p>{income}</p>
         <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
          </Card>

          <Card title = "Total Expenses" className='my-card'>
         <p>{expense}</p>
         <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
          </Card>
      </Row>
    
    </div>
  )
}

export default Cards