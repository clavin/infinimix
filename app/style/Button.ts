import styled from 'styled-components';
import styleVars from './vars';

interface IButtonProps {
    color?: string;
    depthColor?: string;

    fontSize?: string;
}

/** A button. */
export default styled.button`
    background-color: ${(props: IButtonProps) => props.color || styleVars.color.medium};
    color: #fff;
    border: none;
    border-radius: 0.25em;
    box-shadow: 0 0.25em 0 ${(props: IButtonProps) => props.depthColor || styleVars.color.shaded};
    cursor: pointer;
    outline: none !important;

    font-family: inherit;
    font-size: ${(props: IButtonProps) => props.fontSize || 'inherit'};
    font-weight: inherit;

    padding: 0.3em 0.75em;

    &:active {
        box-shadow: 0 0.15em 0 ${(props: IButtonProps) => props.depthColor || styleVars.color.shaded};
        transform: translateY(0.1em);
    }
`;
