console.log("does this run");
const contractAddress = "0xD1c2Ec12385938f099Af744eb463A0C1Eb6BC451";
const chainID = 4;
const chainName = {
  '1': 'mainnet',
  '3': 'testnet (Ropsten)',
  '4': 'testnet (Rinkeby)',
  '42': 'testnet (Kovan)'
};
let storeAddr = '0xbeef';
window.addEventListener('load', async () => {
 console.log(Web3);
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      // Acccounts now exposed

      // Initiate contract
      const contract = await getContract();

      // Work for MetaMask ^5.0.0
      // Event listener on account is changed
      window.ethereum.on('accountsChanged', () => {
        console.log('acc change detected');
        location.reload();
      })

      getNetIdAndAccount()
      .then(acc => getInfo(contract, acc))
      .then((res) => {
        let [
        cardsNum,
        storeCardsNum,
        storeCards,
        userCardsNum,
        userCards] = res;

        // Show info
        let elemWalletAddress = document.getElementById('walletAddress');
        elemWalletAddress.textContent = web3.eth.defaultAccount;

        let elemCardsNum = document.getElementById('cardsNum');
        elemCardsNum.textContent = cardsNum;

        let elemStoreCardsNum = document.getElementById('storeCardsNum');
        elemStoreCardsNum.textContent = storeCardsNum;
        let elemStoreCards = document.getElementById('storeCards');
        elemStoreCards.textContent = storeCards.join();

        let elemUserCardsNum = document.getElementById('userCardsNum');
        elemUserCardsNum.textContent = userCardsNum;
        let elemUserCars = document.getElementById('userCards');
        elemUserCars.textContent = userCards.join();
      });

    } catch (error) {
      // User denied account access...
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
});


function getContract(addr) {
  return fetch('../src/assets/abi.json')
    .then(respObj => respObj.json())
    .catch(err => Promise.reject(err))
    .then(abi => {
      return Promise.resolve(new web3.eth.Contract(abi, contractAddress));
    });
}

function getNetIdAndAccount() {
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

function getInfo(contract, account) {
  bindEvent(contract, account);

  return Promise.all([
    getExistingAmount(contract),
    getCardsNum(contract, storeAddr),
    getStoreCards(contract),
    getCardsNum(contract, account),
    getAllCards(contract, account)
    ])
}

function getExistingAmount(contract) {
  return contract.methods.existingAmount().call()
}

function getCardsNum(contract, addr) {
  return contract.methods.balanceOf(addr).call();
}

function getStoreCards(contract) {
  return contract.methods.getOwnersAllTokens(storeAddr).call()
}

function getAllCards(contract, account) {
  return contract.methods.getOwnersAllTokens(account).call()
}

function getCardMeta(contract, tokenid) {
  // Return a promise with resolve value [price(uint256), nameId(string)]
  return contract.methods.idToMeta(tokenid).call()
}

function bindEvent(contract, account) {
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