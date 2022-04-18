import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Grid from "./Grid";
import ProductCard from "./ProductCard";

const InifityList = (props) => {
  const { products } = props;

  const perLoad = 6; //items each Load

  const listRef = useRef(null);

  const [data, setData] = useState([]);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(products);
  }, [products]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          setLoad(true);
        }
      }
    });
  }, [listRef]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(products.length / perLoad);
      const maxIndex = products % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start + perLoad;
        setData(data.concat(products.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, products]);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data.map((item, index) => {
          return (
            <ProductCard
              key={index}
              img01={item.image01}
              img02={item.image02}
              name={item.title}
              price={Number(item.price)}
              slug={item.slug}
            ></ProductCard>
          );
        })}
      </Grid>
    </div>
  );
};

InifityList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default InifityList;
