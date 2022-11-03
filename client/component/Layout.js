import React from "react";
import { Container } from "@mui/material";
import ButtonAppBar from "../src/wagmi/ButtonAppBar";

export default function Layout(props) {
    return(
        <>
            <ButtonAppBar />
            <Container maxWidth="md">
                {props.children}
            </Container>
        </>
    )
}