import React, { useState,useEffect } from 'react'
import Header from '../components/Header';
import Cards from '../components/Cards';
import AddIncome from '../components/Modals/addIncome';
import AddExpense from '../components/Modals/addExpense';
import { toast } from 'react-toastify';
import { collection, addDoc,getDocs, query } from "firebase/firestore"; 
import { db,auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import TransactionsTable from '../components/TransactionsTable';
import NoTransactions from '../components/NoTransactions/NoTransactions';
import ChartsComponent from '../components/Charts';



function Dashboard() {
 /*const transactions =[{
  type:"income",
  amount:1200,
  tag : "salary",
  name: "income 1",
  date :"223-21-03"
 },
 {
  type:"income",
 amount:1200,
 tag : "salary",
 name: "expense 1",
 date :"223-21-03" 
}
];*/

const [transactions,setTransactions] = useState([]); 
const [loading,setLoading] = useState(false);
  const user =useAuthState(auth);
  const [isExpenseModalVisible ,setIsExpenseModalVisible]=useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

const [income,setIncome] = useState(0);
const[expense,setExpense] =useState(0);
const [balance,setBalance] = useState(0);

  const showExpenseModal= ()=>{
       setIsExpenseModalVisible(true);
  }
  
  function showIncomeModal() {
    setIsIncomeModalVisible(true);
  }

  function handleExpenseCancel() {
    setIsExpenseModalVisible(false);
  }

  function handleIncomeCancel() {
    setIsIncomeModalVisible(false);
  }
 
  function onFinish(values,type) {
   // console.log("On Finish", values,type); 
     const newTransaction = {
      type:type,
      name: values.name,
      amount:parseFloat(values.amount),
      tag:values.tag,
      date:values.date.format("YYYY-MM-DD")
     };
     addTransaction(newTransaction);
  }

  /*async function addTransaction(transaction,many) {
    try {
      const docRef = await addDoc(collection(db,`users/${user.uid}/transactions`),transaction);
      console.log("Document written with ID: ",docRef.id);
      if(!many)toast.success("Transaction Added !");
      // adding the transactions
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (error) {
      console.log("Error in Adding Document: ",error);
     if(!many) toast.error("Couldn't Add Transaction!");
    }
  }   */

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), transaction);
      console.log("Document written with ID: ", docRef.id);
      if (!many) toast.success("Transaction Added!");
       //adding new Transactions
      setTransactions((prevTransactions) => [...prevTransactions, transaction]); // Use functional update pattern
      calculateBalance(); // Calculate balance based on updated transactions
    } catch (error) {
      console.log("Error in Adding Document: ", error);
      if (!many) toast.error("Couldn't Add Transaction!");
    }
  }

  useEffect(() => {
   // get all docs from collection firebase
    fetchTransactions();  
    },[]);   //user

 

  const calculateBalance = ()=>{
    let incomeTotal=0;
    let expensesTotal =0;

    transactions.forEach((transaction)=>{
         if (transaction.type === "income") {
            incomeTotal += transaction.amount; 
         }
         else{
          expensesTotal += transaction.amount;
         }
    });
    setIncome(incomeTotal);
    console.log("incometotoal>>",incomeTotal);
    setExpense(expensesTotal);
    console.log("expensesTotal",expensesTotal);
    setBalance(incomeTotal-expensesTotal);
    console.log("inct-ext>>",incomeTotal-expensesTotal);
  }

  useEffect(()=>calculateBalance(),[transactions]);

  
  
  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
  
      setTransactions(transactionsArray);
      calculateBalance(); // Move calculateBalance here
      console.log("Transactions", transactionsArray);
    }
  
    setLoading(false);
  }
  
  let sortedTransactions = transactions.sort((a,b) => {
           return new Date(a.date) - new Date(b.date);
     })

  return (
    <div> 
   <Header/> 

   {loading ? (<p>Loading..</p>) :  
   ( <>
   <Cards
    income ={income}
    expense={expense}
    balance={balance}
    showExpenseModal={showExpenseModal}
    showIncomeModal={showIncomeModal}
   />

   {transactions && transactions.length !==0  ? <ChartsComponent sortedTransactions={sortedTransactions}/> : <NoTransactions/> }

   <AddExpense
    isExpenseModalVisible={isExpenseModalVisible}
    handleExpenseCancel={handleExpenseCancel}
    onFinish={onFinish}
    />


   <AddIncome
    isIncomeModalVisible={isIncomeModalVisible}
    handleIncomeCancel={handleIncomeCancel}   
    onFinish={onFinish}
  
   />

<TransactionsTable transactions={transactions} addTransaction={addTransaction}/>
</>)}

    </div>
  )
}

export default Dashboard