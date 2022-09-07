import React, { Component } from "react";
import Product from "./Product";

class ShoppingCart extends Component {
  /*constructor() {
    super();
    console.log("Shooping cart => constructor");
  }
  componentDidMount() {
    // call back end servers
    console.log("Shooping cart => componentDidMount");
  }
  componentDidUpdate(prevProps, prevState) {
    // compare between prev props and prev state
    console.log("Shooping cart => componentDidUpdate");
  }*/
  render() {
    return (
      <React.Fragment>
        <h1> Shopping Cart</h1>
        {this.props.products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
          />
        ))}
        <button className="btn-sm btn-danger" onClick={this.props.onReset}>
          Reset Count
        </button>
      </React.Fragment>
    );
  }
}

export default ShoppingCart;
