import React from "react";
import { useHistory } from "react-router-dom";

const Admin = (props) => {
  const history = useHistory();

  return (
    <div>
      <h1>Admin</h1>
      <button
        className="btn-primary btn m-2 "
        onClick={() => history.push(`/productform/new`)}
      >
        Add
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <i
                  className="fas fa-edit"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    props.history.push(`productform/${product.id}`)
                  }
                ></i>
              </td>
              <td>
                <i
                  className="fas fa-trash"
                  style={{ cursor: "pointer" }}
                  onClick={() => props.onDelete(product)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
