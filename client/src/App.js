import { 
    WagmiConfig,
    createClient,
    configureChains,
    chain,
    defaultChains,
  } from 'wagmi';
// import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { Profile } from './Profile';

import ButtonAppBar from '../component/ButtonAppBar';
  
  const { chains, provider, webSocketProvider } = configureChains (
    [chain.mainnet, chain.polygon ],
    // [publicProvider()],
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
    connectors: [new MetaMaskConnector({ chains })],
    provider,
    webSocketProvider,
  })
  
  
  export default function App() {
    return (
      <WagmiConfig client={client}>
        <ButtonAppBar />
        <Profile />
      </WagmiConfig>
    )
  }
  