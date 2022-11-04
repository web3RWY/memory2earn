import { useContractWrite, usePrepareContractWrite, useContractEvent } from "wagmi";
import { useRouter } from "next/router";
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json";
import {Button} from "@mui/material"

export default function Burn(){
    const router = useRouter();
    const userAddress = router.query.address;
    const contractAddress = MemoryToEarn.networks[5777].address;
    const contractAbi = MemoryToEarn.abi;
    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'burn'
    })
    const { data, isLoading, isSuccess, write, status } = useContractWrite({
        ...config,
        // TODO:Goerliの挙動に応じてコード変更
        onSuccess(){
            router.reload();
        }
    });


    return(
        <div>
            <Button disabled={!write} onClick={() => write?.()} variant="contained" color="success">
                Add 5 pages</Button>
                {isLoading && <div>Check Your Wallet</div>}
                {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                {/* Goerliで使えそうであれば、ステータスの記載につかう */}
                <div>{status}</div>
        </div>

    )
}