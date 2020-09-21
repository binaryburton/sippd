import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class checkout extends Component {
  render() {
    const { filteredCounters } = this.props.location.state.counters;

    return (
      <>
        <Link to="/" exact="true">
          <span className="btn btn-primary m-2">
            Back
          </span>
        </Link>
        <div style={checkoutContainer}>
          <h1 style={{ margin: "auto", width: "50%" }}>Your Receipt</h1>
          {filteredCounters.map((counter) => (
            <li key={counter.id}>
              {counter.name}: ${counter.price} x{counter.value}
            </li>
          ))}
          <div style={{ margin: "auto", width: "50%", marginTop: "5rem" }}>
            Your Grand Total: $
            {filteredCounters.reduce(
              (a, b) => a + (b["value"] * b["price"] || 0),
              0
            )}
          </div>
        </div>
      </>
    );
  }
}

const checkoutContainer = {
  color: "black",
  margin: "auto",
  width: "50%",
};
