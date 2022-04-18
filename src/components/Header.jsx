import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/images/Logo-2.png";

import { useSelector } from "react-redux";

const mainNav = [
  { display: "Trang chủ", path: "/" },
  { display: "Sản phẩm", path: "/catalog" },
  { display: "Phụ kiện", path: "/accessories" },
  { display: "Liên hệ", path: "/contact" },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  const [totalProduct, setTotalProduct] = useState(0);
  const cartItems = useSelector((state) => state.ShoppingCartReducer.value);

  useEffect(() => {
    setTotalProduct(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => {
              return (
                <div
                  className={`header__menu__item header__menu__left__item ${
                    index === activeNav ? "active" : ""
                  }`}
                  key={index}
                  onClick={menuToggle}
                >
                  <Link to={item.path}>
                    <span>{item.display}</span>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    position: "absolute",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >
                  {totalProduct}
                </span>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-user"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
