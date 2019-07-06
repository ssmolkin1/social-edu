const Contest = artifacts.require("Contest");

module.exports = function(deployer) {
  deployer.deploy(Contest, "Content Bounty Coin", "Contest", 18);
};
