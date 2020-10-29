import React from "react";
import {
  Redirect,
  NavLink
} from "react-router-dom";
import logo from './images/split.png';

class SplitTransaction extends React.Component {
    constructor(props) {
        super();

        this.state = {
          splitRequestCompletedSuccessfully: false,
          parentTransaction: {
            account_number: props.match.params.account_number,
            merchant_name: props.match.params.parent_transaction_merchant_name,
            parent_transaction_id: props.match.params.parent_transaction_id,
            transaction_category: props.match.params.parent_transaction_category,
            split_transactions_exist: true
          },
          firstSplitTransaction: {
            account_number: props.match.params.account_number,
            parent_transaction_id: props.match.params.parent_transaction_id,
            merchant_name: props.match.params.parent_transaction_merchant_name,
            transaction_amount: 0,
            transaction_category: ''
          },
          secondSplitTransaction: {
            account_number: props.match.params.account_number,
            parent_transaction_id: props.match.params.parent_transaction_id,
            merchant_name: props.match.params.parent_transaction_merchant_name,
            transaction_amount: 0,
            transaction_category: ''
          }
        };

        this.onFirstSplitTransactionAmountChanged = this.onFirstSplitTransactionAmountChanged.bind(this);
        this.onFirstSplitTransactionCategoryChanged = this.onFirstSplitTransactionCategoryChanged.bind(this);

        this.onSecondSplitTransactionAmountChanged = this.onSecondSplitTransactionAmountChanged.bind(this);
        this.onSecondSplitTransactionCategoryChanged = this.onSecondSplitTransactionCategoryChanged.bind(this);

        this.onSplitTransactionSaveClicked = this.onSplitTransactionSaveClicked.bind(this);
    }

    onFirstSplitTransactionAmountChanged(e) {
        var o = this.state.firstSplitTransaction;
        o.transaction_amount = e.target.value;
        this.setState({ o });
    }

    onFirstSplitTransactionCategoryChanged(e){
        var o = this.state.firstSplitTransaction;
        o.transaction_category = e.target.value;
        this.setState({ o });
    }


    onSecondSplitTransactionAmountChanged(e) {
        var o = this.state.secondSplitTransaction;
        o.transaction_amount = e.target.value;
        this.setState({ o });
    }

    onSecondSplitTransactionCategoryChanged(e){
        var o = this.state.secondSplitTransaction;
        o.transaction_category = e.target.value;
        this.setState({ o });
    }

    async onSplitTransactionSaveClicked(e){
        e.preventDefault();

        const postUrl = 'http://127.0.0.1:8000/budget/transactions/';
        const putUrl = 'http://127.0.0.1:8000/transactions/' + this.props.match.params.parent_transaction_id + "/";

        // Create: First split transaction
        const optionsFirstSplitTransaction = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.firstSplitTransaction)
        };

        var response = await fetch(postUrl, optionsFirstSplitTransaction);

        // Create: Second split transaction
        const optionsSecondSplitTransaction = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.secondSplitTransaction)
        };

        response = await fetch(postUrl, optionsSecondSplitTransaction);

        // Update: Parent transaction
        const optionsParentTransaction = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.parentTransaction)
        };

        response = await fetch(putUrl, optionsParentTransaction);

        this.setState({
              splitRequestCompletedSuccessfully: true,
            });
    }


  renderHeader() {
      let header = ['Merchant Name','Transaction Amount','Transaction Category']
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  renderFirstRowData() {
            return (
                <tr>
                  <td>{this.props.match.params.parent_transaction_merchant_name}</td>
                  <td><input type="text" value={this.state.firstSplitTransaction.transaction_amount} onChange={this.onFirstSplitTransactionAmountChanged}/></td>
                  <td>
                      <select value={this.state.firstSplitTransaction.transaction_category} onChange={this.onFirstSplitTransactionCategoryChanged}>
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
                </tr>
               )
  }

    renderSecondRowData() {
            return (
                <tr>
                  <td>{this.props.match.params.parent_transaction_merchant_name}</td>
                  <td><input type="text" value={this.state.secondSplitTransaction.transaction_amount} onChange={this.onSecondSplitTransactionAmountChanged}/></td>
                  <td>
                      <select value={this.state.secondSplitTransaction.transaction_category} onChange={this.onSecondSplitTransactionCategoryChanged}>
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
                </tr>
               )
  }

  render() {
    if(this.state.splitRequestCompletedSuccessfully === true) {
            return (<Redirect to="/Dashboard/" />);
        }
        else {
             return (
             <div>
                <ul className="header">
                  <li><NavLink to="/Dashboard">Dashboard</NavLink></li>
                </ul>
                <div style={{color: "#008080"}}><h1 id='title'><img src={logo} alt="Split Transaction" className="image-container"/></h1></div>
                <table className='tableList'>
                   <tbody>
                    <tr>{this.renderHeader()}</tr>
                        {this.renderFirstRowData()}
                        {this.renderSecondRowData()}
                   </tbody>
                </table>
                <button type="submit" onClick={this.onSplitTransactionSaveClicked}>Save</button>
             </div>
          );
      }
  }
}

export default SplitTransaction;