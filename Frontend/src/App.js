import './App.css';
import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Footer/Footer.js"
import Home from "./components/Home/Home.js"
import WebFont from "webfontloader"
import { BrowserRouter as Router ,Route, Routes} from 'react-router-dom';
import React from 'react';
import Loader from './components/layout/Loader/Loader.js';
import  ProductDetails from "./components/Product/ProductDetails.js"
import Products from "./components/Product/Products.js"
import Search from "./components/Product/Search.js"
import LoginSignUp from './components/User/LoginSignUp.js';
import store from "./store.js"
import { loadUser } from './actions/userAction.js';
import UserOptions from "./components/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./components/User/Profile.js";
import ProtectedRoute from './components/Route/ProtectedRoute.js';
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UsersList from "./components/Admin/UsersList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReviews from "./components/Admin/ProductReviews.js";


function App() {

  const {isAuthenticated,user}=useSelector((state)=>state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
     const { data } = await axios.get(
      "https://backend-9-ngeu.onrender.com/api/v1/stripeapikey",
      { withCredentials: true }
    );
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  },[])
  return <Router>
    <Header />
    { isAuthenticated && <UserOptions user={user}/>}
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/search/:keyword' element={<Products />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
   

    
{/* <Routes><Route exact path='/products/:id'  Component={ProductDetails}/> </Routes> */}
<ProtectedRoute exact path="/login/shipping" Component={Shipping} />


<ProtectedRoute exact path="/orders" component={MyOrders} />
    <ProtectedRoute exact path="/ORDERS/confirm" component={ConfirmOrder} />
{stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
<ProtectedRoute exact path="/account" Component={Profile} />
    <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
    <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
           <ProtectedRoute exact path="/success" component={OrderSuccess} />
         
          <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
           <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />

         <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        
       <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />

       <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />
          <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />
            <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />
   
    

   
    <Footer/>
  </Router>
}

export default App;
