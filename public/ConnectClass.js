
// The code is now implemented as a class - this way we can store values in the object instance
// variables are stored as attributes (accessed as this.XXXX) and functions are now methods
// and need to be called with this.METHODNAME
class ConnectClass{
  constructor(){
    this.contractAddress = "0x0DA5b794A99cAABB2369d51c52ae651536d30d72";
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
    this.asGetContract();
  }

  // made the on-load thing into a method that is called from the constructor.
  // this method saves stuff to the class attributes
  async asGetContract(){
    // this.herman = "cool";
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
        this.cardsNum = cardsNum;
        this.storeCardsNum = storeCardsNum;
        this.userCardsNum = userCardsNum;
        this.userCards = userCards;
        this.storeCards = storeCards;
      });
    } catch (error) {
      // User denied account access...
      console.log(error);
      alert('You should connect your accounts before using this app! \nThis webpage will not function without it.');
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
  }
  // Non-dapp browsers...
  else {
    alert('Non-Ethereum browser detected. You should consider trying MetaMask! \nThis webpage will not function without it.');
  }
}

getContract(addr) {
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
    if (netId != chainID) {
      return Promise.reject(`Should be on the ${chainName[chainID]} testnet!!!\nThis webpage will not function without it.`);
    }

    return web3.eth.getAccounts()
  })
  .then((accountList) => {
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

  let storeAddr = this.storeAddr;
  return Promise.all([
    this.getExistingAmount(contract),
    this.getCardsNum(contract, storeAddr),
    this.getStoreCards(contract),
    this.getCardsNum(contract, account),
    this.getAllCards(contract, account)
    ])
}

// Get the number of cards in the contract
getExistingAmount(contract) {
  return contract.methods.existingAmount().call()
}

// Get how many cards an address has
getCardsNum(contract, addr) {
  return contract.methods.balanceOf(addr).call();
}

// Get all the tokenIds store has
getStoreCards(contract) {
  return contract.methods.getOwnersAllTokens(this.storeAddr).call()
}

// Get all the tokenIds one account has
getAllCards() {
  let contract = this.contract;
  let account = this.account;
  return contract.methods.getOwnersAllTokens(account).call()
}

// Get the tokenId by cardId, which needs to be parsed into bytes32 by
// `web3.utils.padRight(web3.utils.asciiToHex(card.cardId), 32);`
getTokenIdbyCardId(cardId) {
  let changedCardId = web3.utils.padRight(web3.utils.asciiToHex(cardId), 32)
  let contract = this.contract;
  return contract.methods.cardIdToTokenId(changedCardId).call()
}

// Get the metadata of a specific tokenId
getCardMeta(tokenid) {
  let contract = this.contract;
  // Return a promise with resolve value [price(uint256), nameId(string)]
  return contract.methods.idToMeta(tokenid).call()
}

purchaseCard(cardId, price){
  this.getTokenIdbyCardId(cardId).then( (tokenId) => {
    return this.contract.methods.purchase(tokenId).send({from: this.account, value: price})
        .on('transactionHash', (hash) => console.log(hash))
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log(confirmationNumber);
          console.log(receipt);
        })
        .on('receipt', (receipt) => {
          console.log(receipt);
        })
        .on('error', (err) => console.error)
        .catch(error => console.log(error));
        }
    );
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