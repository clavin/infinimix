import * as React from 'react';
import styled from 'styled-components';
import styles from '../style/';

import ContentWidth from '../style/ContentWidth';
import Link from '../style/Link';

const Footer = styled.div`
  background-color: ${styles.color.background.footer};
  color: ${styles.color.text.faded};
  margin: 1rem 0;

  & > div {
    margin: 0 auto;
    padding: 2rem 1rem;
  }
`;

export default () => (
  <Footer>
    <ContentWidth>
      Made by Calvin Watford. <Link href='https://github.com/clavin/infinimix'>Open Source on GitHub.</Link>
    </ContentWidth>
  </Footer>
);
