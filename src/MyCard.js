import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class MyCard extends React.Component {
  constructor(props) {
    super(props)

    var contra = this.props.contract.at(this.state.address);
    contra.sender.call().then(function (sender) {
    	contra.receiver.call().then(function (receiver) {
    		contra.question.call().then(function (question) {
    			contra.answer.call().then(function (answer) {
				    this.state = {
				    	address: this.props.address,
				    	sender: sender,
				    	receiver: receiver,
				    	question: question,
				    	answer: answer
				    }
    			})
    		})
    	})
    })
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    var contra = this.props.contract.at(this.state.address);
    contra.answer(this.state.answer);
  }


	render() {
	  return (
	    <div>
	      <Card>
	        <CardBody>
	          <CardTitle>Sent From {this.state.sender}</CardTitle>
	          <CardSubtitle>To {this.state.receiver}</CardSubtitle>
	          <CardText>Question</CardText>
			  <form onSubmit={this.handleSubmit} id="form1">
		        <label>
		          Answer:
		          <input type="text" value={this.state.answer} />
		        </label>
		        <input type="submit" value="Submit" />
		      </form>
	        </CardBody>
	      </Card>
	    </div>
	  );
	}
};

export default MyCard;