import { useState } from "react";
import "./App.css";
import Nav from "./UI/Nav";
import PlayerInfo from "./components/PlayerDisplay";

function App() {
  const [player, setPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);

  const URL = "https://www.balldontlie.io/api/v1";

  const parsePlayers = (data) =>
    data.map((d) => {
      return {
        _id: d?.id,
        first_name: d?.first_name,
        last_name: d?.last_name,
        position: d?.position,
        height_feet: d?.height_feet,
        height_inches: d?.height_inches,
        weight_pounds: d?.weight_pounds,
      };
    });

  const getPlayer = async (e) => {
    try {
      const response = await fetch(`${URL}/players/?search=${searchTerm}`);
      const data = await response.json();
      setResult(parsePlayers(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPlayer();
  };

  const handleClick = (r) => {
    setPlayer(r);
  };

  return (
    <>
      <Nav />
      <div className="app-container">
      <div>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={searchTerm} />
          <button>Search</button>
        </form>
        
          {result.length > 0 &&
            result.map((r) => (
              // must pass dynamically rendered data below
              <p key={r._id} onClick={() => handleClick(r)}>
                {r.first_name} {r.last_name}
              </p>
            ))}
        </div>
        <PlayerInfo URL={URL} player={player} />
      </div>
    </>
  );
}

export default App;
