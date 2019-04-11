
// The code is now implemented as a class - this way we can store values in the object instance
// variables are stored as attributes (accessed as this.XXXX) and functions are now methods
// and need to be called with this.METHODNAME
class ConnectClass{
  constructor(){
    console.log("initalizing ConnectClass");
    this.contractAddress = "0xD1c2Ec12385938f099Af744eb463A0C1Eb6BC451"; 
    this.chainID = 4;
    this.storeAddr = '0x000000000000000000000000000000000000bEEF';
    this.chainName = {
      '1': 'mainnet',
      '3': 'testnet (Ropsten)',
      '4': 'testnet (Rinkeby)',
      '42': 'testnet (Kovan)'
    };
    this.cardsNum =null;
    this.storeCardsNum =null;
    this.userCardsNum = null;
    this.userCards = null;
    this.storeCards = null;
    this.contract = null;
    this.account = null;
    //connecting to the contract
    this.cardArray = [{
      cNameID: "Ysera",
      cPrice: 1
    }];
    this.asGetContract();
  }

  // made the on-load thing into a method that is called from the constructor. 
  // this method saves stuff to the class attributes
  async asGetContract(){
    this.herman = "cool";
    if (window.ethereum) {
      console.log("ethereum OK");
      window.web3 = new window.Web3(ethereum);
      console.log("has set web3");
      try {
      // Request account access if needed
      console.log("trying to enable ethereum");
      await window.ethereum.enable();
      console.log("ethereum enabled");
      // Acccounts now exposed
      // Initiate contract
      console.log("Contacting the contract");
      const contract = await this.getContract();
      console.log("Contract connection established");
      // Work for MetaMask ^5.0.0
      // Event listener on account is changed
      window.ethereum.on('accountsChanged', () => {
        console.log('acc change detected');
        location.reload();
      })
      this.contract = contract;
      console.log("innan getNetIdAndAccount");
      this.getNetIdAndAccount()
      .then(acc => {
        this.account = acc;
        return this.getInfo(contract, acc);
      })
      .then((res) => {
        let [
        cardsNum,
        storeCardsNum,
        storeCards,
        userCardsNum,
        userCards] = res;
        this.cardsNum = "joarColl";
        this.storeCardsNum = storeCardsNum;
        this.userCardsNum = userCardsNum;
        this.userCards = userCards;
        this.storeCards = storeCards;
      });
    } catch (error) {
      // User denied account access...
      console.log(error);
      console.log('You should connect your accounts before using this app!');
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
} 



test (){
  console.log("HEJEJEJEHEJASFSD");
  console.log(web3);
}

getContract(addr) {
  // console.log(web3);
  return fetch('./assets/abi.json')
  .then(respObj => respObj.json())
  .catch(err => Promise.reject(err))
  .then(abi => {
    return Promise.resolve(new web3.eth.Contract(abi, this.contractAddress));
  });
}

getNetIdAndAccount() {
  let chainName = this.chainName;
  let chainID = this.chainID;
  let storeAddr = this.storeAddr;
  return web3.eth.net.getId()
  .then((netId) => {
    switch(netId) {
      case  1: return [netId, chainName['1']];
      case  3: return [netId, chainName['3']];
      case  4: return [netId, chainName['4']];
      case 42: return [netId, chainName['42']];
      default: return [netId, 'unknown'];
    }
  })
  .then(([netId, netName]) => {
    console.log(netId, netName);
    if (netId != chainID) {
      return Promise.reject(`Should be on the ${chainName[chainID]} testnet!!!`);
    }

    return web3.eth.getAccounts()
  })
  .then((accountList) => {
    console.log(accountList);
    if (accountList[0] == null) {
      return Promise.reject('You don\'t have an account or you should unlock your account.');
    }

    if (!window.ethereum) {
      let accChangeWatcher = setInterval(() => {
        // `web3.givenProvider.selectedAddress` is all lowercase
        // Yet, web3.eth.defaultAccount is not
        if (web3.givenProvider.selectedAddress !== web3.eth.defaultAccount.toLowerCase()) {
          console.log('acc change detected');
          clearInterval(accChangeWatcher);
          location.reload();
        }
      }, 500);
    }

    web3.eth.defaultAccount = accountList[0];
    // update the storeAddr
    storeAddr = web3.utils.toChecksumAddress(web3.utils.padLeft(storeAddr, 40));
    return web3.eth.defaultAccount;
  });
}

getInfo(contract, account) {
  // bindEvent(contract, account);
  console.log("kör getinfo");
  console.log(contract);
  console.log(account);
  let storeAddr = this.storeAddr;
  console.log(storeAddr);
  return Promise.all([
    this.getExistingAmount(contract),
    this.getCardsNum(contract, storeAddr),
    this.getStoreCards(contract),
    this.getCardsNum(contract, account),
    this.getAllCards(contract, account)
    ])
}

testAddCard(contract) {
  const namn = this.cardArray[0].cNameID;
  const kostnad =this.cardArray[0].cPrice;
  console.log("hej", namn, kostnad);
  
  contract.methods.mint(namn, kostnad).call();
}

getExistingAmount(contract) {
  return contract.methods.existingAmount().call()
}

getCardsNum(contract, addr) {
  return contract.methods.balanceOf(addr).call();
}

getStoreCards(contract) {
  return contract.methods.getOwnersAllTokens(this.storeAddr).call()
}

getAllCards(contract, account) {
  return contract.methods.getOwnersAllTokens(account).call()
}

getCardMeta(contract, tokenid) {
  // Return a promise with resolve value [price(uint256), nameId(string)]
  return contract.methods.idToMeta(tokenid).call()
}

bindEvent(contract, account) {
  let btn1 = document.getElementById('btn0');
  let btn2 = document.getElementById('btn1');
  let btn3 = document.getElementById('btn2');
  let btns = [btn1, btn2, btn3];

  btns.forEach((e) => {
    e.addEventListener('click', () => {
      const [tokenid, price] = [e.dataset.id, e.value];

      // if you want to get the eth price,
      // you need to use `web3.utils.fromWei(price)` to get the price of eth

      return contract.methods.purchase(tokenid).send({from: account, value: price})
      .on('transactionHash', (hash) => console.log(hash))
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log(confirmationNumber);
        console.log(receipt);
      })
      .on('receipt', (receipt) => {
        console.log(receipt);
      })
      .on('error', (err) => console.error);
    })
  });
}

}

// bind an instance of the above class to the window object
// this way we can access it from everywhere
window.ConnectClass = new ConnectClass();