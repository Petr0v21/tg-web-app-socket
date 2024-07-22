import { ReactNode } from "react";

export enum LigaEnum {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  DIAMOND = "DIAMOND",
}

export type UserLevel = {
  exp: number;
  level: number;
  liga: LigaEnum;
};

export type User = {
  id: string;
  telegramId: string;
  username?: string;
  fullname: string;
  avatar?: string;
  balance: number;
  nextLevel?: UserLevel;
  createdAt: Date;
  updatedAt: Date;
} & UserLevel;

export enum CoinSide {
  HEADS = "HEADS",
  TAILS = "TAILS",
}

export type MutationPlayArgs = {
  bet: number;
  side: CoinSide;
};

export type QueryGetHistoryArgs = {
  take?: number;
  skip?: number;
};

export type BetDto = {
  id: string;
  amount: number;
  payout: number;
};

export type CoinFlipGameDto = {
  id: string;
  isWon: boolean;
  sideSelected: CoinSide;
  sideResult: CoinSide;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type GameDto = CoinFlipGameDto & {
  User: User;
  bet: BetDto;
};

export type CoinFlipBetGameDto = BetDto & {
  game: CoinFlipGameDto;
};

export type BetAmountPropsType = {
  betAmount?: number;
  setBetAmount: (amount: number) => void;
};

export type GameBetFormType = {
  side: CoinSide;
  amount: number;
  isWon?: boolean;
  inFlip?: boolean;
};

export type GameFormType = {
  bet: GameBetFormType;
  setBet: React.Dispatch<React.SetStateAction<GameBetFormType>>;
  formHandler: () => void;
  user?: User;
};

export type LightsWrapperProps = {
  children: ReactNode;
  lightNumber: number;
};

export type LightProps = { index: number; l: number };

export type StatisticsType = {
  activeClients: number;
  games: GameDto[];
  ratioSides: [number, number];
  house: number;
  clientId?: string;
};

export enum EventType {
  UpdateUserBalance = "UpdateUserBalance",
  UpdateHistory = "UpdateHistory",
  UpdateActiveClients = "UpdateActiveClients",
  UpdatedActualLeaderBoard = "UpdatedActualLeaderBoard",
}

export type ActiveClientsType = {
  activeClients: number;
};

export type ProfileStatisticsType = {
  totalBets: number;
  winningBets: number;
  headsGames: number;
  tailsGames: number;
  highestPayout: number;
  leaderboardPlace?: number;
};

export type ProvablyFairDto = {
  id: string;
  clientSeed: string;
  serverSeed: string;
  nonce: number;
};

export enum RewardStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  PENDING = "PENDING",
}

export enum LeaderBoardStatus {
  CLOSED = "CLOSED",
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
}

export type LeaderBoardReward = {
  id: string;
  order: number;
  amount: number;
  status: RewardStatus;
};

export type Leader = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  userId: string;
  user?: User;
  leaderBoardId: string;
  rewardId?: string;
  reward?: LeaderBoardReward;
};

export type LeaderBoard = {
  id: string;

  status: LeaderBoardStatus;
  startDate: Date;
  endDate: Date;

  createdAt: Date;
  updatedAt: Date;

  rewards?: LeaderBoardReward[];
  leaders?: Leader[];
};

export type FindManyArgs = {
  take?: number;
  skip?: number;
};

export enum TransactionTypeEnum {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}

export enum TransactionStatusEnum {
  CREATED = "CREATED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CONFIRMED = "CONFIRMED",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
}

export type TransactionType = {
  id: string;
  amount: number;
  currency: string;
  status: TransactionStatusEnum;
  type: TransactionTypeEnum;
  notes?: string;
  usdAmount?: number;
  requestId?: string;
  from?: string;
  to?: string;
  fee?: number;
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
};

export type GetTransactionsResponse = {
  totalPages?: number;
  transactions: TransactionType[];
};

export type GetTransactionsArgs = {
  take?: number;
  skip?: number;
  type: TransactionTypeEnum;
};

export type DepositArgs = {
  currency: string;
  amount: number;
};

export type WithdrawArgs = DepositArgs & {
  address: string;
};

export type DepositResult = {
  address: string;
  exchangeRate: number;
};

export type SuccessOutput = {
  success: boolean;
};
