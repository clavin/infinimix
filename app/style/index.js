import { css } from 'styled-components';

const breakpoints = {
  small: 0,
  medium: 540,
  large: 1024
};

for (const key of Object.keys(breakpoints)) {
  const breakpoint = breakpoints[key];
  breakpoints[key] = (...args) => css`
    @media (min-width: ${breakpoint / 16}em) {
      ${css(...args)}
    }
  `;
}

/** The styling variables for the application. */
export default {
  color: {
    background: {
      main: '#181824',
      header: '#0C0C12'
    },
    text: {
      main: '#DDDDEE',
      highlight: '#00BBFF',
      faded: '#555566'
    }
  },
  breakpoints
};
