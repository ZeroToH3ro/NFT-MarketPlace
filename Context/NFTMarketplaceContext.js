import React, {useEffect, useState} from "react";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {useRouter} from "next/router";
import axios from "axios";
import {create} from '@web3-storage/w3up-client';
//INTERNAL  IMPORT
import {
    NFTMarketplaceABI, NFTMarketplaceAddress,
    TransferFundsABI, TransferFundsAddress
    } from "./constants";


require("dotenv").config();
const fs = require('fs').promises;

// const subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    );

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong while connecting with contract", error);
    }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({children}) => {
    const titleData = "Discover, collect, and sell NFTs";

    //------USESTAT
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const [accountBalance, setAccountBalance] = useState("");
    const router = useRouter();

    //---CHECK IF WALLET IS CONNECTD

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                // console.log(accounts[0]);
            } else {
                // setError("No Account Found");
                // setOpenError(true);
                console.log("No account");
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const getBalance = await provider.getBalance(accounts[0]);
            const bal = ethers.utils.formatEther(getBalance);
            setAccountBalance(bal);
        } catch (error) {
            // setError("Something wrong while connecting to wallet");
            // setOpenError(true);
            console.log("not connected");
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    //---CONNET WALLET FUNCTION
    const connectWallet = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log(accounts);
            setCurrentAccount(accounts[0]);

            window.location.reload();
            connectingWithSmartContract();
        } catch (error) {
            setError("Error while connecting to wallet");
            setOpenError(true);
        }
    };

    const uploadToIPFS = async (file) => {
        const client = await create();
        await client.login('mtblaser2002@gmail.com');
        await client.setCurrentSpace('did:key:z6MkjFtvzqoxrfjGVMBTZmuv6ZM7tpqX1Pvvf7qhcF1Tk39r');

        try {
            // Create a File object from the input file
            const fileObj = new File([file], file.name);
            console.log(fileObj);
            // Upload the File object to Web3.Storage
            const cid = await client.uploadDirectory([fileObj])
            // Construct the IPFS URL
            // https://bafybeianow3zuabxawkms2igj23svkkv3jpx2s3kibib3fzn2n2efi6soa.ipfs.w3s.link
            console.log('passed uploadToIPFS')
            return `https://w3s.link/ipfs/${cid}/${fileObj.name}`;
        } catch (error) {
            console.error("Error uploading to IPFS:", error); // Log the error for debugging
            return null; // Indicate an error occurred
        }
    }

    const createNFT = async (name, price, imagePath, description, router) => {
        console.log(`name: ${name}, price: ${price}, image: ${imagePath}, description: ${description}, router: ${router}`);
        try {
            const client = await create();
            await client.login('mtblaser2002@gmail.com');
            await client.setCurrentSpace('did:key:z6MkjFtvzqoxrfjGVMBTZmuv6ZM7tpqX1Pvvf7qhcF1Tk39r');
            const metadata = {
                name,
                description,
                image: `${imagePath}`
            };
            const metadataFile = new File([JSON.stringify(metadata)], 'metadata.json', {type: 'application/json'});
            const metadataCid = await client.uploadDirectory([metadataFile])
            console.log(`meta: ${metadata} - metadataFile: ${metadataFile}`);
            // Create Sale using metadataCid
            await createSale(`https://w3s.link/ipfs/${metadataCid}/metadata.json`, price);

            router.push("/searchPage");
        } catch (error) {
            console.log(error);
            setError("Error while creating NFT");
            setOpenError(true);
        }
    }

    //--- createSale FUNCTION
    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            console.log(`url: ${url}, formInputPrice: ${formInputPrice}, isReselling: ${isReselling}, id: ${id}`);
            const price = ethers.utils.parseUnits(formInputPrice, "ether");

            const contract = await connectingWithSmartContract();

            const listingPrice = await contract.getListingPrice();

            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contract.resellToken(id, price, {
                    value: listingPrice.toString(),
                });



            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            setError("error while creating sale");
            setOpenError(true);
            if (error.code === -32603 && error.message.includes('Internal JSON-RPC error.')) {
                console.error("Internal JSON-RPC Error:", error);

                if (error.data && error.data.message) {
                    console.error("Detailed Message:", error.data.message);
                } else {
                    console.error("Stack Trace:", error.stack);
                }
            }
        }
    };

    //--FETCHNFTS FUNCTION

    const fetchNFTs = async () => {
        try {
            // const provider = new ethers.providers.JsonRpcProvider(
            //     process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC
            // );
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);

            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItems();

            const items = await Promise.all(
                data.map(
                    async ({tokenId, seller, owner, price: unformattedPrice}) => {
                        const tokenURI = await contract.tokenURI(tokenId);

                        const {
                            data: {image, name, description},
                        } = await axios.get(tokenURI, {});
                        const price = ethers.utils.formatUnits(
                            unformattedPrice.toString(),
                            "ether"
                        );

                        return {
                            price,
                            tokenId: tokenId.toNumber(),
                            seller,
                            owner,
                            image,
                            name,
                            description,
                            tokenURI,
                        };
                    }
                )
            );

            return items;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNFTs();
    }, []);

    //--FETCHING MY NFT OR LISTED NFTs
    const fetchMyNFTsOrListedNFTs = async (type) => {
        try {
            if (currentAccount) {
                const contract = await connectingWithSmartContract();

                const data =
                    type == "fetchItemsListed"
                        ? await contract.fetchItemsListed()
                        : await contract.fetchMyNFTs();

                const items = await Promise.all(
                    data.map(
                        async ({tokenId, seller, owner, price: unformattedPrice}) => {
                            const tokenURI = await contract.tokenURI(tokenId);
                            const {
                                data: {image, name, description},
                            } = await axios.get(tokenURI);
                            const price = ethers.utils.formatUnits(
                                unformattedPrice.toString(),
                                "ether"
                            );

                            return {
                                price,
                                tokenId: tokenId.toNumber(),
                                seller,
                                owner,
                                image,
                                name,
                                description,
                                tokenURI,
                            };
                        }
                    )
                );
                return items;
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchMyNFTsOrListedNFTs();
    }, []);

    //---BUY NFTs FUNCTION
    const buyNFT = async (nft) => {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            });

            await transaction.wait();
            router.push("/author");
        } catch (error) {
            console.log(error.message);
        }
    };

    //------------------------------------------------------------------

    //----TRANSFER FUNDS

    const fetchTransferFundsContract = (signerOrProvider) =>
        new ethers.Contract(
            TransferFundsAddress,
            TransferFundsABI,
            signerOrProvider
        );

    const connectToTransferFunds = async () => {
        try {
            const web3Modal = new Wenb3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchTransferFundsContract(signer);
            return contract;
        } catch (error) {
            console.log(error.message);
        }
    };
    //---TRANSFER FUNDS
    const [transactionCount, setTransactionCount] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const transferEther = async (address, ether, message) => {
        try {
            if (currentAccount) {
                const contract = await connectToTransferFunds();
                console.log(address, ether, message);

                const unFormatedPrice = ethers.utils.parseEther(ether);
                // //FIRST METHOD TO TRANSFER FUND
                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [
                        {
                            from: currentAccount,
                            to: address,
                            gas: "0x5208",
                            value: unFormatedPrice._hex,
                        },
                    ],
                });

                const transaction = await contract.addDataToBlockchain(
                    address,
                    unFormatedPrice,
                    message
                );

                console.log(transaction);

                setLoading(true);
                transaction.wait();
                setLoading(false);

                const transactionCount = await contract.getTransactionCount();
                setTransactionCount(transactionCount.toNumber());
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    //FETCH ALL TRANSACTION
    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const contract = await connectToTransferFunds();

                const availableTransaction = await contract.getAllTransactions();

                const readTransaction = availableTransaction.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(
                        transaction.timestamp.toNumber() * 1000
                    ).toLocaleString(),
                    message: transaction.message,
                    amount: parseInt(transaction.amount._hex) / 10 ** 18,
                }));

                setTransactions(readTransaction);
                console.log(transactions);
            } else {
                console.log("On Ethereum");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                createSale,
                currentAccount,
                titleData,
                setOpenError,
                openError,
                error,
                transferEther,
                getAllTransactions,
                loading,
                accountBalance,
                transactionCount,
                transactions,
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    );
};
