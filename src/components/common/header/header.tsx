import React from "react";
import { NavLink } from "react-router-dom";

import "./style.css";
import { Layout } from "antd";
const { Header } = Layout;

export class PageHeader extends React.Component {
  render() {
    return (
      /*Header Section*/
      <Layout className="layout">
        <Header>
          <NavLink
            to={"/"}
            exact={true}
            className="inactiveClass"
            activeClassName="activeClass"
          >
            Product List
          </NavLink>
          <NavLink to={"/product"} activeClassName="activeClass">
            Product Calculator
          </NavLink>
        </Header>
      </Layout>
    );
    /*Header Section*/
  }
}
