import * as React from 'react';
import styled from 'styled-components';

import styles from '../style/';

const Header = styled.header`
  background-color: ${styles.color.background.header};
  width: 100%;
  height: 3rem;
`;

export default () => (
  <Header>
    TODO
  </Header>
);
