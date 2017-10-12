import * as React from 'react';
import * as PropTypes from 'prop-types';

import Song from '../audio/Song';
import SongDisplay from '../audio/SongDisplay';

export default class SongPage extends React.Component {
  static propTypes = {
    travelToPage: PropTypes.func.isRequired, // TODO: except this isn't really going to be used?
    inputType: PropTypes.oneOf(['YouTube', 'File', 'URL']).isRequired,
    input: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.song = new Song();
    this.song.addListener('progress', () => this.forceUpdate());
  }

  componentDidMount() {
    this.song.processSong(this.props.inputType, this.props.input);
  }

  render() {
    return this.song.ready
      ? (<SongDisplay song={this.song} />)
      : (<center>{this.song.status}...</center>);
  }
}
