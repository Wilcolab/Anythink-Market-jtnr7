import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  UPDATE_SEARCH_FIELD,
  SUBMIT_TITLE_FILTER,
  HOME_PAGE_LOADED,
  SEARCH_GET_CLICK,
} from "../../constants/actionTypes";
import logo from "../../imgs/logo.png";
/* import { search } from "superagent"; */

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (payload) => dispatch({ type: UPDATE_SEARCH_FIELD, payload }),
  onSearchSubmit: (title, pager, payload) =>
    dispatch({ type: SUBMIT_TITLE_FILTER, title, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onClick: () => dispatch({ type: SEARCH_GET_CLICK }),
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

  const handleClick = () => {
    props.onClick();
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
          <span>
            A place to <span id="get-part" onClick={handleClick}>get</span>{" "}
          </span>
          {props.search.clicked && (
            <input
              id="search-box"
              type="text"
              value={props.search.title}
              onChange={handleChange}
            />
          )}
          <span>the cool stuff</span>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
