import { FindManyArgs, Leader, LeaderBoard } from "@/utils/types";
import { query, createQueryBody, createQuery } from "./graphqlService";

const getLeaderBoardBaseQueryBody = `
query getLeaderBoard (
    $take: Float,
    $skip: Float,
  ) {
    getLeaderBoard(
        take: $take,
        skip: $skip,
    ) { 
  $output
}}`;

export class LeaderService {
  async getActualLeaderBoard(data: FindManyArgs) {
    const res = await query(
      createQuery(getLeaderBoardBaseQueryBody, {
        id: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        updatedAt: true,
        rewards: {
          id: true,
          order: true,
          amount: true,
        },
        leaders: {
          id: true,
          amount: true,
          rewardId: true,
          createdAt: true,
          updatedAt: true,
          user: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      }),
      data
    );
    return res as LeaderBoard;
  }
}

export const leaderService = new LeaderService();
