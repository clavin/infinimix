import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import styled from 'styled-components';
import styleVars from '../style/vars';

import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

// tslint:disable:variable-name
const Header = styled.header`
    background-color: ${styleVars.color.shallowDark};

    text-align: center;

    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    width: 100%;
    height: 5em;

    > div > a {
        color: inherit;

        font-family: 'Righteous', cursive;
        font-size: 2.5em;
        letter-spacing: 0.5em;
        text-decoration: none;

        margin-right: -0.5em;
    }
`;

const Footer = styled.footer`
    background-color: ${styleVars.color.deepDark};
    color: ${styleVars.color.dullLight};

    text-align: center;

    padding: 2em 0;
`;

const ContentArea = styled.div`
    ${styleVars.breakpoints.small`
        width: 95%;
        min-width: 20em;
        margin: 1em auto;
    `}
    ${styleVars.breakpoints.medium`
        width: 90%;
        margin: 1.5em auto;
    `}
    ${styleVars.breakpoints.large`
        width: 80%;
        max-width: 50em;
        margin: 2em auto;
    `}
`;
// tslint:enable:variable-name

/** Sets up the generic structure of all pages (header, footer, routing). */
export default () => (
    <div>
        <Header>
            <div>
                <Link to="/">infinimix</Link>
            </div>
        </Header>
        <ContentArea>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </ContentArea>
        <Footer>
            Created by Calvin Watford.
        </Footer>
    </div>
);
