import { useState, useEffect } from "react";
import { fetchExpenses } from './expensesApi';
//Improvement - import bootstrap for error display and responsive layout.
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [expenses, setExpenses] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(true);

  //fetch api data and set expenses,error and loading
  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await fetchExpenses();
        setExpenses(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMsg(true);
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  //display if awaiting data
  if (loading) {
    return <p>Loading expenses...</p>
  }

  //display if error in fetching data
  //Improvement - use boostrap to display better
  if (errorMsg) {
    return <p>Error fetching data. Please try again later.</p>
  }

  //display expense information
  //Improvement - create a function to capitalize the first alphabet of the category and status data from api 
  //Improvement - Improve responsiveness to different screen sizes
  return (
    <div id="template-text">
      <h1>Expenses</h1>
      <div className="container">
        <div className="row header">
          <div className="column">Date</div>
          <div className="column">Merchant</div>
          <div className="column">Amount</div>
          <div className="column">Category</div>
          <div className="column">Description</div>
          <div className="column">Status</div>
        </div>
        {expenses.map(expense => (
          <div className="row" key={expense.id}>
            <div className="column">{new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div className="column">{expense.merchant}</div>
            <div className="column">£{expense.amount.toFixed(2)}</div>
            <div className="column">{expense.category}</div>
            <div className="column">{expense.description}</div>
            <div className="column">{expense.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
