import { Web3 } from 'web3';

async function execute() {

    const jsonRpcURL = "http://localhost:8545";
    const web3 = new Web3(jsonRpcURL);

    const owner = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const contractAbi =  [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "mintedCardCount",
                "type": "uint256"
            }
            ],
            "name": "eventCard",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "int256",
                "name": "_cardCount",
                "type": "int256"
            }
            ],
            "name": "eventCollection",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "TOKENURI",
            "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "address",
                "name": "_approved",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            }
            ],
            "name": "assignCardToUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
            ],
            "name": "balanceOf",
            "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
            ],
            "name": "cardApprovals",
            "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
            ],
            "name": "cardToOwner",
            "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
            ],
            "name": "cards",
            "outputs": [
            {
                "internalType": "contract NFTCard",
                "name": "",
                "type": "address"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
            ],
            "name": "collectionContracts",
            "outputs": [
            {
                "internalType": "contract Collection",
                "name": "",
                "type": "address"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "collectionCount",
            "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
            ],
            "name": "collections",
            "outputs": [
            {
                "internalType": "contract Collection",
                "name": "",
                "type": "address"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "int256",
                "name": "_cardCount",
                "type": "int256"
            }
            ],
            "name": "createCollection",
            "outputs": [
            {
                "internalType": "contract Collection",
                "name": "",
                "type": "address"
            }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllCollections",
            "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
            ],
            "name": "getCardsByOwner",
            "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "isOwner",
            "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "mintedCardCount",
            "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
            ],
            "name": "ownerCardCount",
            "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
            ],
            "name": "ownerOf",
            "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
        ];
    const mainContract = new web3.eth.Contract(contractAbi,contractAddress);

    return mainContract.methods.getAllCollections(owner).call();
    
 }

const Button = () => {
    return (<button onClick={() => execute()}>List Collections and Cards</button>);
}

export default Button