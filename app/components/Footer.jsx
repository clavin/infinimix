import * as React from 'react';
import styled from 'styled-components';

import styles from '../style/';

const Footer = styled.footer`
  color: ${styles.color.text.faded};

  & > span.emoji-heart {
    filter: grayscale(75%);
  }

  &:hover {
    & > span.emoji-heart {
      filter: grayscale(0%);
    }
  }
`;

export default () => (
  <Footer>
    Made with <span className='emoji-heart'>❤</span> by Calvin Watford.
  </Footer>
);
