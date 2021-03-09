import React from "react";
// import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
// import BestSellers from "../components/home/BestSellers";
// import CategoryList from "../components/category/CategoryList";
// import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>
      {/* <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron text={["New Arrivals", "Best Sellers"]} />
      </div> */}

      <h4 className='text-center p3 mb-5 display-4 jumbotron'>
        Welcome to the Pacxa Store
      </h4>

      <NewArrivals />

      {/* <h4 className='text-center p3 mt-5 mb-5 display-4 jumbotron'>
        Best Sellers
      </h4>

      <BestSellers />

      <h4 className='text-center p3 mt-5 mb-5 display-4 jumbotron'>
        Categories
      </h4>

      <CategoryList />

      <h4 className='text-center p3 mt-5 mb-5 display-4 jumbotron'>
        Subcategories
      </h4> */}

      {/* <SubList /> */}
    </>
  );
};

export default Home;
