import React, {useState, useEffect} from 'react'
import { useConnect, useAccount } from 'wagmi'
import  {Button}  from '@mui/material'
 
export function ConnectButton() {
  const { isConnected } = useAccount();  
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const [ _isConnected, _setIsConnected ] = useState(false);
  const [ _connectors, _setConnectors ] = useState([]);


  useEffect(() => {
    _setIsConnected(isConnected);
  }, [isConnected]);
  
  useEffect(() => {
    _setConnectors(connectors);
  }, [connectors]);
  
     
     return (
       <div>
         {_connectors.map((connector) => (
           <Button
             disabled={!connector.ready}
             key={connector.id}
             onClick={() => connect({ connector })}
             color="secondary"
             variant='contained'
           >
             {!isLoading ?.id &&
               'CONNECT WALLET(JUST Goerli)'}
             {isLoading &&
               connector.id === pendingConnector?.id &&
               '(connecting)'}
           </Button>
         ))}
    
         {error && <div>{error.message}</div>}
       </div>
     )
 

}