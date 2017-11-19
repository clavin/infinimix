import styled from 'styled-components';
import styleVars from './vars';

interface ITextInputProps {
    block?: boolean;
    center?: boolean;

    bgColor?: string;
    textColor?: string;

    fontSize?: string;
}

/** A stylized input element of type `"text"`, with a few configurable aspects. */
export default styled.input`
    background-color: ${(props: ITextInputProps) => props.bgColor || styleVars.color.shaded};
    color: ${(props: ITextInputProps) => props.textColor || styleVars.color.white};
    border: none;
    outline: none !important;

    font-family: inherit;
    font-size: ${(props: ITextInputProps) => props.fontSize || 'inherit'};
    font-weight: inherit;

    ${(props: ITextInputProps) => props.block ? 'display: block;' : ''}
    ${(props: ITextInputProps) => props.center ? 'margin: 1.5em auto;' : 'margin: 1.5em 0.5em;'}

    height: 1em;
    padding: 0.5em;
`;
