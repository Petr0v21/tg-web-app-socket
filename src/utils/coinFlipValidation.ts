import { GameBetFormType, User } from "./types";

export const validationFormGame = (bet: GameBetFormType, user?: User) => {
  if (!bet.side) {
    throw new Error("Choose side coin");
  }
  if (!bet.amount) {
    throw new Error("Choose amount");
  }
  if (bet.amount <= 0) {
    throw new Error("Bet must be more then 0");
  }
  if (!user) {
    throw new Error("You must be authed user");
  }
  if (user.balance < bet.amount) {
    throw new Error("Your balance is too low for this bet");
  }
};
