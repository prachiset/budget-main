import React from "react";
import {
  NavLink
} from "react-router-dom";
import logo from './split.png';

class SplitTransaction extends React.Component {
    constructor(props) {
        super();

        this.state = {
          parentTransactionRef: props.match.params.parent_transaction_id,
          splitTransaction: {
            merchant_name: props.match.params.parent_transaction_merchant_name,
            transaction_amount:'',
            transaction_category:''
          }
        };
    }

    onSplitTransactionCategoryChanged(e){
        alert('chnaged')
    }

    onSplitTransactionSaveClicked(e){
    alert('clicked')
    }

  renderHeader() {
      let header = ['Merchant Name','Transaction Amount','Transaction Category']
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  renderData() {
        return (
                <tr>
                  <td>{this.state.splitTransaction.merchant_name}</td>
                  <td><input type="text" value={this.state.splitTransaction.transaction_amount} /></td>
                  <td>
                      <select id="transaction_category" value={this.state.splitTransaction.transaction_category} onChange={this.onSplitTransactionCategoryChanged}>
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
                    {this.renderData()}
               </tbody>
            </table>
            <button type="submit" onClick={this.onSplitTransactionSaveClicked}>Save</button>
         </div>
      );
  }
}

export default SplitTransaction;