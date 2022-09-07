import React, { Component } from "react";
import { Link } from "react-router-dom";

class Product extends Component {
  /*
  //1- first solution
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  componentWillUnmount() {
    console.log(" componentWillUnMount => Product");
  }
*/
  render() {
    const { product, onDelete, onIncrement } = this.props;
    const classes =
      this.props.product.count === 0
        ? "badge badge-warning m-2"
        : "badge badge-primary m-2";

    return (
      <div className="row">
        <div className="col-2">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </div>
        <div className="col">
          <span className={classes}>{product.count} </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onIncrement(product)}
          >
            +
          </button>
          <span style={{ cursor: "pointer" }} onClick={() => onDelete(product)}>
            <i className="fas fa-trash m-2"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default Product;
