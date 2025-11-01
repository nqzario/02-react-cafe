import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOption from "../VoteOption/VoteOption";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import { useState } from "react";
import type { Votes, VoteType } from "../../types/votes";

function App() {
  const [vote, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });

  function handleVote(type: VoteType) {
    const NewVotes = {
      good: vote.good,
      neutral: vote.neutral,
      bad: vote.bad,
    };

    if (type === "good") {
      NewVotes.good = NewVotes.good + 1;
    } else if (type === "neutral") {
      NewVotes.neutral = NewVotes.neutral + 1;
    } else {
      NewVotes.bad = NewVotes.bad + 1;
    }
    setVotes(NewVotes);
  }
  function resetVotes() {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  }
  const totalVotes = vote.bad + vote.good + vote.neutral;
  const positiveRate =
    vote.bad + vote.good + vote.neutral
      ? Math.round((vote.good / totalVotes) * 100)
      : 0;
  return (
    <div className={css.app}>
      <CafeInfo />
      {totalVotes > 0 ? (
        <VoteOption onVote={handleVote} onReset={resetVotes} canReset={true} />
      ) : (
        <VoteOption onVote={handleVote} onReset={resetVotes} canReset={false} />
      )}
      {totalVotes > 0 ? (
        <VoteStats
          votes={vote}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
export default App;
