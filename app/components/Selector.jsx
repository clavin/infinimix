import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '../style/';

const SelectorButton = styled.button`
  background-color: ${styles.color.selector.background};
  color: ${styles.color.text.main};
  border: 1px solid ${props => styles.color.selector[props.selected ? 'outline' : 'background']};
  outline: 0;
  padding: 0.5em;
  font-size: inherit;
`;

export default class Selector extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultIndex: PropTypes.number,
    onSelect: PropTypes.func,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.defaultIndex || 0
    };
    
    if (this.props.onSelect !== undefined)
      this.props.onSelect(this.props.options[this.state.selectedIndex]);
  }

  selectOption(index) {
    this.setState({
      selectedIndex: index
    });
    
    if (this.props.onSelect !== undefined)
      this.props.onSelect(this.props.options[index]);
  }

  render() {
    const buttons = this.props.options.map((opt, index) => (
      <SelectorButton
        selected={index === this.state.selectedIndex}
        key={index}
        onClick={() => this.selectOption(index)}
      >
        {opt}
      </SelectorButton>
    ));

    return (
      <div className={this.props.className}>
        {buttons}
      </div>
    );
  }
}
