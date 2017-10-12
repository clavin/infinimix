import styled from 'styled-components';
import styles from './';

export default styled.a`
  color: ${styles.color.text.highlight};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
