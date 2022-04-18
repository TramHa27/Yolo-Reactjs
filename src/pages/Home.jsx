import React from "react";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import PolicyCard from "../components/PolicyCard";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";

import heroSliderData from "../assets/fake-data/hero-slider";
import policy from "../assets/fake-data/policy";
import productData from "../assets/fake-data/products";

import banner from "../assets/images/banner.png";

const Home = () => {
  return (
    <Helmet title="Trang chủ">
      {/* Hero slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={true}
        timeout={5000}
      />
      {/* End Hero Slider */}
      {/* Policy Section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => {
              return (
                <Link to="/policy" key={index}>
                  <PolicyCard
                    key={index}
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                  ></PolicyCard>
                </Link>
              );
            })}
          </Grid>
        </SectionBody>
      </Section>
      {/*End Policy Section */}

      {/*Best Seller Section */}
      <Section>
        <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProduct(4).map((item, index) => {
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
        </SectionBody>
      </Section>
      {/*End Best Seller Section  */}

      {/*New Arrival Section */}
      <Section>
        <SectionTitle>Sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProduct(8).map((item, index) => {
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
        </SectionBody>
      </Section>
      {/*End New Arrival Section  */}

      {/* Banner */}
      <Section>
        <SectionBody>
          <Link to="/catalog">
            <img src={banner} alt={banner} />
          </Link>
        </SectionBody>
      </Section>
      {/* End Banner */}

      {/*Popular Product Section */}
      <Section>
        <SectionTitle>Sản phẩm phổ biến</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProduct(12).map((item, index) => {
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
        </SectionBody>
      </Section>
      {/*End Popular Product Section */}
    </Helmet>
  );
};

export default Home;
