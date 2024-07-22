import { ProfileStatisticsType, ProvablyFairDto, User } from "@/utils/types";
import { query, createQueryBody } from "./graphqlService";

const getMeBaseQueryBody = `
query getMe {
    getMe { 
  $output
}}`;

const getMyStatisticsBaseQueryBody = `
query getMyStatistics {
  getMyStatistics { 
  $output
}}`;

const getCurrentSeedsBaseQueryBody = `
query getCurrentSeeds {
  getCurrentSeeds { 
  $output
}}`;

export class UserService {
  async getMe() {
    const res = await query(
      createQueryBody(getMeBaseQueryBody, {
        id: true,
        telegramId: true,
        username: true,
        fullname: true,
        avatar: true,
        balance: true,
        exp: true,
        level: true,
        liga: true,
        nextLevel: {
          exp: true,
          level: true,
          liga: true,
        },
        createdAt: true,
        updatedAt: true,
      }),
      null
    );
    return res as User;
  }

  async getMyStatistics() {
    const res = await query(
      createQueryBody(getMyStatisticsBaseQueryBody, {
        totalBets: true,
        winningBets: true,
        headsGames: true,
        tailsGames: true,
        highestPayout: true,
        leaderboardPlace: true,
      }),
      null
    );
    return res as ProfileStatisticsType;
  }

  async getCurrentSeeds() {
    const res = await query(
      createQueryBody(getCurrentSeedsBaseQueryBody, {
        id: true,
        clientSeed: true,
        serverSeed: true,
        nonce: true,
      }),
      null
    );
    return res as ProvablyFairDto;
  }
}

export const userService = new UserService();
