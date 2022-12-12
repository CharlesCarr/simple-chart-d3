import "./App.css";
import Chart from "./components/Chart";
import useFetchData, { Cd } from "./hooks/useFetchData";

function App() {

  const { data, loading, error } = useFetchData();

  const lowerEast = data && data.find((cd: Cd) => (cd.cd_name === 'Lower East Side, Chinatown'));
  console.log(lowerEast);


  return (
    <div className="App">
      <h1>D3.js Practice</h1>
      <Chart data={data} />
    </div>
  );
}

export default App;
