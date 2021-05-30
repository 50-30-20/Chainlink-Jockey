import "./game.css"

var web3 = new Web3(window.ethereum);
import RaceContract from './abis/Race.json'
import NFTTrophy from './abis/NFTTrophy.json'
import RaceBetToken from './abis/RaceBetToken.json'

var num_lap = 1, results = [], funds = 0, bethorse, amount, raceContract, nftContract, betToken;

function loadBlockchain() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        window.ethereum.enable()
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
        window.alert("Non ethereum browser detected. You should consider trying Metamask")
    }
}

function loadRaceContract() {
    const web3 = window.web3
    const networkId = web3.eth.net.getId()
    const networkData = RaceContract.networks[4]

    if (networkData) {
        const abi = []
        const address = networkData.address
        raceContract = new web3.eth.Contract(RaceContract.abi, address)

    } else {
        window.alert('Smart contract not deployed to the detected network')
    }
}

function loadNFTContract() {
    const web3 = window.web3
    const networkId = web3.eth.net.getId()
    const networkData = NFTTrophy.networks[4]

    if (networkData) {
        const abi = []
        const address = networkData.address
        nftContract = new web3.eth.Contract(NFTTrophy.abi, address)

    } else {
        window.alert('Smart contract not deployed to the detected network')
    }
}

function loadRaceBetTokenContract() {
    const web3 = window.web3
    const networkId = web3.eth.net.getId()
    const networkData = RaceBetToken.networks[4]

    if (networkData) {
        const abi = []
        const address = networkData.address
        betToken = new web3.eth.Contract(RaceBetToken.abi, address)

    } else {
        window.alert('Smart contract not deployed to the detected network')
    }
}

function getRandomSpeed() {
    loadRaceContract()

    const web3 = window.web3
    const accounts = web3.eth.getAccounts()
    accounts.then(data => {
        raceContract.methods.setHorseSpeed().send({ from: data[0] })
    })
}

async function setInitialSpeed() {
    loadRaceContract()

    const web3 = window.web3
    let speed
    const accounts = web3.eth.getAccounts()
    
    speed = await raceContract.methods.randomResult().call()
    return speed
}

async function usersBalance() {
    loadRaceBetTokenContract()

    const web3 = window.web3
    let balance
    const accounts = await web3.eth.getAccounts()
    balance = await betToken.methods.balanceOf(accounts[0]).call()

    return balance
}

async function rewardNFT() {
    loadNFTContract()
    loadRaceBetTokenContract()

    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()

    const nftMint = ["https://ipfs.io/ipfs/QmPbBTESpMSsGjKisM73deE3PLqA76s2zh1nHhvAkAfYf4?filename=btc.png", "https://ipfs.io/ipfs/Qmb3jBv3xdDettAQokTxQc5T4G1buxY9oxRiSA9YepeRrP?filename=crystal.png", "https://ipfs.io/ipfs/QmZg13ohhyY9xBYnhF1XbAm8qjW43SjxDXsXTyTGFkezWX?filename=chest.png", "https://ipfs.io/ipfs/QmNyZd4czMAY8rxYjGK6b8SR69m2W9FHbkVsnCJstewkXY?filename=god.png", "https://ipfs.io/ipfs/QmXHYB8eEpEQjZq6Hc9vCHdPGwpHPjZfoRYQNwqNZVsKQ8?filename=diamond.png"]
    const random = Math.floor(Math.random() * nftMint.length);
    await nftContract.methods.requestNewRandomTrophy(
        1,
        'Horse Jockey',
        1,
        accounts[0],
        nftMint[random]
    ).send({ from: accounts[0] })

    await betToken.methods.mintToUser().send({ from: accounts[0] })
}

async function placeBet(num) {
    console.log('here');
    loadRaceBetTokenContract()
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()

    const networkData = RaceBetToken.networks[4]
    const address = networkData.address

    await betToken.methods.approve(address, num).send({ from: accounts[0] })
    //await betToken.methods.transferFrom(accounts[0], address, num).send({ from: accounts[0] })
}

