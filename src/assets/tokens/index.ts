import RUNE from "./rune.png";
import RUJI from "./ruji.png";
import USDT from "./usdt.png";
import TCY from "./tcy.png";
import ETH from "./eth.png";
import USDC from "./usdc.png";

import { CoinTicker } from "../../const/coinTickerMap";

export const tokenLogoMap = {
    [CoinTicker.RUNE]: RUNE,
    [CoinTicker.RUJI]: RUJI,
    [CoinTicker.TCY]: TCY,
    [CoinTicker.USDT]: USDT,
    [CoinTicker.ETH]: ETH,
    [CoinTicker.USDC]: USDC,
} as const;