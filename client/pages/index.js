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
import { Profile } from '../src/Profile';



const { chains, provider, webSocketProvider } = configureChains (
  [chain.mainnet, chain.polygon ],
  // [publicProvider()],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        webSocket: "ws://127.0.0.1:8545"
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


export default function Home() {


  return (
    <WagmiConfig client={client}>
      <Profile />
    </WagmiConfig>
  )
}
