import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  UPDATE_SEARCH_FIELD,
  APPLY_TITLE_FILTER,
  HOME_PAGE_LOADED
} from "../../constants/actionTypes";



const mapStateToProps = (state) => ({
    ...state.search,
  });
  
const mapDispatchToProps = (dispatch) => ({
   
    onChange: (payload) => dispatch({ type: UPDATE_SEARCH_FIELD, payload }),
    onSearchSubmit: (title, pager, payload) => 
    dispatch({ type: APPLY_TITLE_FILTER, title, pager, payload}),
    onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),

});



const Search = (props) => {


    const handleChange = (e) => {
        const value = e.target.value;
        props.onChange(value);

        console.log( value.length)
        if(value.length >= 3){
            console.log("hello", value.length)
            props.onSearchSubmit(
                value,
                (page) => agent.Items.byTitle(value, page),
                agent.Items.byTitle(value)
              );
        }
        if(value.length === 0){
            const tab = "all";
            const itemsPromise = agent.Items.all;
      
            props.onLoad(
                tab,
                itemsPromise,
                Promise.all([agent.Tags.getAll(), itemsPromise()])
              );
        }
    }


return (
<div style={{display: 'flex', justifyContent:'center', gap: 20, flexWrap:"wrap"}}>
    <span>A place to get </span>
    <input id="search-box" type="text" value={props.title} onChange={handleChange} />
    <span>the cool stuff</span>
</div>
);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
