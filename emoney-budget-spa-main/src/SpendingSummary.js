import React, {Component} from 'react';
import {
  NavLink
} from "react-router-dom";
import Chart from 'chart.js';

// -----------Test data-----------------
//const pieData = {
//datasets: [
//  {
//    data: [63, 15, 22],
//    backgroundColor: [
//      '#98FB98',
//      '#E9967A',
//      '#40E0D0'
//    ],
//    borderWidth: 10,
//    borderColor: '#FFF',
//    hoverBorderColor: '#FFF'
//  }
//],
//labels: ['Gas', 'Groceries', 'Electronics']
//};

const options = {
    title: {
             display: true,
             text: 'Spending Summary',
             fontSize: 18,
             fontColor: '#008080'
           },
    cutoutPercentage: 50,
    responsive: true,
    tooltips: {
      backgroundColor: '#000000',
      bodyFontColor: '#FFF',
      borderColor: '#FFF',
      borderWidth: 1,
      enabled: true,
      mode: 'index'
    }
};

class SpendingSummary extends Component {
    constructor(props) {
        super();
        this.state = { };
    }

    pieChartRef = React.createRef();

    async componentDidMount() {

        const url = 'http://127.0.0.1:8000/budget/summary/?account_number=' + this.props.match.params.account_number;
        const response = await fetch(url);
        const data = await response.json();

        const category_sum_array = data.results.map(x => x.category_sum);
        const transaction_category_array = data.results.map(x => x.transaction_category);;

        const pieData = {
            datasets: [
              {
                data: category_sum_array,
                backgroundColor: [
                  '#98FB98',
                  '#E9967A',
                  '#40E0D0'
                ],
                borderWidth: 10,
                borderColor: '#FFF',
                hoverBorderColor: '#FFF'
              }
            ],
            labels: transaction_category_array
        };

        const spendingSummaryPieRef = this.pieChartRef.current.getContext("2d");

        new Chart(spendingSummaryPieRef, {
            type: "pie",
            data: pieData,
            options: options
        });
    }


    render() {
        return (
            <div>
                <ul className="header">
                    <li><NavLink to="/Dashboard">Dashboard</NavLink></li>
                </ul>
                <canvas
                    id="spendingSummaryPie"
                    ref={this.pieChartRef}
                />
            </div>
        )
    }
}
export default SpendingSummary;