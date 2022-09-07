import React, { Component } from "react";
import axios from "axios";
class ProductForm extends Component {
  state = { name: "", price: "", id: "" };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (id !== "new") {
      // get - read
      // 1- call back end
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);

      // clone
      //const state = { ...this.satate };

      // edit
      // state.name = data.name;
      // state.price = data.price;

      // setState
      // this.setState(() => {
      //   return { name: data.name, price: data.price };
      // });

      this.setState({ name: data.name });
      this.setState({ price: data.price });
      this.setState({ id: data.id });
    }
  }
  handleSubmit = async (e) => {
    console.log(" Added Item");
    e.preventDefault();

    const id = this.props.match.params.id;
    // ADD
    if (id === "new") {
      // post - create
      // clone state
      const obj = { ...this.state, count: 0, isInCart: false };
      //1- call back end => set State
      await axios.post("http://localhost:3000/products", obj);
      this.setState({ name: "", price: "" });
    } else {
      //EDIT
      const obj = { ...this.state, count: 0, isInCart: false };
      // Delete id
      delete obj.id;
      await axios.put(`http://localhost:3000/products/${this.state.id}`, obj);
    }
    this.props.history.replace("/admin");
  };
  onChangeHandler = (e) => {
    // clone
    let state = this.state;
    // edit
    state[e.currentTarget.id] = e.currentTarget.value;
    // setState
    this.setState(state);
  };
  render() {
    return (
      <div>
        <h1>{this.props.match.params.id === "new" ? "Add Product" : "Edit"}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={this.onChangeHandler}
              value={this.state.name}
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              onChange={this.onChangeHandler}
              value={this.state.price}
              type="text"
              className="form-control"
              id="price"
              placeholder="Price"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {this.props.match.params.id === "new" ? "Add" : "Edit"}
          </button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
