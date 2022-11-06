import React from "react"
import { 
    WagmiConfig,
    createClient,
    configureChains,
    chain,
    defaultChains,
  } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { Container, CssBaseline } from "@mui/material";
import ButtonAppBar from '../src/wagmi/ButtonAppBar';

  
const { chains, provider, webSocketProvider } = configureChains (
    [chain.goerli ],
    [infuraProvider({ apiKey: process.env.INFURA_API_KEY})]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  })
  
  
  export default function Layout( props ) {
    return (
      <React.Fragment>
        <CssBaseline />
        <WagmiConfig client={client}>
          <ButtonAppBar />
          <Container maxWidth="md">
            {props.children}
          </Container>
        </WagmiConfig>
      </React.Fragment>
    )
  }
  