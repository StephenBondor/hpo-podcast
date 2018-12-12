import React, { Component } from "react";
import { getPodcasts } from "./actions";
import { connect } from "react-redux";
// import styled from "styled-components";
// import { GlobalStyle } from "./GlobalStyle";
import { withRouter} from "react-router-dom";

class App extends Component {
  componentDidMount(){
    this.props.getPodcasts()
  }
  
  render() {
    console.log(this.props.podcasts)
    return (
      <>
        Hello from App
      </>
    );
  }
}

export default withRouter(
	connect(
		({ episodes, jsonState }) => ({ episodes, jsonState }),
		{ getPodcasts }
	)(App)
);