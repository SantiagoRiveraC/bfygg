"use client";
import React, { useState } from 'react'
import Navbar from './view'

const Index = () => {

    const [open, setOpen] = useState<boolean>(false);
    const toggleDrawer = (state: boolean) => {
        setOpen(state);
    };

    return (
        <Navbar toggleDrawer={toggleDrawer} open={open} />
    )
}

export default Index