"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import OtherLeaders from "./components/OtherLeaders";
import { leaderService } from "@/services/leaderService";
import { EventType, LeaderBoard } from "@/utils/types";
import TopLeader from "./components/TopLeader";
import { wsService } from "@/services/wsService";

const LeaderBoardComponent: React.FC = () => {
  const [state, setState] = useState<LeaderBoard>();
  useEffect(() => {
    leaderService.getActualLeaderBoard({ skip: 0, take: 10 }).then((res) => {
      if (res) {
        setState(res);
      }
    });
    wsService.socket?.on(
      EventType.UpdatedActualLeaderBoard,
      (data: LeaderBoard) => {
        setState(data);
      }
    );
    return () => {
      wsService.socket?.off(EventType.UpdatedActualLeaderBoard);
    };
  }, []);
  return (
    <div className="leaders-container">
      <div className="leader-board-container">
        <h4 className="leader-board-title">Leaderboard</h4>
        <span className="leader-board-subtitle">
          {state?.rewards
            ?.reduce((init, item) => {
              return init + item.amount;
            }, 0)
            .toLocaleString("de-DE")}{" "}
          Eth prize pool
        </span>
        <p className="leaders-date-range">
          Date range:{" "}
          <span>
            {state?.startDate
              ? new Date(state?.startDate).toISOString().slice(0, 10)
              : "-"}
          </span>{" "}
          to{" "}
          <span>
            {state?.endDate
              ? new Date(state?.endDate).toISOString().slice(0, 10)
              : "-"}
          </span>
        </p>
        <div className="leader-board-list">
          {state?.leaders?.slice(0, 3).map((leader, index) => (
            <TopLeader
              key={leader.user?.username ?? "" + index}
              index={index + 1}
              {...leader}
              reward={state.rewards?.find(
                (item) => item.id === leader.rewardId
              )}
            />
          ))}
        </div>
      </div>
      <OtherLeaders
        leaders={
          state?.leaders?.slice(3).map((leader) => ({
            ...leader,
            reward: state.rewards?.find((item) => item.id === leader.rewardId),
          })) ?? []
        }
      />
    </div>
  );
};

export default LeaderBoardComponent;
