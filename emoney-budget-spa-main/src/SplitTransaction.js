import React from "react";
import {
  NavLink
} from "react-router-dom";
import logo from './split.png';

class SplitTransaction extends React.Component {
    constructor(props) {
        super();

        this.state = {
          //props.match.params.parent_transaction_id,
          splitTransaction1TransactionAmount: 0,
          splitTransaction1TransactionCategory: '',

          splitTransaction2TransactionAmount: 0,
          splitTransaction2TransactionCategory: '',
        };

        this.onSplitTransaction1AmountChanged = this.onSplitTransaction1AmountChanged.bind(this);
        this.onSplitTransaction1CategoryChanged = this.onSplitTransaction1CategoryChanged.bind(this);

        this.onSplitTransaction2AmountChanged = this.onSplitTransaction2AmountChanged.bind(this);
        this.onSplitTransaction2CategoryChanged = this.onSplitTransaction2CategoryChanged.bind(this);

        this.onSplitTransactionSaveClicked = this.onSplitTransactionSaveClicked.bind(this);
    }

    onSplitTransaction1AmountChanged(e) {
        this.setState({ splitTransaction1TransactionAmount: e.target.value });
    }

    onSplitTransaction1CategoryChanged(e){
        this.setState({ splitTransaction1TransactionCategory: e.target.value });
    }


    onSplitTransaction2AmountChanged(e) {
        this.setState({ splitTransaction2TransactionAmount: e.target.value });
    }

    onSplitTransaction2CategoryChanged(e){
        this.setState({ splitTransaction2TransactionCategory: e.target.value });
    }

    onSplitTransactionSaveClicked(e){

    }

  renderHeader() {
      let header = ['Merchant Name','Transaction Amount','Transaction Category']
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  renderRowData1() {
            return (
                <tr>
                  <td>{this.props.match.params.parent_transaction_merchant_name}</td>
                  <td><input type="text" value={this.state.splitTransaction1TransactionAmount} onChange={this.onSplitTransaction1AmountChanged}/></td>
                  <td>
                      <select value={this.state.splitTransaction1TransactionCategory} onChange={this.onSplitTransaction1CategoryChanged}>
                          <option value="GROCERIES">GROCERIES</option>
                          <option value="ELECTRONICS">ELECTRONICS</option>
                          <option value="GAS">GAS</option>
                          <option value="FOOD_AND_DRINKS">FOOD_AND_DRINKS</option>
                      </select>
                  </td>
                </tr>
               )
  }

    renderRowData2() {
            return (
                <tr>
                  <td>{this.props.match.params.parent_transaction_merchant_name}</td>
                  <td><input type="text" value={this.state.splitTransaction2TransactionAmount} onChange={this.onSplitTransaction2AmountChanged}/></td>
                  <td>
                      <select value={this.state.splitTransaction2TransactionCategory} onChange={this.onSplitTransaction2CategoryChanged}>
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
                    {this.renderRowData1()}
                    {this.renderRowData2()}
               </tbody>
            </table>
            <button type="submit" onClick={this.onSplitTransactionSaveClicked}>Save</button>
         </div>
      );
  }
}

export default SplitTransaction;