import * as React from 'react';
import styled from 'styled-components';
import styles from '../style/';

import ContentWidth from '../style/ContentWidth';
import Footer from './Footer';
import Header from './Header';
import HomePage from '../pages/HomePage';
import PageMaster from './PageMaster';

import '../style/global';

const ContentArea = styled(ContentWidth)`
  background-color: ${styles.color.background.content};
  padding: 1rem;
  margin: 1rem auto;

  ${styles.breakpoints.medium`
    margin: 1.5rem auto;
  `}

  ${styles.breakpoints.large`
    margin: 2rem auto;
  `}
`;

export default () => (
  <div>
    <Header />
    <ContentArea>
      <PageMaster initialPage={HomePage} />
    </ContentArea>
    <Footer />
  </div>
);
