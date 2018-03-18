var Question = artifacts.require("./Question.sol");
var QuestionPool = artifacts.require("./QuestionPool.sol");

contract('Question', function(accounts) {






  it("Test For Question And Answer", function() {
    var qst;
    return Question.deployed().then(function(instance) {
      qst = instance;
      console.log("     ------------------------------------------");
      console.log("     person 0 ask person 1: 'How Are You?'")
      console.log("     with reward of 1 ETH and bonus of 1 ETH");
      console.log("     ------------------------------------------");


      return qst.ask(accounts[1],
                    'How Are You?',
                    1000000000000000000,
                    1000000000000000000,
                    {
                      from: accounts[0],
                      value: 2000000000000000000
                    });


    }).then(function() {
      console.log("     person 1 answered: 'Good?'")
      console.log("     gets reward of 1 ETH");
      console.log("     ------------------------------------------");



      return qst.answer('Good',
                    {from: accounts[1]});


    }).then(function() {
      console.log("     person 0 accepted the answer")
      console.log("     sends bonus of 1 ETH");
      console.log("     ------------------------------------------");


      return qst.accept({from: accounts[0]});
    })
  });
});