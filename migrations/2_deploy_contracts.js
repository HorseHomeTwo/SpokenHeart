var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Question = artifacts.require("./Question.sol");
var QuestionPool = artifacts.require("./QuestionPool.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Question);
  deployer.deploy(QuestionPool);
};