import React from "react";
import {
  NavLink
} from "react-router-dom";
import logo from './images/Account.jpg';

class Account extends React.Component {
    constructor(props) {
        super();

        this.state = {
          totalTransactions: 0,
          transactions: []
          };

// -----------Test data-----------------
//        this.state = {
//          account_number: props.match.params.account_number,
//          totalTransactions: 4,
//          transactions: [
//            { account_number: 10001 , transaction_id: 90001, merchant_name: 'Costco', transaction_amount: 126.56, transaction_date:'2020-10-29T04:49:06.895321Z', transaction_category:'GROCERIES' },
//            { account_number: 10001 , transaction_id: 90002, merchant_name: 'BestBuy', transaction_amount: 500, transaction_date:'2020-10-29T04:49:06.895321Z', transaction_category:'ELECTRONICS' },
//            { account_number: 10001 , transaction_id: 90003, merchant_name: 'Shell', transaction_amount: 26.78, transaction_date:'2020-10-29T04:49:06.895321Z', transaction_category:'GAS' },
//            { account_number: 10001 , transaction_id: 90004, merchant_name: 'Subway', transaction_amount: 6.78, transaction_date:'2020-10-29T04:49:06.895321Z', transaction_category:'FOOD_AND_DRINKS' }
//         ]
//        };
    }

    async componentDidMount() {
        const url = 'http://127.0.0.1:8000/transactions/?account_number=' + this.props.match.params.account_number;
        const response = await fetch(url);
        const data = await response.json();
        this.setState(
        { totalTransactions: data.count,
          transactions: data.results
        });
      }

    async onTransactionCategoryChanged(e){
        var transaction_ref = e.target.getAttribute("data-transaction-ref");
        var merchant_name = e.target.getAttribute("data-merchant-name-ref");
        var account_number = e.target.getAttribute("data-account-number-ref");

        var body = {
            "account_number":account_number,
            "merchant_name": merchant_name,
            "transaction_category": e.target.value
        };

        // Update: Transaction Category
        const optionsParentTransaction = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        const putUrl = 'http://127.0.0.1:8000/transactions/' + transaction_ref + "/";
        var response = await fetch(putUrl, optionsParentTransaction);
        await response.json();

        // Reload Page
        window.location.reload(false);
    }

  renderHeader() {
      let header = ['Transaction ID', 'Merchant Name','Transaction Amount','Transaction Date','Transaction Category', 'Split Transaction?']
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  renderData() {
      return this.state.transactions.map((transaction, i) => {
        return (
                <tr key={transaction.transaction_id}>
                  <td>{transaction.transaction_id}</td>
                  <td>{transaction.merchant_name}</td>
                  <td>{transaction.transaction_amount}</td>
                  <td>{transaction.transaction_date}</td>
                  <td>
                      <select id="transaction_category" value={transaction.transaction_category} data-transaction-ref={transaction.transaction_id} data-account-number-ref={this.props.match.params.account_number} data-merchant-name-ref={transaction.merchant_name} onChange={this.onTransactionCategoryChanged}>
                          <option value="GROCERIES">GROCERIES</option>
                          <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                          <option value="HOME">Home and Decor</option>
                          <option value="FOOD_AND_DRINKS">Food and Drinks</option>
                          <option value="ELECTRONICS">Electronics</option>
                          <option value="PERSONAL">Personal</option>
                          <option value="HEALTH">Health and Wellness</option>
                          <option value="GAS">Gas</option>
                          <option value="SHOPPING">Shopping</option>
                          <option value="GIFT_AND_DONATION">Gift and Donations</option>
                          <option value="OTHERS">Others</option>
                      </select>
                  </td>
                  <td><NavLink to={"/SplitTransaction/" + this.props.match.params.account_number + "/" + transaction.transaction_id + "/" + transaction.transaction_category + "/" + transaction.merchant_name}>Split Transaction</NavLink></td>
                </tr>
               )
      })
  }

  render() {
         return (
         <div>
            <ul className="header">
              <li><NavLink to="/Dashboard">Dashboard</NavLink></li>
            </ul>
            <div style={{color: "#008080", fontSize: "11px"}}>Account Number: {this.props.match.params.account_number}
                <h1 id='title'><img src={logo} alt="My Account" className="image-container"/>Total Transactions: {this.state.totalTransactions}</h1>
            </div>
            <table className='tableList'>
               <tbody>
                <tr>{this.renderHeader()}</tr>
                    {this.renderData()}
               </tbody>
            </table>
         </div>
      );
  }
}

export default Account;