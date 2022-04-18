import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProductView from "./ProductView";
import Button from "./Button";

import productData from "../assets/fake-data/products";

import { moveModalAction } from "../redux/actions/ProductModalAction";

const ProductModalView = () => {
  const dispatch = useDispatch();

  const productSlug = useSelector((state) => state.ProductModalReducer.value);

  const [product, setProduct] = useState(undefined);

  // const product = productData.getProductBySlug("ao-thun-dinosaur-02");

  useEffect(() => {
    setProduct(productData.getProductBySlug(productSlug));
  }, [productSlug]);

  return (
    <div
      className={`product-view__modal ${product === undefined ? "" : "active"}`}
    >
      <div className="product-view__modal__content">
        <ProductView product={product} />
        <div className="product-view__modal__content__close">
          <Button size="sm" onClick={() => dispatch(moveModalAction())}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModalView;
