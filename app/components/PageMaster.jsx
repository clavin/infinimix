import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class PageMaster extends React.Component {
  static propTypes = {
    initialPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    initialPageProps: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.travelToPage = this.travelToPage.bind(this);
    this.state = {
      page: <props.initialPage travelToPage={this.travelToPage} {...props.initialPageProps} />
    };
  }

  travelToPage(PageComponent, pageProps) {
    this.setState({
      page: <PageComponent travelToPage={this.travelToPage} {...pageProps} />
    });
  }

  render() {
    return this.state.page;
  }
}
