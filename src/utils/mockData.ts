import { CoinSide } from "./types";

export const mockData = {
  leaders: [
    {
      avatar: "https://shakita-hookah.s3.eu-central-1.amazonaws.com/772526893",
      username: "petr0v_21",
      details: {
        reward: 400,
        netGains: 5000,
        lastFlip: new Date("2024-06-24 18:00"),
      },
      index: 1,
    },
    {
      avatar: "https://shakita-hookah.s3.eu-central-1.amazonaws.com/772526893",
      username: "petr0v_22",
      details: {
        reward: 400,
        netGains: 5000,
        lastFlip: new Date("2023-11-02"),
      },
      index: 2,
    },
    {
      avatar: "https://shakita-hookah.s3.eu-central-1.amazonaws.com/772526893",
      username: "petr0v_23",
      details: {
        reward: 400,
        netGains: 5000,
        lastFlip: new Date("2024-06-24 12:00"),
      },
      index: 3,
    },
  ],
  recentPlays: [
    {
      id: "test1",
      isWon: true,
      sideSelected: CoinSide.HEADS,
      sideResult: CoinSide.HEADS,
      bet: {
        id: "eadaw",
        amount: 10,
        payout: 20,
      },
      User: {
        id: "1",
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        fullname: "fullanme",
        username: "petr0v_21",
        avatar:
          "https://shakita-hookah.s3.eu-central-1.amazonaws.com/772526893",
        telegramId: "21323123",
      },
    },
    {
      id: "test2",
      isWon: true,
      sideSelected: CoinSide.HEADS,
      sideResult: CoinSide.TAILS,
      bet: {
        id: "eadaw",
        amount: 10,
        payout: 0,
      },
      User: {
        id: "1",
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: "petr0v_21",
        avatar:
          "https://shakita-hookah.s3.eu-central-1.amazonaws.com/772526893",
        fullname: "fullanme",
        telegramId: "21323123",
      },
    },
    {
      id: "test3",
      isWon: false,
      sideSelected: CoinSide.TAILS,
      sideResult: CoinSide.HEADS,
      bet: {
        id: "eadaw",
        amount: 10,
        payout: 0,
      },
      User: {
        id: "1",
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: "petr0v_21",
        avatar:
          "https://shakita-hookah.s3.eu-central-1.amazonaws.com/772526893",
        fullname: "fullanme",
        telegramId: "21323123",
      },
    },
  ],
  activeClients: 245,
  ratioSides: [50, 50],
  house: 255000,
  transactions: [
    {
      id: 1111,
      amount: 0.11,
      currency: "ETH",
      status: "Pending",
      createdAt: new Date("2023-11-01 11:01"),
    },
    {
      id: 2222,
      amount: 0.11,
      currency: "ETH",
      status: "Pending",
      createdAt: new Date("2023-10-01 11:01"),
    },
    {
      id: 2131,
      amount: 0.11,
      currency: "ETH",
      status: "Pending",
      createdAt: new Date("2024-07-01 11:01"),
    },
    {
      id: 2311,
      amount: 0.11,
      currency: "ETH",
      status: "Pending",
      createdAt: new Date("2023-11-01 11:01"),
    },
    {
      id: 3213,
      amount: 0.11,
      currency: "ETH",
      status: "Pending",
      createdAt: new Date("2024-04-01 11:01"),
    },
    {
      id: 3123,
      amount: 0.11,
      currency: "ETH",
      status: "Pending",
      createdAt: new Date("2024-01-01 11:01"),
    },
    {
      id: 1432,
      amount: 0.11,
      currency: "ETH",
      status: "Pending",
      createdAt: new Date("2023-10-01 11:01"),
    },
  ],
};
