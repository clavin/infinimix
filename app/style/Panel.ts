import styled from 'styled-components';
import styleVars from '../style/vars';

// tslint:disable:variable-name

export const PanelContainer = styled.div`
    display: flex;

    ${styleVars.breakpoints.small`
        flex-direction: column;
    `}
    ${styleVars.breakpoints.medium`
        flex-direction: row;
        justify-content: space-evenly;
    `}
    ${styleVars.breakpoints.large`
        flex-direction: row;
        justify-content: space-evenly;
    `}
`;

export const Panel = styled.div`
    text-align: center;

    flex: 1;

    ${styleVars.breakpoints.small`
        border-bottom: 1px solid ${styleVars.color.shaded};

        padding: 0.5em 0 1.5em 0;

        &:first-child {
            padding-top: 0;
        }

        &:last-child {
            border-bottom: none;

            padding-bottom: 1em;
        }
    `}
    ${styleVars.breakpoints.medium`
        border-right: 1px solid ${styleVars.color.shaded};

        padding: 1em;
        padding-top: 0;

        &:last-child {
            border-right: none;
        }
    `}
    ${styleVars.breakpoints.large`
        border-right: 2px solid ${styleVars.color.shaded};

        padding: 1em;
        padding-top: 0;

        &:last-child {
            border-right: none;
        }

    `}
`;
