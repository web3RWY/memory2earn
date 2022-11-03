import { 
    WagmiConfig,
    createClient,
    configureChains,
    chain,
    defaultChains,
  } from 'wagmi';
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Profile } from './wagmi/ConnectButton';
import Layout from '../component/Layout';
import Entry from './wagmi/Entry';

import ButtonAppBar from './wagmi/ButtonAppBar';
  
// const { chains, provider, webSocketProvider } = configureChains (
//     // TODO: GanacheからGoerliに変更時に以下変更
//     // [chain.mainnet, chain.polygon ],
//     [chain.localhost ],
//     // [publicProvider()],
//     // [infuraProvider({ apiKey: process.env.INFURA_API_KEY})]
//     [
//       jsonRpcProvider({
//         rpc: (chain) => ({
//           webSocket: `ws://${process.env.NETWORK_ADDRESS}`
//         })
//       })
//     ]
//   );
  
//   const client = createClient({
//     autoConnect: true,
//     provider,
//     webSocketProvider,
//   })
  
  
  export default function App() {
    return (
      // <WagmiConfig client={client}>
        <Layout>
          <Entry />
        </Layout>
      // </WagmiConfig>
    )
  }
  