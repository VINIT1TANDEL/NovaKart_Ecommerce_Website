import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg"
import "./Home.css"
import ProductCard from "./ProductCard.js"
import MetaData from '../layout/MetaData.js';
import {  clearErrors,getProduct } from '../../actions/productAction.js';
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from "react-alert"


const Home = () => {
  const alert=useAlert()
  const dispatch=useDispatch();
  const {loading,error,products,productsCount}=useSelector(state=>state.products);
  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(clearErrors());
    }
      dispatch(getProduct());
  },[dispatch,error,alert])
    return <Fragment>
      { loading ? <Loader/> :  <Fragment>
         <MetaData title="NovaKart"/>
         <div className="banner">
  <p>Welcome to NovaKart</p>
  <h1>EXPLORE OUR BEST PRODUCTS</h1>
  <a href="#container">
    <button>
      Scroll <CgMouse />
    </button>
  </a>
</div>
<h2 className="homeHeading">Top Picks for You</h2>

        <div className="container" id="container">
        {products &&
              products.map((product) => (
                <ProductCard product={product}/>
              ))}
        
        </div>
        </Fragment>}
    </Fragment>
      

}

export default Home;
