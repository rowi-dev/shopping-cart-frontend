import React from 'react';
import {Route, BrowserRouter as Router, Switch, BrowserRouter} from "react-router-dom";

import {PageHeader} from "./components/common/header/header";
import './App.css';
import {productlist} from "./components/productlist/productlist";
import {productcal} from "./components/productcal/productcal";






function App() {
  // prepare store



  return (
      <div >



        <BrowserRouter>
          <Router >
            <div>
              <PageHeader/>

              <Switch>
                <Route exact path="/" component={productlist }  />
                {/* <Route exact path="/home" component={productlist }  /> */}
                  <Route exact path="/product" component={productcal }  />


              </Switch>

            </div>
          </Router>
        </BrowserRouter>
      </div>
  );
}

export default App;
