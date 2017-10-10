import * as React from 'react';
import { MemoryRouter, Route } from 'react-router';

import Footer from './Footer';
import Header from './Header';

import ContentWidth from '../style/ContentWidth';

import HomePage from '../pages/HomePage';

import '../style/global';

export default () => (
  <MemoryRouter>
    <div>
      <Header />
      <ContentWidth>
        <Route path='/' component={HomePage} />
      </ContentWidth>
      <Footer />
    </div>
  </MemoryRouter>
);
