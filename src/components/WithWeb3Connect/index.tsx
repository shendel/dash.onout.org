import { createContext, useState } from "react";
import { utils } from "ethers";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { NETWORKS } from "../../constants";
import useUser from "../../hooks/useUser";
import { UserActions } from "../UserProvider";

import "./index.css";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

type Web3ConnectState = {
  connected: boolean;
  provider: any | null;
  networkId: number | undefined;
  wrongNetwork: boolean;
  address: string;
  balance: string;
};

const initialWeb3ConnectState: Web3ConnectState = {
  connected: false,
  provider: null,
  networkId: undefined,
  wrongNetwork: false,
  address: "",
  balance: utils.formatEther(0),
};

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera
  providerOptions, // required
});

type WithModalProps = {
  children?: any;
};

export const Web3ConnecStateContext = createContext({
  account: initialWeb3ConnectState,
  isWeb3Loading: false,
});

const WithWeb3Connect = ({ children }: WithModalProps) => {
  const [account, setAccount] = useState<Web3ConnectState>(
    initialWeb3ConnectState
  );
  const [isWeb3Loading, setIsWeb3Loading] = useState(false);
  const { dispatch } = useUser();

  async function connect() {
    const web3ModalProvider = await web3Modal.connect();
    const provider = new Web3(web3ModalProvider);

    async function setAccountFromProvider() {
      setIsWeb3Loading(true);
      try {
        const accaunts = await provider.eth.getAccounts();
        const balance = await provider.eth.getBalance(accaunts[0]);
        const networkId = await provider.eth.net.getId();

        setAccount({
          connected: true,
          provider,
          networkId,
          //@ts-ignore
          wrongNetwork: !NETWORKS[networkId],
          address: accaunts[0],
          balance: utils.formatEther(balance),
        });
      } catch (error) {
        console.log(error);
        setAccount(initialWeb3ConnectState);
      } finally {
        setIsWeb3Loading(false);
      }
    }

    setAccountFromProvider();

    web3ModalProvider.on("accountsChanged", (accounts: string[]) => {
      if (accounts[0].toLowerCase() !== account.address.toLowerCase()) {
        dispatch({
          type: UserActions.signed,
          payload: false,
        });
        dispatch({
          type: UserActions.signed,
          payload: false,
        });
      }

      setAccountFromProvider();
    });

    web3ModalProvider.on("close", () => {
      setAccount(initialWeb3ConnectState);
    });

    web3ModalProvider.on("chainChanged", (chainId: number) => {
      setAccount((prevState) => ({
        ...prevState,
        //@ts-ignore
        wrongNetwork: !NETWORKS[Number(chainId)],
      }));
    });
  }

  async function disconnect() {
    dispatch({
      type: UserActions.signed,
      payload: false,
    });
    dispatch({
      type: UserActions.changeView,
      payload: "products",
    });
    // @ts-ignore
    if (account?.provider?.close) {
      // @ts-ignore
      await account.provider.close();

      // If the cached provider is not cleared,
      // WalletConnect will default to the existing session
      // and does not allow to re-scan the QR code with a new wallet.
      // Depending on your use case you may want or want not his behavir.
    }

    setAccount(initialWeb3ConnectState);
  }

  const { address, wrongNetwork } = account;

  const web3ConnectContent = (
    <div className="Web3Connect">
      {isWeb3Loading ? (
        <p className="pending">Loading</p>
      ) : !account.connected ? (
        <button className="primaryBtn connectButton" onClick={connect}>
          Connect to wallet
        </button>
      ) : (
        <div className="account">
          <div className="accountHeader">
            <span className="address">
              {address.slice(0, 6)}...
              {address.slice(address.length - 4, address.length)}
            </span>

            <button
              className="secondaryBtn disconnectButton"
              onClick={disconnect}
            >
              Disconnect
            </button>
          </div>

          {wrongNetwork && (
            <div className="warning">
              Please switch to one of the supported networks:
              <ul className="networksList">
                {Object.values(NETWORKS).map(({ name }, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <Web3ConnecStateContext.Provider value={{ account, isWeb3Loading }}>
      {web3ConnectContent}
      {children}
    </Web3ConnecStateContext.Provider>
  );
};

export default WithWeb3Connect;