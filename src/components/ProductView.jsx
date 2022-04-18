import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";

import { addItem } from "../redux/actions/ShoppingCartAction";

import Button from "../components/Button";

import numberWithCommas from "../utils/numberWithCommas";

const ProductView = (props) => {
  const dispatch = useDispatch();

  let { product } = props;

  if (product === undefined)
    product = {
      title: "",
      price: "",
      image01: null,
      image02: null,
      categorySlug: "",
      colors: [],
      slug: "",
      size: [],
      description: "",
    };

  const notify = () => toast.error("Vui lòng chọn màu sắc và kích thước!");

  const notifySuccess = () => toast.success("Thêm vào giỏ hàng thành công");

  const notifyColor = () => toast.error("Vui lòng chọn màu sắc!");

  const notifySize = () => toast.error("Vui lòng chọn kích thước!");

  const [previewImg, setPreviewImg] = useState(product.image01);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);

  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const [showAlert, setShowAlert] = useState();

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.image01);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
  }, [product]);

  const check = () => {
    if (color === undefined && size === undefined) {
      setShowAlert(notify());
      return false;
    }
    if (color === undefined) {
      setShowAlert(notifyColor());
      return false;
    }
    if (size === undefined) {
      setShowAlert(notifySize());
      // alert("Vui lòng chọn kích cỡ");
      return false;
    }
    return true;
  };

  const addToCart = () => {
    if (check()) {
      let newItem = {
        slug: product.slug,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        setShowAlert(notifySuccess());
      } else {
        alert("Fail");
      }
    }
  };

  const goToCart = () => {
    if (check()) props.history.push("/cart");
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image01)}
          >
            <img src={product.image01} alt={product.image01} />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image02)}
          >
            <img src={product.image02} alt={product.image02} />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt={previewImg} />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>

      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(product.price)}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => {
              return (
                <div
                  className={`product__info__item__list__item ${
                    color === item ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => setColor(item)}
                >
                  <div className={`circle bg-${item}`}></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product.size.map((item, index) => {
              return (
                <div
                  className={`product__info__item__list__item ${
                    size === item ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => setSize(item)}
                >
                  <span className="product__info__item__list__item__size">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={() => addToCart()}>Thêm vào giỏ</Button>
          <Button onClick={() => goToCart()}>Mua ngay</Button>
        </div>
        <div
          className={`product-description mobile ${
            descriptionExpand ? "expand" : ""
          }`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
