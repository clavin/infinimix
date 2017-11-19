import { css, InterpolationValue, SimpleInterpolation, ThemedCssFunction } from 'styled-components';

/** Creates a function that renders a CSS media query for the given breakpoint spec. */
const createBreakpoint = ({ min, max }: { min?: number, max?: string | number }) => {
    const queries = [];

    if (min !== undefined) {
        queries.push(`(min-width: ${min}px)`);
    }
    if (max !== undefined) {
        queries.push(`(max-width: ${max}px)`);
    }

    return (strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]): InterpolationValue[] =>
        css`
            @media ${queries.join(' and ')} {
                ${css(strings, ...interpolations)}
            }
        `;
};

/** Breakpoint spec. */
const breakpoints = {
    small: createBreakpoint({ max: 640 }),
    medium: createBreakpoint({ min: 641, max: 1023 }),
    large: createBreakpoint({ min: 1024 })
};

/** Renders media queries for a multiple values of a single CSS property that change based on the current breakpoint. */
const breakpointProperty = (property: string, breakpointValues: { [name: string]: string }): InterpolationValue[] =>
    css`${Object.keys(breakpointValues)
        .map((name: string) => breakpoints[name]`${property}: ${breakpointValues[name]}`)}`;

/** Styling variables. */
export default {
    /** Color varaibles. */
    color: {
        deepDark: '#000812',
        shallowDark: '#000f1d',
        dark: '#001527',
        shaded: '#023858',
        medium: '#118abe',
        tinted: '#65daff',
        light: '#bae9ff',
        white: '#ffffff',

        dullLight: '#607d94'
    },

    /** Breakpoints and functions that render media queries for each breakpoint. */
    breakpoints,

    /** Renders multiple values of a property that changes based on the current breakpoint. */
    breakpointProperty
};
