pragma solidity ^0.4.4;

import "./Question.sol";

contract QuestionPool {

	mapping (address => address[]) asked;
	mapping (address => address[]) ansed;
	
	function ask(address rec, string qst, uint rwd, uint bns)
    public payable {
		Question question = new Question();
		asked[msg.sender].push(question);
		ansed[rec].push(question);
		question.ask.value(msg.value)(rec,qst,rwd,bns);
		
	}

	function haveAsked()
	public view returns (address[]) {
		return asked[msg.sender];
	}

	function haveAnsed()
	public view returns (address[]) {
		return ansed[msg.sender];
	}
}