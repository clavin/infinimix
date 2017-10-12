import * as React from 'react';
import styled from 'styled-components';
import styles from '../style/';

const Header = styled.header`
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  text-align: center;
  background-color: ${styles.color.background.header};
  width: 100%;
  height: 5em;
`;

const HeaderTitle = styled.a`
  font-family: 'Righteous', cursive;
  font-size: 2em;
  letter-spacing: 0.5em;
  margin-right: -0.5em; /* Get rid of the spacing after the last letter */
  color: ${styles.color.text.main};
  text-decoration: none;
`;

export default () => (
  <Header>
    <div>
      <HeaderTitle href='/'>infinimix</HeaderTitle>
    </div>
  </Header>
);
