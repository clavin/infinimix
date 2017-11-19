import * as React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import styleVars from '../style/vars';

import Button from '../style/Button';
import { Panel, PanelContainer } from '../style/Panel';
import TextInput from '../style/TextInput';
import { Heading, Paragraph } from '../style/typography';

import IClientConfig from '../IClientConfig';

/** React Props for input panels. */
interface IInputPanelProps {
    config: IClientConfig;
}

/** State for input panels. */
interface IInputPanelState {
    redirect: boolean;
    redirectData: any;
}

/** An input panel that allows a user to provide a file as input. */
export class FilePanel extends React.Component<IInputPanelProps, IInputPanelState> {
    private fileInput: HTMLInputElement;

    constructor(props: IInputPanelProps) {
        super(props);

        this.state = {
            redirect: false,
            redirectData: undefined
        };
    }

    public render(): JSX.Element {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: '/song/file',
                    state: { file: this.state.redirectData }
                }} />
            );
        }

        return (
            <Panel>
                <Heading>File</Heading>
                <Paragraph>Upload a file from your computer.</Paragraph>
                <Button onClick={() => this.fileInput.click()}>Upload File</Button>
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={(input) => { this.fileInput = input; }}
                    onChange={this.onFileInput.bind(this)}
                />
            </Panel>
        );
    }

    private onFileInput(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            redirect: true,
            redirectData: event.target.files[0]
        });
    }
}

/** An input panel that allows a user to provide a YouTube URL/ID as input. */
export class YouTubePanel extends React.Component<IInputPanelProps, IInputPanelState> {
    private textInput: HTMLInputElement;

    constructor(props: IInputPanelProps) {
        super(props);

        this.state = {
            redirect: false,
            redirectData: undefined
        };
    }

    public render(): JSX.Element {
        if (!this.props.config.mediaProxying.YouTube.enabled) {
            // tslint:disable-next-line:no-null-keyword
            return null;
        }

        if (this.state.redirect) {
            return (
                <Redirect to={`/song/youtube/${encodeURIComponent(this.state.redirectData)}`} />
            );
        }

        return (
            <Panel>
                <Heading>YouTube</Heading>
                <Paragraph>Input a YouTube URL or ID.</Paragraph>
                <TextInput
                    block={true}
                    center={true}
                    fontSize="0.8em"
                    type="text"
                    innerRef={(input) => { this.textInput = input; }}
                    onKeyPress={(event) => {
                        if (event.charCode === 13) {
                            this.submit();
                        }
                    }}
                />
                <Button onClick={() => this.submit()}>Get Song</Button>
            </Panel>
        );
    }

    private submit(): void {
        this.setState({
            redirect: true,
            redirectData: this.textInput.value
        });
    }
}

/** An input panel that allows a user to provide a URL as input. */
export class URLPanel extends React.Component<IInputPanelProps, IInputPanelState> {
    private textInput: HTMLInputElement;

    constructor(props: IInputPanelProps) {
        super(props);

        this.state = {
            redirect: false,
            redirectData: undefined
        };
    }

    public render(): JSX.Element {
        if (!this.props.config.mediaProxying.URL.enabled) {
            // tslint:disable-next-line:no-null-keyword
            return null;
        }

        if (this.state.redirect) {
            return (
                <Redirect to={`/song/url/${encodeURIComponent(this.state.redirectData)}`} />
            );
        }

        return (
            <Panel>
                <Heading>URL</Heading>
                <Paragraph>Input a song's URL.</Paragraph>
                <TextInput
                    block={true}
                    center={true}
                    fontSize="0.8em"
                    type="text"
                    innerRef={(input) => { this.textInput = input; }}
                    onKeyPress={(event) => {
                        if (event.charCode === 13) {
                            this.submit();
                        }
                    }}
                />
                <Button onClick={() => this.submit()}>Get Song</Button>
            </Panel>
        );
    }

    private submit(): void {
        this.setState({
            redirect: true,
            redirectData: this.textInput.value
        });
    }
}

/** Renders the input panels for a given configuration. */
export const renderPanels = (config: IClientConfig) => (
    <PanelContainer>
        <FilePanel config={config} />
        <YouTubePanel config={config} />
        <URLPanel config={config} />
    </PanelContainer>
);
