import React, { Component } from 'react'
import QuestionContract from '../build/contracts/Question.json'
import QuestionPoolContract from '../build/contracts/QuestionPool.json'
import getWeb3 from './utils/getWeb3'
import MyCard from './MyCard'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      asked: [],
      ansed: [],
      web3: null,
      contra: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    this.setState({contra: contract});

    /*
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })*/

    const question = contract(QuestionContract)
    question.setProvider(this.state.web3.currentProvider)
    const questionPool = contract(QuestionPoolContract)
    questionPool.setProvider(this.state.web3.currentProvider)
    var pool

    this.state.web3.eth.getAccounts((error, accounts) => {
      questionPool.deployed().then((instance) => {
        pool = instance
        //pool.ask('0xf17f52151EbEF6C7334FAD080c5704D77216b732', 'How Are You?', 1000000000000000000, 0,
        //  {from: accounts[0], value: 1000000000000000000})
        //return pool.haveAsked()
        var thing = this;
        pool.haveAnsed({from: accounts[1]}).then(function (received) {
          console.log(received);
          thing.setState({ansed: received})
        });
        
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">珍心话 Spoken Heart</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
            {this.state.ansed.map(address => {
              return (<MyCard address={address} contract={this.state.contract}> </MyCard>);
            })}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
