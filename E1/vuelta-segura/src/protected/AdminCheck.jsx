import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

function AdminCheck() {
    const {token} = useContext(AuthContext);
    const [msg, setMsg] = useState("");

    const config = {
        'method' : 'get',
        'url' : `${import.meta.env.VITE_BACKEND_URL}/scope/protectedAdmin`,
        'headers' : {
            'Authorization' : `Bearer ${token}`
        } 
    }

    useEffect(() => {
        axios(config).then((response) => {
            console.log("weno")
            console.log(response);
            setMsg(response.data.message)
        }).catch((error) => {
            console.log("nao nao");
            console.log(error);
            setMsg(error.message)
        })
    }, [])

    return (
        <h1>{msg}</h1>
    )
}

export default AdminCheck;