import "./App.css";
import Chart from "./components/Chart";
import useFetchData, { Cd } from "./hooks/useFetchData";

function App() {
  const { data, loading, error } = useFetchData();

  const lowerEast =
    data && data.find((cd: Cd) => cd.cd_name === "Lower East Side, Chinatown");
  console.log(lowerEast);

  return (
    <div className="App">
      {/* <h1>D3.js Practice</h1> */}
      <h1>D3 Line Chart of NYC Population (By Area)</h1>
      {!loading && error && <p>Error: Data Not Found</p>}
      {loading ? <p>Loading...</p> : <Chart data={lowerEast} />}
    </div>
  );
}

export default App;
