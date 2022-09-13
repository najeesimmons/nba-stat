import { useState } from "react";

const PlayerDisplay = (props) => {
  const [playerStats, setPlayerStats] = useState(null);

  const getPlayerStats = async () => {
    try {
      const response = await fetch(
        `${props.URL}season_averages?player_ids[]=${props.player._id}?`
      );
      const data = await response.json();
      console.log(data);
      setPlayerStats(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const playerName = props.player;
  if (playerName) {
    return (
      <h2>
        {props.player.first_name} {props.player.last_name}, POS:
        {props.player.position} - {props.player._id}
      </h2>
    );
  }

  return (
    <>
      {playerName}
      {playerStats !== null && <div>{playerStats.season}</div>}
    </>
  );
};

export default PlayerDisplay;
