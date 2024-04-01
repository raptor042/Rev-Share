import axios from "axios"
import { config } from "dotenv"
import { HAMS_CA, NETWORK_ID } from "../__web3__/config.js"

config()

const CHAINBASE_API_KEY = process.env.CHAINBASE_API_KEY

export const getHodlers = async () => {
    try {
        const response = await axios.get(`https://api.chainbase.online/v1/token/holders?chain_id=${NETWORK_ID}&contract_address=${HAMS_CA}`, {
            headers: {
                "x-api-key": CHAINBASE_API_KEY,
                "accept": "application/json"
            }
        })
        const data = response.data
        
        return data.data
    } catch (error) {
        console.log(error)
    }
}