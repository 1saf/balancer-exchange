import React, { useEffect } from 'react';
import { HashRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Web3ReactManager from 'components/Web3ReactManager';
import Header from 'components/Header';
import GeneralNotification from 'components/GeneralNotification';
import SwapForm from 'components/SwapForm';
import './App.css';

const fathom = (window as any).fathom;

const BuildVersion = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    margin: 20px;
    font-size: 10px;
    color: var(--body-text);
    position: fixed;
    bottom: 0px;
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

const BuildLink = styled.a`
    color: var(--body-text);
    text-decoration: none;
    margin-left: 5px;
`;

const PoolSwapView = props => {
    const { tokenIn, tokenOut } = props.match.params;
    return <SwapForm tokenIn={tokenIn} tokenOut={tokenOut} />;
};

const Views = () => {
    const location = useLocation();
    const pathname = location?.pathname;
    useEffect(() => {
        fathom && fathom.trackPageview({
            url: '/swap',
        });
    }, [pathname]);

    return (
        <div className='app-shell'>
            <Switch>
                <Route path='/swap/:tokenIn?/:tokenOut?' component={PoolSwapView} />
                <Redirect from='/' to='/swap' />
            </Switch>
        </div>
    );
};

const App = () => {
    const buildId = process.env.REACT_APP_COMMIT_REF || '';

    return (
        <Web3ReactManager>
            <HashRouter>
                <Header />
                <GeneralNotification />
                <Views />
                <BuildVersion>
                    BUILD ID:{' '}
                    <BuildLink href={`https://github.com/balancer-labs/balancer-exchange/tree/${buildId}`} target='_blank'>
                        {buildId.substring(0, 12)}
                    </BuildLink>
                </BuildVersion>
            </HashRouter>
        </Web3ReactManager>
    );
};

export default App;
