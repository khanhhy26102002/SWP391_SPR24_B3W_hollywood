import React, { Component } from 'react'

export class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'option1', // Giá trị mặc định
    };
  }

  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <label>
          <input
            type="radio"
            value="option1"
            checked={this.state.selectedOption === 'option1'}
            onChange={this.handleOptionChange}
          />
          Option 1
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="option2"
            checked={this.state.selectedOption === 'option2'}
            onChange={this.handleOptionChange}
          />
          Option 2
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="option3"
            checked={this.state.selectedOption === 'option3'}
            onChange={this.handleOptionChange}
          />
          Option 3
        </label>
      </div>
    );
  }
}
export default Radio
