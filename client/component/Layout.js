import { 
    WagmiConfig,
    createClient,
    configureChains,
    chain,
    defaultChains,
  } from 'wagmi';
// import { publicProvider } from "wagmi/providers/public";
// import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { Profile } from './wagmi/ConnectButton';
// import Layout from '../component/Layout';
// import Entry from './wagmi/Entry';
import { Container } from "@mui/material";
import ButtonAppBar from '../src/wagmi/ButtonAppBar';
  
const { chains, provider, webSocketProvider } = configureChains (
    // TODO: GanacheからGoerliに変更時に以下変更
    // [chain.mainnet, chain.polygon ],
    [chain.localhost ],
    // [publicProvider()],
    // [infuraProvider({ apiKey: process.env.INFURA_API_KEY})]
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          webSocket: `ws://${process.env.NETWORK_ADDRESS}`
        })
      })
    ]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  })
  
  
  export default function Layout( props ) {
    return (
      <WagmiConfig client={client}>
        <ButtonAppBar />
        <Container maxWidth="md">
          {props.children}
        </Container>
      </WagmiConfig>
    )
  }
  





// import React from "react";


// export default function Layout(props) {
//     return(
//         <>
//             <ButtonAppBar />
//             <Container maxWidth="md">
//                 {props.children}
//             </Container>
//         </>
//     )
// }