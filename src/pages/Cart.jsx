import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import productData from "../assets/fake-data/products";
import numberCommas from "../utils/numberWithCommas";

import Helmet from "../components/Helmet";
import Button from "../components/Button";
import CartItem from "../components/CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.ShoppingCartReducer.value);

  const [cartProduct, setCartProduct] = useState(
    productData.getCartItemDetail(cartItems)
  );

  const [totalProduct, setTotalProduct] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProduct(productData.getCartItemDetail(cartItems));
    setTotalProduct(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
  }, [cartItems]);

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProduct} sản phẩm trong giỏ</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền</span>
              <span>{numberCommas(totalPrice)}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size="block">Đặt hàng</Button>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartProduct.map((item, index) => {
            return <CartItem item={item} key={index}></CartItem>;
          })}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
