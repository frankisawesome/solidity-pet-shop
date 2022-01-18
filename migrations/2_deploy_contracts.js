const adoptions = artifacts.require("Adoption");

module.exports = function(deployer) {
    deployer.deploy(adoptions);
}