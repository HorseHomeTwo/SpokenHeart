pragma solidity ^0.4.4;

contract Question {

	address public sender;
	address public receiver;
	uint public reward;
	uint public bonus;
	string public questiontext;
	string public answertext;
	bool public answered;
	bool public rewarded;
	bool public completed;

    function ask(address rec, string qst, uint rwd, uint bns)
    public payable {
    	sender = msg.sender;
    	receiver = rec;
    	reward = rwd;
    	bonus = bns;
    	questiontext = qst;
    	assert(reward+bonus == msg.value); //"Wrong Value Amount!"
    }

    function cancel()
    public {
    	require(msg.sender == sender); //"Wrong Person Canceling!"
    	require(completed == false); //"Question Already Cancelled!"
    	completed = true;
    	sender.transfer(this.balance);
    }

    function answer(string ans) 
    public {
    	require(msg.sender == receiver); //"Wrong Person Answering!"
    	require(completed == false); //"Question Already Cancelled!"
    	answertext = ans;
    	answered = true;
    	receiver.transfer(reward);
    	assert(this.balance == bonus); //"Wrong Left Over Balance"
    }

    function accept()
    public {
    	require(msg.sender == sender); //"Wrong Person Accepting!"
    	require(completed == false); //"Question Already Cancelled!"
    	require(answered == true); //"Question Not Answered Yet!"
    	rewarded = true;
    	completed = true;
    	receiver.transfer(bonus);
    	assert(this.balance == 0); //"Wrong Left Over Balance"
    }
}