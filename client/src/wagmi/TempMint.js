import React, {useState, useEffect} from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useContractRead } from "wagmi";
import { useRouter } from "next/router";
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json"
import { Button, TextField, Box, Card, CardContent, CircularProgress, Link ,Paper} from "@mui/material";
import { Typography } from "@mui/material";

export default function TempMint() {
    const contentType = 'application/json'
    const router = useRouter();
    const userAddress = router.query.address;
    const contractAddress = MemoryToEarn.networks[5].address;
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

    // wagmi Hooks-----------------------------------------
    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'tempMint'
    })
    const {data, write} = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        async onSuccess(){
            await postData(mongoData);
            router.reload();
        }
    })

    const [ _data, _setData ] = useState({});
    useEffect(()=>{
        _setData(data);
    },[data]);

    // const  pages = parseInt(useContractRead({
    //     address: contractAddress,
    //     abi: contractAbi,
    //     functionName: 'getDiaryPages',
    //     args: [userAddress],
    //     }).data?._hex);

    const [_pages, _setPages] = useState(0);
    // useEffect(()=>{
    //     console.log(_pages);
    // }, []);

    const  pagesData = useContractRead({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getDiaryPages',
        args: [userAddress],
        onSuccess(data){
            _setPages(parseInt(data._hex));
            console.log(_pages);
        }
        }).data;

// TODO:新規日記作成時のエラー表示 invalid Array length

    // const [diaryPages, setDiaryPages] = useState([]);
    // useEffect(()=>{
    //     console.log(diaryPages)
    //     setDiaryPages([...Array(_pages)].map((_,page) => ""));
    //     console.log(diaryPages)
    // }, [_pages]);
    const diaryPages = [...Array(_pages ? _pages: 0 )].map((_,page) => "");


    const handleChange = ({target}) => {
        const value = target;
        setMongoData((prev) => ({
            ...prev,
            article: target.value
        }))
    }

    const  handleSubmit =  (event) =>{
            // write to mongo
            event.preventDefault()
            write?.()
    }

    return(
            <Card m={1}  >
                <CardContent>
                    <Box sx={{display:'flex', flexDirection: 'colomn', width:'100%', alignItems:'center'}}>
                        <Box>
                            <Typography variant="h4">Empty Pages</Typography>
                            <Typography secondary="true">You can memory whatever you want...</Typography>
                        </Box>
                        <Box m={1} sx={{ display:'flex', justifyContent:'center', alignItems:'center', backgroundColor: 'success.main',height: 50, minWidth:100}}>
                            <Typography color="white">Get<br />10 MET !!</Typography>
                        </Box>
                        <Box>
                            {isLoading && <CircularProgress color="success" />}
                        </Box>
                    </Box>
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
                        <Button type="submit" disabled={!write || isLoading}  variant="contained" key={`button${index}`}>
                            Write
                        </Button>
                        </Box>
                )

            })}
                </CardContent>
                {isLoading && <div>Writing on Blockchain...</div>}
                {isSuccess && <Link href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan(Goerli)</Link>}
            </Card>
    )
    
}