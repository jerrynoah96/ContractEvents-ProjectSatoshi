
    // Initialize Web3
    if (typeof web3 !== 'undefined') {
        //connect to metamask
    web3 = new Web3(web3.currentProvider);
    console.log('metamask');
    } else {
    web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    }


    //initliaze contract variable name
    var myContract;

    //we need the address contract was deployed to and the ABI to inialize our contract
    //contract ABI

    var contractABI = []//get contract ABI from compile tab on Remix
    //contract address
    var contractAddress = '';// get address contract was deployed to from deployed tab on remix upon deploying contract

    myContract = new web3.eth.Contract(contractABI, contractAddress);//web3 syntax for creating contract instance
    console.log(myContract, 'contract')

    document.getElementById('btn').addEventListener('click', async()=> {
        //get userAccout
        var accounts = await web3.eth.getAccounts();//returns array of address in metamask wallet
        var userAccount = accounts[0];//gets the first address as address of owner
       
        //FIRST METHOD-viewing reciepts
        //call add function
        var txReciept = await myContract.methods.add(3,4).send({from: userAccount});
        console.log(txReciept);// this will give details of transaction including transaction hash, events etc
        console.log(txReciept.events.added.returnValues.caller);//get caller address in event just as we access object and array in Javascript
        var caller = txReciept.events.added.returnValues.caller;//set caller address to a variable to display in html

        document.getElementById('eventOutput').textContent = caller;//display in html

        //second Method - getPastEvents Methods, can filter through transactions and based on block number
        //you can access your event parameters as we did for the first method above
       var result1 = await myContract.getPastEvents('added', {
            filter: {
                result: 7
            }, 

            fromBlock: 0

        }) 
        console.log(result1, 'result1'); 

        //event emitter api- you can as well filter and use blockNumber here
       myContract.events.added({})
        .on('data', event => {
            console.log(event)
        }) 
    }) 
    
    viewResult = async()=> {
        //call viewResult function
        var result = await myContract.methods.viewResult().call();

        document.getElementById('additionResult').textContent = result;
    }
    viewResult();
    

