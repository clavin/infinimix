import styled from 'styled-components';
import styles from '../style/';

export default styled.button`
  background: ${styles.color.button.default};
  color: ${styles.color.text.main};
  border: none;
  outline: 0;
  padding: 0.5em 1em;

  ${props => props.centered ? 'margin: 0 auto;' : ''}
`;
