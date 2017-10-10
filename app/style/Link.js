import styled from 'styled-components';
import { Link } from 'react-router-dom';

import styles from './';

export default styled(Link)`
  color: ${styles.color.text.highlight};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
