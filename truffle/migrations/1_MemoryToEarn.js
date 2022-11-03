const MemoryToEarn = artifacts.require("MemoryToEarn");
module.exports = function(deployer) {
    deployer.deploy(MemoryToEarn);
}