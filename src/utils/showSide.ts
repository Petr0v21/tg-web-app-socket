import { CoinSide, GameBetFormType } from "./types";

export const showSide = (bet: GameBetFormType) => {
  if (bet.side && bet.isWon !== undefined) {
    if (bet.isWon) {
      return bet.side.toLowerCase();
    }
    return bet.side === CoinSide.HEADS
      ? CoinSide.TAILS.toLowerCase()
      : CoinSide.HEADS.toLowerCase();
  }
  return undefined;
};
