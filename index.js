import { ethers } from "ethers"
import { REV_SHARE_ABI, REV_SHARE_CA } from "./__web3__/config.js"
import { getSigner } from "./__web3__/init.js"
import { getHodlers } from "./__api__/index.js"

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

const snapshot = async () => {
    try {
        const hodlers = await getHodlers()
        console.log(hodlers)

        const rev = new ethers.Contract(
            REV_SHARE_CA,
            REV_SHARE_ABI,
            getSigner()
        )

        await rev.setHodlers(hodlers)

        rev.on("Hodlers", (hodlers, e) => {
            console.log(hodlers)
        })

        setInterval(() => {
            snapshot()
        }, 1000 * 60 * 60 * 24)
    } catch (error) {
        console.log(error)
    }
}

setTimeout(() => {
    snapshot()
}, 1000)

setInterval(() => {
    distribute()
}, 1000 * 60 * 60 * 24)

// fundPool("0.1")