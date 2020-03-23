import React from 'react';
import { connect } from 'react-redux';
import { INCREMENT } from './actions/actionTypes';

/**
 * This class acts as a temporary template on how redux should be used and how to lay it out when
 * Redux is implemented into Pokematic. Please delete this when no longer needed.
 */
class Counter extends React.Component {
  
  render() {
      console.log(this.props);
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <span>{this.props.count}</span>
          <button onClick={this.props.increment}>+</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
      increment: () => {
        dispatch({type: INCREMENT})
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Counter);