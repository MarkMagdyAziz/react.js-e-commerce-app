import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "./Navbar";
import ProductDetails from "./ProductDetails";
import ShoppingCart from "./ShoppingCart";
import NotFound from "./NotFound";
import Menu from "./Menu";
import Login from "./Login";
import Admin from "./Admin";
import ProductForm from "./ProductForm";
import Home from "./Home";

class App extends Component {
  state = { products: [] };
  async componentDidMount() {
    let { data } = await axios.get("http://localhost:3000/products/");
    this.setState({ products: data });
    // const promise = fetch("https://jsonplaceholder.typicode.com/posts/")
    //   .then((res) => res.json())
    //   .then((data) => console.log("data", data));
  }
  handleDelete = async (product) => {
    const oldPorducts = { ...this.state.products };
    // clone State
    // edit
    const products = this.state.products.filter((p) => p.id !== product.id);
    // setState
    this.setState({ products });
    try {
      // Call backend
      await axios.delete("http://localhost:3000/products/21" + product.id);
    } catch (e) {
      toast.error("cannot delete", e);
      this.setState({ products: oldPorducts });
    }
  };
  handleReset = async () => {
    // clone
    let products = [...this.state.products];
    // edit
    products = products.map((product) => {
      product.count = 0;
      return product;
    });

    // setState
    this.setState({ products });
  };
  handleOnIncrement = async (product) => {
    const oldPorducts = [...this.state.products];
    // clone
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };

    // edit
    products[index].count++;
    // setState

    this.setState({ products });

    // //EDIT & set object
    const obj = {
      count: product.count + 1,
      id: product.id,
      isInCart: products[index].isInCart,
      name: product.name,
      price: product.price,
    };
    //EDIT
    // const obj = { ...this.state, count: 0, isInCart: false };
    console.log("products", obj);
    // Call backend & set new product
    try {
      await axios.put(`http://localhost:3000/products/${product.id}`, obj);
    } catch (error) {
      toast.error("cannot increment", error);
      this.setState({ products: oldPorducts });
    }
  };
  inCartChangeHandler = async (product) => {
    // clone
    const oldPorducts = { ...this.state.products };
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    // edit
    products[index].isInCart = !products[index].isInCart;
    // set State
    this.setState({ products });
    //___________________________________________

    //EDIT & set object
    const obj = {
      count: product.count,
      id: product.id,
      isInCart: products[index].isInCart,
      name: product.name,
      price: product.price,
    };

    console.log("obj", obj);
    // Call backend & set new product
    try {
      await axios.put(`http://localhost:3000/products/${product.id}`, obj);
    } catch (error) {
      toast.error("cannot delete", error);
      this.setState({ products: oldPorducts });
    }
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar
          productsCount={this.state.products.filter((p) => p.isInCart).length}
        />
        <main className="container">
          <Switch>
            <Route
              path="/products/:id/:name?"
              render={(props) => (
                <ProductDetails products={this.state.products} {...props} />
              )}
            />
            <Route
              path="/productform/:id"
              render={(props) => (
                <ProductForm {...props} products={this.state.products} />
              )}
            />
            <Route
              path="/admin"
              render={(props) => (
                <Admin
                  products={this.state.products}
                  inCartChangeHandler={this.inCartChangeHandler}
                  {...props}
                  onDelete={this.handleDelete}
                />
              )}
            />
            <Route path="/login" component={Login} />
            <Route
              path="/cart"
              render={(props) => (
                <ShoppingCart
                  products={this.state.products}
                  onDelete={this.handleDelete}
                  onIncrement={this.handleOnIncrement}
                  onReset={this.handleReset}
                  {...props}
                />
              )}
            />
            <Route path="/notfound" component={NotFound} />
            <Route
              path="/menu"
              render={(props) => (
                <Menu
                  {...props}
                  products={this.state.products}
                  inCartChangeHandler={this.inCartChangeHandler}
                />
              )}
            />
            <Route path="/home" component={Home} />
            <Redirect from="/" to="/home" />
            <Redirect to="/notfound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
