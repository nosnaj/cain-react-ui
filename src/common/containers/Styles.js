import React, { Component, PropTypes } from 'react';

export default class Styles extends Component {
  render () {
    return (
      <div>
        Styles
        <div>
          <ul>
            <li>
              <label>
                <input type="radio" name="radio-example" value="1" checked />
                Radio Button 1
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="radio-example" value="2" />
                Radio Button 2
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
