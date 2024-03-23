import { ethers } from "ethers"
import { REV_SHARE_ABI, REV_SHARE_CA } from "./__web3__/config.js"
import { getSigner } from "./__web3__/init.js"

const fundPool = async amount => {
    const rev = new ethers.Contract(
        REV_SHARE_CA,
        REV_SHARE_ABI,
        getSigner()
    )

    try {
        console.log(await rev.minBalance(), await rev.minDeposit(), await rev.pool(), await rev.token())

        await rev.fundPool({ value: ethers.parseEther(amount) })

        rev.on("Pool_Funded", (amount, e) => {
            console.log(`Revenue Pool has been funded with ${ethers.formatEther(amount)} ETH.`)
        })
    } catch (error) {
        console.log(error)
    }
}

const distribute = async () => {
    const rev = new ethers.Contract(
        REV_SHARE_CA,
        REV_SHARE_ABI,
        getSigner()
    )

    try {
        await rev.distribute()
    } catch (error) {
        console.log(error)
    }
}

setInterval(() => {
    distribute()
}, 1000 * 60 * 60 * 24)

fundPool("0.1")