function Horse(id, x, y, num) {
    
    const len = Math.ceil(Math.log10(num + 1));
    const rounded = num % len //Math.ceil(Math.round(num / len))
    let stripped = rounded % Math.random() * 10 + 10
    let speedfunc = parseInt(stripped)
    //console.log('speed', speedfunc);

    this.element = document.getElementById(id);/*HTML element of the horse*/
    this.speed = speedfunc/*Initiate a random speed for each horse, the greater speed, the faster horse. The value is between 10 and 20*/
    this.originX = x;/*Original X position*/
    this.originY = y;/*Original Y position*/
    this.x = x; /*Current X*/
    this.y = y; /*Current Y*/
    this.number = parseInt(id.replace(/[\D]/g, '')); /*Number of horse, number will be 1 or 2 or 3 or 4*/
    this.lap = 0; //Current lap of the horse

    this.moveRight = function () {
        var horse = this;/*Assign horse to this object*/

        /*Use setTimeout to have the delay in moving the horse*/
        setTimeout(function () {
            //Move the horse to right 1vw
            horse.x++;
            horse.element.style.left = horse.x + 'vw';

            //Check if goes through the start line, if horse runs enough number of laps and has pass the start line then stop
            if (horse.lap == num_lap && horse.x > horse.originX + 6) {
                horse.arrive();
            } else {
                //Make decision to move Down or not
                //The width of the Down Road is 10wh, then the distance of each horse is 2.5vw (4 horses). The right position of the road is 82.5vw
                //Continue to move right if not reach the point to turn
                if (horse.x < 82.5 - horse.number * 2.5) {
                    horse.moveRight();
                } else {
                    //Change HTML class of horse to runDown
                    horse.element.className = 'horse runDown';
                    //Change the speed, will be random value from 10 to 20
                    //console.log('speed', Math.random());
                    horse.speed = speedfunc;
                    horse.moveDown();
                }
            }

        }, 1000 / this.speed);
        /* 1000/this.speed is timeout time*/
    }

    /*Do the same for moveDown, moveLeft, moveUp*/
    this.moveDown = function () {
        var horse = this;
        setTimeout(function () {
            horse.y++;
            horse.element.style.top = horse.y + 'vh';
            if (horse.y < horse.originY + 65) {
                horse.moveDown();
            } else {
                horse.element.className = 'horse runLeft';
                horse.speed = speedfunc;
                horse.moveLeft();
            }
        }, 1000 / this.speed)
    }

    this.moveLeft = function () {
        var horse = this;
        setTimeout(function () {
            horse.x--;
            horse.element.style.left = horse.x + 'vw';
            if (horse.x > 12.5 - horse.number * 2.5) {
                horse.moveLeft();
            } else {
                horse.element.className = 'horse runUp';
                horse.speed = speedfunc;
                horse.moveUp();
            }
        }, 1000 / this.speed)
    }

    this.moveUp = function () {
        var horse = this;
        setTimeout(function () {
            horse.y--;
            horse.element.style.top = horse.y + 'vh';
            if (horse.y > horse.originY) {
                horse.speed = speedfunc;
                horse.moveUp();
            } else {
                horse.element.className = 'horse runRight';
                //Nearly finish the lap
                horse.lap++;
                horse.moveRight();
            }
        }, 1000 / this.speed)
    }

    /*Trigger the horse by run*/
    this.run = function () {
        this.element.className = 'horse runRight';
        this.moveRight();
    }

    this.arrive = function () {
        //Stop the horse run by change class to standRight
        this.element.className = 'horse standRight';
        this.lap = 0;//Reset the lap

        /*Show the result*/
        var tds = document.querySelectorAll('#results .result');//Get all table cell to display the result
        //results.length is the current arrive position
        tds[results.length].className = 'result horse' + this.number;//The class of result look like: result horse1...

        //Push the horse number to results array, according the the results array, we know the order of race results
        results.push(this.number);
        //console.log('race results', results);

        //Win horse
        if (results.length == 1) {
            //If win horse is the bet horse, then add the fund
            if (this.number == bethorse) {
                // Add reward NFT code
                console.log('You Won');
                rewardNFT()
                funds += amount;
            } else {
                //rewardNFT()
                funds -= amount;
            }
            document.getElementById('funds').innerText = funds;
        } else if (results.length == 4) {
            //All horse arrived, enable again the Start Button
            document.getElementById('start').disabled = false;
        }
    }
}

//Start the function when the document loaded
document.addEventListener("DOMContentLoaded", async function (event) {

    let spd = await setInitialSpeed()
    let b = await usersBalance()
    funds = ((await usersBalance()) / 10**18).toFixed(2)
    console.log('funds', funds);

    var horse1 = new Horse('horse1', 20, 4, spd);
    var horse2 = new Horse('horse2', 20, 8, spd);
    var horse3 = new Horse('horse3', 20, 12, spd);
    var horse4 = new Horse('horse4', 20, 16, spd);

    document.getElementById('Bet').onclick = function () {
        getRandomSpeed()

        amount = parseInt(document.getElementById('amount').value);
        console.log('amount', amount);
        if (amount > 0) {
            console.log(true);
            placeBet(amount)
        }
    }

    //Event listener to the Start button
    document.getElementById('start').onclick = async function () {
        amount = parseInt(document.getElementById('amount').value);
        num_lap = parseInt(document.getElementById('num_lap').value);
        bethorse = parseInt(document.getElementById('bethorse').value);

        if (funds < amount) {
            alert('Not enough funds.');
        }
        else if (num_lap <= 0) {
            alert('Number of lap must be greater than 1.');
        } else {

            /*Started the game*/
            this.disabled = true;/*Disable the start button*/
            var tds = document.querySelectorAll('#results .result');//Get all cells of result table.
            for (var i = 0; i < tds.length; i++) {
                tds[i].className = 'result';//Reset the result.
            }

            document.getElementById('funds').innerText = funds;
            results = [];//Results array is to save the horse numbers when the race is finished.
            horse1.run();
            horse2.run();
            horse3.run();
            horse4.run();
        }
    }


});

function Main() {
    loadBlockchain()
}

Main()