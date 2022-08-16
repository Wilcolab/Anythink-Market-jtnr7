import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  UPDATE_SEARCH_FIELD,
  SUBMIT_TITLE_FILTER,
  HOME_PAGE_LOADED,
} from "../../constants/actionTypes";
import logo from "../../imgs/logo.png";

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (payload) => dispatch({ type: UPDATE_SEARCH_FIELD, payload }),
  onSearchSubmit: (title, pager, payload) =>
    dispatch({ type: SUBMIT_TITLE_FILTER, title, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
});

const Banner = (props) => {
  const handleChange = (e) => {
    const value = e.target.value;
    props.onChange(value);

    console.log(value.length);
    if (value.length >= 3) {
      console.log("hello", value.length);
      props.onSearchSubmit(
        value,
        (page) => agent.Items.byTitle(value, page),
        agent.Items.byTitle(value)
      );
    }
    if (value.length === 0) {
      const tab = "all";
      const itemsPromise = agent.Items.all;

      props.onLoad(
        tab,
        itemsPromise,
        Promise.all([agent.Tags.getAll(), itemsPromise()])
      );
    }
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <span>A place to get </span>
          <input
            id="search-box"
            type="text"
            value={props.search.title}
            onChange={handleChange}
          />
          <span>the cool stuff</span>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
