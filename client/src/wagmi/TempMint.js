import React, {useState, useEffect} from "react";
import { useContractWrite, usePrepareContractWrite, useContractEvent, useContractRead } from "wagmi";
import { useRouter } from "next/router";
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json"
import { Button, TextField, Box, Card, CardContent } from "@mui/material";
import { Typography } from "@mui/material";

export default function TempMint() {
    const contentType = 'application/json'
    const router = useRouter();
    const userAddress = router.query.address;
    const contractAddress = MemoryToEarn.networks[5777].address;
    const contractAbi = MemoryToEarn.abi;
    const [message, setMessage] = useState("");
    const [mongoData, setMongoData] = useState({
        user:userAddress,
        createdAt: "",
        article: ""
    });

    useEffect(()=>{
        setMongoData((prev) =>({
            ...prev,
            createdAt: Date.now(),
        })
        )
    }, [mongoData])


    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'tempMint'
    })
    const {data, isLoading, isSuccess, write} = useContractWrite({
                ...config,
                // TODO: どのタイミングでSuccessになるのかGoerliで確認する。
                onSuccess() {
                    router.reload();
                }
            }
        );

    const [ _data, _setData ] = useState({});
    useEffect(()=>{
        _setData(data);
    },[data]);

    const  pages = parseInt(useContractRead({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getDiaryPages',
        }).data?._hex);

    const [_pages, _setPages] = useState(0);
    useEffect(()=>{
        _setPages(pages);
    }, [pages]);
    const diaryPages = [...Array(_pages)].map((_,page) => "");



    // 
    // Mongo Methods------------------------------
    // 
    /* The PUT method edits an existing entry in the mongodb database. */
    const putData = async (formData) => {
        const { id } = router.query

        try {
        const res = await fetch(`/pages/api/page/${id}`, {
            method: 'PUT',
            headers: {
            Accept: contentType,
            'Content-Type': contentType,
            },
            body: JSON.stringify(formData),
        })

        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            throw new Error(res.status)
        }

        const { data } = await res.json()

        mutate(`/api/page/${userAddress}`, data, false) // Update the local data without a revalidation
        router.reload()
        } catch (error) {
        setMessage('Failed to update page')
        }
    }

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (mongoData) => {
        try {
            console.log(mongoData);
        const res = await fetch('/api/page/', {
            method: 'POST',
            headers: {
            Accept: contentType,
            'Content-Type': contentType,
            },
            body: JSON.stringify(mongoData),
        })

        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            throw new Error(res.status)
        }

        // router.push('/')
        } catch (error) {
        setMessage('Failed to write page')
        }
    }

    const formValidate = () => {
        let err = {}
        if (!mongoData.article) err.article = 'Article is required'
        return err
    } 

    const handleChange = ({target}) => {
        const value = target;
        setMongoData((prev) => ({
            ...prev,
            article: target.value
        }))
        console.log(mongoData);
    }

    const  handleSubmit =  (event) =>{
        try {
            // write to mongo
            event.preventDefault()
            const errs = formValidate()
            if (Object.keys(errs).length === 0) {
                 postData(mongoData);
            } else {
              setErrors({ errs })
            }
        } catch (error) {
            console.error(error);
        }
        // write to chain
        write?.()

    }

    return(
            <Card m={1}  >
                <CardContent>
                    <Typography variant="h4">Empty Pages</Typography>
                    <Typography secondary>You can memory whatever you want...</Typography>
                </CardContent>
                <CardContent sx={{display: 'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent:'center'}}>
                    
            {diaryPages.map((value, index)=>{
                return(
                        <Box
                        m={1}
                        component="form"
                        sx={{ display: "flex", flexDirection: "row"}}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                        key={`Box${index}`}
                        >
                        <TextField
                            label={index}
                            variant="outlined" 
                            id={index.toString()}
                            name="article"
                            key={`text${index}`}
                            onChange={handleChange}
                            multiline={true}
                            size="small"
                            fullWidth
                            />
                        {/* <Button type="submit" disabled={!write} onClick={() => write?.()} variant="contained"> */}
                        <Button type="submit" disabled={!write}  variant="contained" key={`button${index}`}>
                            Mint
                        </Button>
                        </Box>
                )

            })}
                </CardContent>
                {isLoading && <div>Check Wallet</div>}
                {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            </Card>
    )
    
}