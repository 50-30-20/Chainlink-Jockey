//import Web3 from 'web3';
import React, { Component } from 'react';
import './Game.css'


// const { create } = require('ipfs-http-client')
// const client = create('http://ipfs.infura.io:5001')


class GameLogic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            element: null,
            speed: null,
            originX: null,
            originY: null,
            number: null,
            lap: null,
            bet: null,
            lap: null,
            bethorse: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadWeb3 = this.loadWeb3.bind(this)
        this.loadBlockchainData = this.loadBlockchainData.bind(this)
    }

    async componentWillMount() {
        
    }

    async loadWeb3() {
        // if (window.ethereum) {
        //     window.web3 = new Web3(window.ethereum)
        //     await window.ethereum.enable()
        // }
        // else if (window.web3) window.web3 = new Web3(window.web3.currentProvider)
        // else window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    async loadBlockchainData() {
        // const web3 = window.web3
        // const accounts = await web3.eth.getAccounts()
        // this.setState({ account: accounts[0] })

        // const networkId = await web3.eth.net.getId()
        // const networkData = TokenFactory.networks[networkId]

        // if (networkData) {
        //     const tokenFactory = new web3.eth.Contract(TokenFactory.abi, networkData.address)
        //     this.setState({ tokenFactory })
        //     this.setState({ loading: false })

        // } else {
        //     window.alert("TokenFactory contract is not deployed to detected network")
        // }
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log('true');
        if(this.state.bethorse == null) {
            this.setState({ bethorse : "1" })
        }
        console.log(this.state.bethorse, this.state.bet, this.state.lap);
    }

    async handleFileInput(e) {
        console.log('true');
    }

    render() {
        return (
            <div className="main">
                <div id="horse1" class="horse standRight">
                    <div class="rider">
                        <div class="head">
                        </div>
                        <div class="body">
                        </div>
                    </div>
                </div>

                <div id="horse2" class="horse standRight">
                    <div class="rider">
                        <div class="head">
                        </div>
                        <div class="body">
                        </div>
                    </div>
                </div>

                <div id="horse3" class="horse standRight">
                    <div class="rider">
                        <div class="head">
                        </div>
                        <div class="body">
                        </div>
                    </div>
                </div>

                <div id="horse4" class="horse standRight">
                    <div class="rider">
                        <div class="head">
                        </div>
                        <div class="body">
                        </div>
                    </div>
                </div>

                <div className="track">
                    <div id="startline">
                    </div>

                    <div className="inner">
                        <form onSubmit={this.startRace}>
                            <button id="start">Start Race</button>
                        </form>

                        <form id="bet" onSubmit={this.handleSubmit}>
                            <p>You currently have <span id="funds">100</span></p>
                            <label>Bet Amount (£)</label>
                            <input
                                type="number"
                                id="amount"
                                value={this.state.bet}
                                onChange={event => this.setState({ bet: event.target.value })}
                            />
                            <label>Bet on horse:</label>
                            <select 
                                id="bethorse" 
                                value={this.state.value} 
                                onChange={event => this.setState({ bethorse: event.target.value })}
                            >
                                <option value="1">White</option>
                                <option value="2">Blue</option>
                                <option value="3">Green</option>
                                <option value="4">Brown</option>
                            </select>
                            <label>Number of lap</label>
                            <input
                                type="number"
                                id="num_lap"
                                value={this.state.lap}
                                onChange={event => this.setState({ lap: event.target.value })}
                            />
                            <button type="sumbit" className="Button">Pack</button>
                        </form>

                        {/* <img src="../../images" className="tree"/> */}
                        <br></br>
                        <table id="results">
                            <thead>
                                <tr>
                                    <th>Results</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1st</td>
                                    <td class="result horse1"></td>
                                </tr>
                                <tr>
                                    <td>2nd</td>
                                    <td class="result horse2"></td>
                                </tr>
                                <tr>
                                    <td>3rd</td>
                                    <td class="result horse3"></td>
                                </tr>
                                <tr>
                                    <td>4th</td>
                                    <td class="result horse4"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default GameLogic;