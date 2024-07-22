import {
  CoinFlipBetGameDto,
  GameDto,
  MutationPlayArgs,
  QueryGetHistoryArgs,
} from "@/utils/types";
import { query, createQueryBody } from "./graphqlService";

const playBaseQueryBody = `
mutation play (
  $bet: Float!,
  $side: CoinSide!
) {
play(
    bet: $bet,
    side: $side, 
) { 
  $output
}}`;

const getHistoryBaseQueryBody = `
query getHistory (
  $take: Float,
  $skip: Float,
) {
    getHistory(
    take: $take, 
    skip: $skip,
) { 
  $output
}}`;

export class GameService {
  async play(data: MutationPlayArgs) {
    const res = await query(
      createQueryBody(playBaseQueryBody, {
        id: true,
        amount: true,
        payout: true,
        game: {
          id: true,
          isWon: true,
          sideSelected: true,
          sideResult: true,
          userId: true,
        },
      }),
      data
    );
    return res as CoinFlipBetGameDto;
  }

  async getHistory(data: QueryGetHistoryArgs) {
    const res = await query(
      createQueryBody(getHistoryBaseQueryBody, {
        id: true,
        isWon: true,
        sideSelected: true,
        sideResult: true,
        createdAt: true,
        updatedAt: true,
        User: {
          id: true,
          username: true,
          fullname: true,
          avatar: true,
        },
        bet: {
          id: true,
          amount: true,
          payout: true,
        },
      }),
      data
    );
    return res as GameDto[];
  }
}

export const gameService = new GameService();
