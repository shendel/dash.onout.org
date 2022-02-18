import walletCover from "./images/wallet-cover.jpg";
import nftsyCover from "./images/nftsy-cover.jpg";
import lotteryCover from "./images/lottery-cover.jpg";
import farmingCover from "./images/farming-cover.jpg";
import dexCover from "./images/dex-cover.jpg";
import daoCover from "./images/dao-cover.jpg";
import crossChainCover from "./images/cross-chain-cover.jpg";

import ETHEREUM from './images/ethereum.svg'
import BSC from './images/bsc.svg'
import POLYGON from './images/polygon.svg'

//@ts-ignore
import definance from "./plugins/definance.zip";
//@ts-ignore
import daofactory from "./plugins/daofactory.zip";
//@ts-ignore
import farmfactory from "./plugins/farmfactory.zip";
//@ts-ignore
import lotteryfactory from "./plugins/lotteryfactory.zip";
//@ts-ignore
import multicurrencywallet from "./plugins/multicurrencywallet.zip";

export const COVERS: { [k: string]: string } = {
  walletCover,
  nftsyCover,
  lotteryCover,
  farmingCover,
  dexCover,
  daoCover,
  crossChainCover,
};

export const NETWORKS: { [k: number]: string } = {
  1: ETHEREUM,
  56: BSC,
  137: POLYGON,
}

export const PLUGINS: { [id: string]: string } = {
  definance,
  daofactory,
  farmfactory,
  lotteryfactory,
  multicurrencywallet,
};