import React from "react";
import {
  Route,
  NavLink,
  Switch,
  HashRouter
} from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Account from "./Account";
import SpendingSummary from "./SpendingSummary";
import SplitTransaction from "./SplitTransaction"

const NotFoundPage = () => {
  return <p>We’re sorry, something went wrong.</p>;
}

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
          isLoggedIn: false
        };
    }
render() {
    return (
      <HashRouter>
        <div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/Dashboard" component={Dashboard}/>
              <Route path="/Accounts/:account_number" component={Account}/>
              <Route path="/SplitTransaction/:parent_transaction_id/:parent_transaction_merchant_name" component={SplitTransaction}/>
              <Route path="/SpendingSummary/:account_number" component={SpendingSummary}/>
              <Route component={NotFoundPage} />
            </Switch>
          </div>

        </div>
      </HashRouter>
    );
  }
}

export default Main;