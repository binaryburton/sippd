import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ totalCounters, counters }) => {
  const filteredCounters = counters.filter((counter) => counter.value !== 0);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand">
        <i className="fa fa-shopping-cart fa-lg m-2" aria-hidden="true" />
        <span className="badge badge-pill badge-info m-2" style={{ width: 50 }}>
          {totalCounters}
        </span>
        Items
        <Link
          to={{
            pathname: "/checkout",
            state: {
              counters: { filteredCounters },
            },
          }}
        >
          <span style={{marginLeft: '1rem'}}>
            Checkout
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
