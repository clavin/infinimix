import * as React from 'react';
import styled from 'styled-components';

import Button from '../style/Button';
import { Heading, Paragraph } from '../style/typography';

// tslint:disable-next-line:variable-name
const PageBody = styled.div`
    text-align: center;
`;

/** Outlines the components for a Not Found message. */
interface INotFoundMessage {
    title: string;
    body: string;
}

/** A list of messages that can show up when rendering this page. */
const messages: INotFoundMessage[] = [
    {
        title: 'It seems you\'re lost.',
        body: 'How about we head home?'
    },
    {
        title: 'Huh...',
        body: 'I Don\'t Think We\'re in Kansas Anymore, Toto...'
    },
    {
        title: 'IT\'S A 404!',
        body: 'I REPEAT, WE HAVE A CODE 404!'
    },
    {
        title: 'I have no idea where we are...',
        body: 'And I have less of an idea how we got here.'
    },
    {
        title: 'We\'re lost.',
        body: 'Send help. Or just go home.'
    },
    {
        title: 'Not Found',
        body: '¯\\_(ツ)_/¯'
    }
];

export default () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return (
        <PageBody>
            <Heading>404 - {randomMessage.title}</Heading>
            <Paragraph>{randomMessage.body}</Paragraph>
        </PageBody>
    );
};
