import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../style/Button';
import Input from '../style/Input';
import Selector from '../components/Selector';
import SongPage from './SongPage';

const LargeSelector = styled(Selector)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: 1.25em;
`;

const InputContainer = styled.div`
  margin: 1em auto;
  text-align: center;
  font-size: 1em;
`;

const OptionInput = styled(Input)`
  fontSize: 1em;
  width: 80%;
  max-width: 30em;
`;

export default class HomePage extends React.Component {
  static propTypes = {
    travelToPage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.inputOptions = {
      YouTube: {
        type: 'text',
        placeholder: 'YouTube URL or ID'
      },
      File: {
        type: 'file',
        placeholder: 'Song File',
        accept: 'audio/*'
      },
      URL: {
        type: 'text',
        placeholder: 'URL'
      }
    };

    this.inputValue = '';

    this.state = {
      selectedInput: 'YouTube'
    };
  }

  onInputTypeSelected(selectedInput) {
    this.inputValue = '';
    this.setState({
      selectedInput: selectedInput
    });
  }

  onInputChanged(event) {
    this.inputValue = this.state.selectedInput === 'File' ? event.target.files[0] : event.target.value;
  }

  travel() {
    if (this.inputValue === '')
      return;

    this.props.travelToPage(SongPage, {
      inputType: this.state.selectedInput,
      input: this.inputValue
    });
  }

  render() {
    return (
      <div>
        <LargeSelector options={['YouTube', 'File', 'URL']} onSelect={this.onInputTypeSelected.bind(this)} />
        <InputContainer>
          <OptionInput
            onChange={event => this.onInputChanged(event)}
            {...this.inputOptions[this.state.selectedInput]}
          />
        </InputContainer>
        <center>
          <Button style={{ fontSize: '1.5em' }} onClick={this.travel.bind(this)}>Go</Button>
        </center>
      </div>
    );
  }
}
