import React, { Component } from "react";
import NavBar from "./navbar";
import Counters from "./counters";
import { v4 as uuidv4 } from "uuid";
import { loadCounters, saveCounters } from "../localstorage";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class Main extends Component {
  componentWillMount() {
    var data = loadCounters();
    this.setState({ counters: data });
  }

  state = {
    counters: [],
    formErrors: {
      name: "",
      price: "",
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      formValid(this.state) &&
      e.target.name.value.length > 0 &&
      e.target.price.value.length > 0
    ) {
      const newItem = {
        id: uuidv4(),
        value: 0,
        name: e.target.name.value,
        price: parseInt(e.target.price.value),
      };

      saveCounters([...this.state.counters, newItem]);
      this.setState({
        counters: [...this.state.counters, newItem],
      });
    } else {
      console.error("Invalid Form");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name = value.length < 1 ? "Item needs a name" : "";
        break;
      case "price":
        formErrors.price = value.length < 1 ? "Item needs a price" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counters[index] };
    counters[index].value++;
    this.setState({ counters });
    saveCounters(counters);
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counters[index] };
    counters[index].value--;
    this.setState({ counters });
    saveCounters(counters);
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
    saveCounters(counters);
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    saveCounters(this.state.counters.filter((c) => c.id !== counterId));
    this.setState({ counters });
  };

  totalCost = (counters) => {};

  handleRestart = () => {
    window.location.reload();
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
          counters={this.state.counters}
        />
        <main className="container">
          <form onSubmit={this.handleSubmit} noValidate>
            <div>
              <label> Add Item Name </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Wine"
                onChange={this.handleChange}
              ></input>
              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>
            <div>
              <label> Add Item Price </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1"
                placeholder="7"
                onChange={this.handleChange}
              ></input>
              {formErrors.price.length > 0 && (
                <span className="errorMessage">{formErrors.price}</span>
              )}
            </div>
            <button type="submit"> Submit Item </button>
          </form>

          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onRestart={this.handleRestart}
          />

          <div>
            Total Items:{" "}
            {this.state.counters.reduce((a, b) => a + (b["value"] || 0), 0)}
          </div>
          <div>
            Total Price: $
            {this.state.counters
              .filter((counter) => counter.value !== 0)
              .reduce((a, b) => a + (b["value"] * b["price"] || 0), 0)}
          </div>
        </main>
      </div>
    );
  }
}

export default Main;
