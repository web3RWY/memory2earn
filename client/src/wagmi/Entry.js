import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Welcome from "../Welcome";
import Diary from "./Diary";


export default function Entry() {
    
    const { address, isConnected } = useAccount();
    const [_isConnected, _setIsConnected] = useState(false);
    
    useEffect(()=>{
        _setIsConnected(isConnected);
    },[isConnected])
    
    return (
        <div>
            {_isConnected ? <Diary /> : <Welcome />}
        </div>
    );
}
