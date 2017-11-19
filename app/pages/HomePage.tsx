import * as React from 'react';
import styled from 'styled-components';
import styleVars from '../style/vars';

import Loading from '../style/Loading';
import { Heading, Paragraph } from '../style/typography';

import { renderPanels } from './HomePage.InputPanels';

import IClientConfig from '../IClientConfig';
import getConfig from '../util/getConfig';

interface IHomePageState {
    config: IClientConfig;
}

export default class HomePage extends React.Component<any, IHomePageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            config: undefined
        };

        getConfig().then((config) => {
            this.setState({
                config
            });
        });
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.renderPanels()}
            </div>
        );
    }

    private renderPanels(): JSX.Element {
        return this.state.config === undefined
            ? (<Loading />)
            : renderPanels(this.state.config);
    }
}
