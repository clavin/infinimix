import { injectGlobal } from 'styled-components';

import styles from './';

// Why is this file separate from everything else when all it does is just call a function?
//
// Because, it:
// - prevents the code from being executed multiple times due to import caching;
// - makes it easy and logical to find the global styling;
// - is recommended by the styled-components documentation.

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=PT+Sans|Righteous');

  body {
    background-color: ${styles.color.background.main};
    color: ${styles.color.text.main};
    margin: 0;
    font-family: 'PT Sans', sans-serif;
  }
`;
