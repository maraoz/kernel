// Deploy registry with sample kernel instance to target network
// Run as: `npx truffle exec scripts/deploy.js --network NETWORK`

const Deployer = require("../deploy/Deployer");
const ERC721Token = artifacts.require('ERC721Token');
const ZepCoreManager = require("../deploy/ZepCoreManager");
const { ZEPPELIN_ACCOUNT, DEVELOPER_ACCOUNT, DEVELOPER_FRACTION, NEW_VERSION_COST, VERSION, DISTRIBUTION, ERC721_CONTRACT_NAME } = require('../deploy/constants')

async function deploy() {
  console.log('Deploying zepCore...')
  const zepCore = await Deployer.zepCore(ZEPPELIN_ACCOUNT, NEW_VERSION_COST, DEVELOPER_FRACTION, DISTRIBUTION)
  console.log('ZepCore address: ', zepCore.address)
  const zepCoreManager = new ZepCoreManager(zepCore, ZEPPELIN_ACCOUNT)
  await zepCoreManager.mintZepTokens(DEVELOPER_ACCOUNT, NEW_VERSION_COST)
  await zepCoreManager.registerKernelInstance(DISTRIBUTION, VERSION, ERC721Token, ERC721_CONTRACT_NAME, DEVELOPER_ACCOUNT)
}

module.exports = function(cb) {
  deploy().then(cb).catch(cb);
}
