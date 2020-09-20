import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import { v4 as uuidv4 } from 'uuid';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0, name: 'wine', price: 12 },
      { id: 2, value: 0, name: 'beer', price: 16 },
      { id: 3, value: 0, name: 'whisky', price: 22 },
      { id: 4, value: 0, name: 'rum', price: 23 }
    ],
    formErrors: {
      name: '',
      price: ''
    }
    // counters: []
  };

  handleSubmit = e => {
    e.preventDefault();

    if(formValid(this.state)) {
      console.log('GREAT SUCCESS');
    } else {
      console.log('POOP');
    }
  }


  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 1 ? "Item needs a name" : "";
        break;
      case "price":
        formErrors.price =
        value.length > 8 ? "Item is too pricey" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counters[index] };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counters[index] };
    counters[index].value--;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  handleAddItem = (e) => {
    e.preventDefault();

    const newItem = {
      id: uuidv4(),
      value: 0,
      name: e.target.name.value,
      price: e.target.price.value
    };

    this.setState({
      counters: [...this.state.counters, newItem]
    });
  };


  handleTotalPrice = () => {
    const yo = this.state.counters.reduce((a, b) => ({price: a.price + b.price}));
    console.log('yo', yo);
    return yo;
  };

  handleRestart = () => {
    window.location.reload();
  };

  render() {

    const { formErrors } = this.state;
    
    return (
      <div>
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
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
              onChange={this.handleChange}>
            </input>
            {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.price}</span>
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
              placeholder="7.25"
              onChange={this.handleChange}>
            </input>
            {formErrors.price.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
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
            onAddItem={this.handleAddItem}
            totalPrice={this.handleTotalPrice}
          />



        <div>
          Total Items: 
        </div>
        <div>
          {/* Total Price: {totalPrice} */}
        </div>
        {/* <button onClick={}>
          yoyoyo
        </button> */}

        </main>
      </div>
    );
  }
}

export default App;
