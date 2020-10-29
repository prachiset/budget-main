import React from "react";
import {
  NavLink
} from "react-router-dom";
import logo from './images/Accounts.jpg';

class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            totalAccounts: 0,
            accounts: []
        };

// -----------Test data-----------------
//        this.state = {
//          totalAccounts: 3,
//          accounts: [
//            { account: { account_number: 10001, account_type: 'CHECKING', account_balance: 5000 } },
//            { account: { account_number: 10002, account_type: 'CREDIT', account_balance: 400 } },
//            { account: { account_number: 10003, account_type: 'SAVINGS', account_balance: 9000 } }
//         ]
//        };
    }

    async componentDidMount() {
        const url = 'http://127.0.0.1:8000/accounts/?customer_id=1';
        const response = await fetch(url);
        const data = await response.json();
        this.setState(
        { totalAccounts: data.count,
          accounts: data.results
        });
      }

  renderHeader() {
      let header = ['Account Number', 'Account Type','Account Balance','Spending Summary']
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  renderData() {
      return this.state.accounts.map((items, i) => {
        return (
                <tr key={items.account.account_number}>
                  <td><NavLink to={"/Accounts/" + items.account.account_number}>{items.account.account_number}</NavLink></td>
                  <td>{items.account.account_type}</td>
                  <td>{items.account.account_balance}</td>
                  <td><NavLink to={"/SpendingSummary/" + items.account.account_number}>Spending Summary</NavLink></td>
                </tr>
               )
      })
  }

  render() {
  const { error, isLoaded, items } = this.state;
         return (
         <div>
            <ul className="header">
              <li><NavLink to="/Dashboard">Dashboard</NavLink></li>
            </ul>
            <h1 id='title'><img src={logo} alt="Accounts" className="image-container"/><div style={{color: "#008080"}}>Total Account(s): {this.state.totalAccounts}</div></h1>
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

export default Dashboard;