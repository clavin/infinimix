import styled from 'styled-components';
import styles from '../style/';

export default styled.input`
  background-color: ${styles.color.textArea};
  color: ${styles.color.text.main};
  border: none;
  outline: 0;
  padding: 0.75em;
  width: 10em;
  font-size: inherit;

  &::placeholder {
    color: ${styles.color.text.faded};
  }
`;
