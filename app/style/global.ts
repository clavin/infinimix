import { injectGlobal } from 'styled-components';
import styleVars from './vars';

// Advantages of keeping the global styles in its own file rather than with the main App component:
// - Prevents multiple executions because of import caching (I hope, not going to test that because this won't be
//   imported multiple times anyway).
// - Semantic placement of global styles.
// - It's recommended by the styled-components docs when using `injectGlobal` to put the invocation in its own file.

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:200,300,400|Righteous|Kanit:300');

    body {
        background-color: ${styleVars.color.dark};
        color: ${styleVars.color.white};
        font-family: 'Montserrat', sans-serif;

        min-width: 20rem;
        margin: 0;

        ${styleVars.breakpoints.small`
            font-size: 1rem;
            font-weight: 400;
        `}
        ${styleVars.breakpoints.medium`
            font-size: 1.1rem;
            font-weight: 300;
        `}
        ${styleVars.breakpoints.large`
            font-size: 1.2rem;
            font-weight: 200;
        `}


        ${styleVars.breakpointProperty('font-size', {
            small: '1rem',
            medium: '1.1rem',
            large: '1.2rem'
        })}
    }
`;
