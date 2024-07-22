import {
  DepositArgs,
  DepositResult,
  GetTransactionsArgs,
  GetTransactionsResponse,
  SuccessOutput,
  WithdrawArgs,
} from "@/utils/types";
import { query, createQueryBody } from "./graphqlService";

const getMyTransactionsBaseQueryBody = `
query getMyTransactions (
    $type: TransactionType!
    $take: Float,
    $skip: Float,
  ) {
    getMyTransactions(
        type: $type,
        take: $take,
        skip: $skip,
    ) { 
  $output
}}`;

const depositBaseQueryBody = `
mutation deposit (
    $currency: String!
    $amount: Float!,
  ) {
    deposit(
      currency: $currency,
      amount: $amount,
    ) { 
  $output
}}`;

const withdrawBaseQueryBody = `
mutation withdraw (
    $currency: String!
    $amount: Float!,
    $address: String!,
  ) {
    withdraw(
      currency: $currency,
      amount: $amount,
      address: $address,
    ) { 
  $output
}}`;

export class PaymentService {
  async getMyTransactions(data: GetTransactionsArgs) {
    const res = await query(
      createQueryBody(getMyTransactionsBaseQueryBody, {
        totalPages: true,
        transactions: {
          id: true,
          amount: true,
          currency: true,
          status: true,
          type: true,
          notes: true,
          userId: true,
          from: true,
          to: true,
          usdAmount: true,
          requestId: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      data
    );
    return res as GetTransactionsResponse;
  }

  async deposit(data: DepositArgs) {
    const res = await query(
      createQueryBody(depositBaseQueryBody, {
        address: true,
        exchangeRate: true,
      }),
      data
    );
    return res as DepositResult;
  }

  async withdraw(data: WithdrawArgs) {
    const res = await query(
      createQueryBody(withdrawBaseQueryBody, {
        success: true,
      }),
      data
    );
    return res as SuccessOutput;
  }
}

export const paymentService = new PaymentService();
