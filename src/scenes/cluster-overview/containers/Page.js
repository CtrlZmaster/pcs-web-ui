import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as actions from "../actions.js"
import Page from "../components/Page.js"

const mapStateToProps = (state) => {
  return {
    cluster: state.cluster,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
