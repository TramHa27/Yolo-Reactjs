import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./Header";
import Footer from "./Footer";

import ProductModalView from "./ProductModalView";

import Routes from "../routes/Routes";

const Layout = () => {
  return (
    <BrowserRouter>
      <Route
        render={(props) => {
          return (
            <div>
              <ToastContainer />
              <Header {...props} />
              <div className="container">
                <div className="main">
                  <Routes />
                </div>
              </div>
              <Footer />
              <ProductModalView />
            </div>
          );
        }}
      />
    </BrowserRouter>
  );
};

export default Layout;
