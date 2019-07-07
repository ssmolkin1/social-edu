const Web3 = require("web3");
const contestArtifact = require("../../build/contracts/Contest.json");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("http://localhost:8545")
);

let contest;

async function init() {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contestArtifact.networks[networkId];
  contest = new web3.eth.Contract(contestArtifact.abi, deployedNetwork.address);
}

function getAddress() {
  return contest.address;
}

async function getReward() {
  return await contest.methods.getReward().call();
}

module.exports = { init, getAddress, getReward };
