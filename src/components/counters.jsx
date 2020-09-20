import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {

  render() {

    const {
      onReset,
      onIncrement,
      onDelete,
      onDecrement,
      counters,
      onRestart,
      // onAddItem,
      // totalPrice
    } = this.props;

    return (
      <div>
        <button
          className="btn btn-success m-2"
          onClick={onReset}
          disabled={counters.length === 0 ? "disabled" : ""}
        >
          <i className="fa fa-refresh" aria-hidden="true" />
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={onRestart}
          disabled={counters.length !== 0 ? "disabled" : ""}
        >
          <i className="fa fa-recycle" aria-hidden="true" />
        </button>
{/* 
        <form onSubmit={(e) => {onAddItem(e)}}>
          <div>
            <label> Add Item Name </label>
            <input 
              id="name"
              name="name" 
              type="text" 
              placeholder="Wine">
            </input>
          </div>
          <div>
            <label> Add Item Price </label>
            <input 
              id="price"
              name="price" 
              type="number" 
              min="0"
              step="1"
              placeholder="7.25">
            </input>
          </div>
          <button type="submit"> Submit Item </button>
        </form> */}


        {counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
            name={counter.name}
            price={counter.price}
          />
        ))}
      </div>
    );
  }

}



export default Counters;
