import React, { useState } from 'react';
import { Button, Radio, Select, Table } from 'antd';
import searchImg from "../../assets/search.svg";
import { unparse , parse} from "papaparse";
import './style.css';
import {toast } from "react-toastify";


function TransactionsTable({transactions,addTransaction,fetchTransactions}) {
    const [sortKey,setSortKey] = useState("");
    const {Option} = Select;
    const [search,setSearch] =useState("");
    const [typeFilter,setTypeFilter] = useState("");
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
      ];

      let filteredTransactions = transactions.filter((item)=>item.name.toLowerCase()//.includes(search.toLowerCase()) 
      && item.type.includes(typeFilter)
      )

      let sortedTransactions = filteredTransactions.sort((a,b) => {
        if (sortKey === "date") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortKey === "amount") {
            return a.amount - b.amount;
        } else {
            return 0;
        }
      });

function exportToCsv() {
 
var csv =unparse({
	fields: ["name", "type","tag","amount","date"],
	data: transactions
});
const blob =new Blob([csv],{type:"text/csv;charset=utf-8"});
const url=URL.createObjectURL(blob);
const link=document.createElement("a");
link.href=url;
link.download = "transactions.csv";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

function importFromCsv(event){
event.preventDefault();
try{
     parse(event.target.files[0] , {
            header:true,
            complete : async function (results){
              console.log("results>>>",results);
                 for(const transaction of results.data){  //use addtrasaction function here , to take it from firebase
                 console.log("Transactions", transaction);

                   const amountString = transaction.amount ? transaction.amount.trim().replace(/,/g, '') : '';
                 const parsedAmount = amountString ? parseFloat(amountString) : 0; 
                 const newTransaction = {...transaction,
          amount: isNaN(parsedAmount) ? 0 : parsedAmount,
        };
        await addTransaction(newTransaction, true);

        }
      }
     });
     toast.success("All Transactions Added");
     fetchTransactions();     
     event.target.value = null;
}
catch(error){
  toast.error(error.message);
}

}

  return (
    <>
    
    <div style={{width:"95%", padding:'0rem 2rem',alignItems:"center" }}>
        <div  style={{display:'flex', justifyContent:'space-between', gap:'1rem',alignItems:'center',marginBottom:'1rem'}} >

       

  <div className='input-flex'>
  <img src={searchImg} width="16" alt="error"/>
  <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search by Name'/>
  </div>
   


    {/*search by options */}
    <Select
    className='select-input'
    onChange={(value)=>setTypeFilter(value)}
    value={typeFilter}
    placeholder="Filter"
    allowClear
    >
        <Option value="">All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
    </Select>
    </div>

    <div className='my-table'>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',marginBottom:'1rem'}}>
        <h2>My Transactions</h2>
        <Radio.Group
    className='input-radio'
    value={sortKey}
    onChange={(e)=>setSortKey(e.target.value)}
    >
        <Radio.Button value="">No Sort</Radio.Button>
        <Radio.Button value="date">Sort By Date</Radio.Button>
        <Radio.Button value="amount">Sort By Amount</Radio.Button>
    </Radio.Group>
    <div style={{display:"flex", width:"500px",justifyContent:'center',gap:"1rem"}}>
        <Button className='button' onClick={exportToCsv}>Export to CSV</Button>
        <label for="file-csv" className='button button-blue' >Import from CSV </label>
        <input
            id='file-csv'
            type='file'
            accept='.csv'
            required style={{display:"none"}}
            onChange={importFromCsv}
        />
    </div>
      </div>

    </div>

    {/** search by sorting */}
    


    <Table dataSource={sortedTransactions} columns={columns} />
 </div>

    </>
  )
}

export default TransactionsTable
