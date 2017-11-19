import * as React from 'react';
import styled, { keyframes, StyledComponentClass } from 'styled-components';
import styleVars from './vars';

// The indicator here was recreated from SpinKit: http://tobiasahlin.com/spinkit/

interface ILoadingProps {
    color?: string;
}

interface ILoadingBallProps {
    color?: string;
    delay: number;
}

const loadingAnim = keyframes`
    /* 0% to 80% is animated, 80% to 100% is just emptyness. */
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
`;

// tslint:disable:variable-name
const BallRow = styled.div`
    text-align: center;
`;

const Ball: StyledComponentClass<ILoadingBallProps, any> = styled.div`
    background-color: ${(props: ILoadingBallProps) => props.color || styleVars.color.medium};
    border-radius: 100%;

    animation: ${loadingAnim} 1.25s infinite ease-in-out both;
    animation-delay: ${(props: ILoadingBallProps) => props.delay}s;

    display: inline-block;
    width: 0.8em;
    height: 0.8em;
    margin: 0 0.35em
`;
// tslint:enable:variable-name

/** A loading indicator, currently implemented as a set of 3 pulsating dots. */
export default ({ color }: ILoadingProps) => (
    <BallRow>
        <Ball color={color} delay={-0.4} />
        <Ball color={color} delay={-0.2} />
        <Ball color={color} delay={0} />
    </BallRow>
);
