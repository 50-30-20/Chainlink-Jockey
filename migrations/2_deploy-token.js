const RaceBetToken = artifacts.require("RaceBetToken");
const Race = artifacts.require("Race");
const NFTTrophy = artifacts.require("NFTTrophy");

const RINKEBY_LINKTOKEN = '0x01be23585060835e02b77ef475b0cc51aa1e0709'
const RINKEBY_VRF_COORDINATOR = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B'
const RINKEBY_KEYHASH = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(RaceBetToken);

    await deployer.deploy(NFTTrophy, RINKEBY_VRF_COORDINATOR, RINKEBY_LINKTOKEN, RINKEBY_KEYHASH)

    await deployer.deploy(Race, RINKEBY_VRF_COORDINATOR, RINKEBY_LINKTOKEN, RINKEBY_KEYHASH)

};
