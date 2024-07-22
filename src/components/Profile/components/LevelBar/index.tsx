"use client";
import React from "react";
import "./index.css";
import { useUser } from "@/context/user.provider";

const LevelBar: React.FC = () => {
  const user = useUser();

  return (
    <div className="level-bar-container">
      <div className="level-bar">
        <div
          className="level-bar-fill"
          style={{
            width:
              (((user?.exp ?? 0) * 100) / (user?.nextLevel?.exp ?? 1)) * 3.2,
          }}
        />
      </div>
      <div className="level-bar-details">
        <p className="level-number">
          Level: {user?.liga} {user?.level}
        </p>
        <p className="level-exp-details">
          <span className="level-exp-details-fill">{user?.exp}</span>/
          <span>{user?.nextLevel?.exp}exp</span>
        </p>
      </div>
    </div>
  );
};

export default LevelBar;
