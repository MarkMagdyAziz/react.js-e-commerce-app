import React from "react";
import Cart from "./Cart";

const Menu = (props) => {
  //console.log("this.props Menu", props.product);
  // const [cart, setCart] = React.useState(false);

  return (
    <React.Fragment>
      <h1>Menu</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <Cart
                  inCartChangeHandler={props.inCartChangeHandler}
                  product={product}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Menu;
