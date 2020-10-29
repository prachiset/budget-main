import React from "react";
import {
  NavLink
} from "react-router-dom";
import logo from './split.png';

class SplitTransaction extends React.Component {
    constructor(props) {
        super();

        this.state = {
          parentTransaction: {
            parent_transaction_id: props.match.params.parent_transaction_id,
            split_transactions_exist: false
          },
          firstSplitTransaction: {
            parent_transaction_id: props.match.params.parent_transaction_id,
            merchant_name: props.match.params.parent_transaction_merchant_name,
            transaction_amount: 0,
            transaction_category: ''
          },
          secondSplitTransaction: {
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

    onSplitTransactionSaveClicked(e){
        e.preventDefault();

        alert(this.state.firstSplitTransaction.transaction_amount);
        alert(this.state.firstSplitTransaction.transaction_category);

        alert(this.state.secondSplitTransaction.transaction_amount);
        alert(this.state.secondSplitTransaction.transaction_category);


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
                          <option value="ELECTRONICS">ELECTRONICS</option>
                          <option value="GAS">GAS</option>
                          <option value="FOOD_AND_DRINKS">FOOD_AND_DRINKS</option>
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
                          <option value="ELECTRONICS">ELECTRONICS</option>
                          <option value="GAS">GAS</option>
                          <option value="FOOD_AND_DRINKS">FOOD_AND_DRINKS</option>
                      </select>
                  </td>
                </tr>
               )
  }

  render() {
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

export default SplitTransaction;