import React from "react";
import { Leaderboard } from "../components";

function LeaderboardPage() {
  return (
    <div>
      <Leaderboard final={true} limit={0} />
    </div>
  );
}

export default LeaderboardPage;
