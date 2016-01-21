import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Shell extends Component {
  render () {
    return (
      <div id="shell">
        <header>
          <img src="images/joraLocal.png" />
        </header>
        <section>
          <Link to="/">Home</Link>
          { ' - ' }
          <Link to="/styles">Styles</Link>
          { ' - ' }
          <Link to="/counter">Counter</Link>
        </section>
        <br />
        <section>
          {this.props.children}
        </section>
      </div>
    );
  }
}
