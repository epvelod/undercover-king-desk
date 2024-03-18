import "./App.css";
import Chessboard from "./presentation/Chessboard/Chessboard";

function App() {

  return (
    <div className="w-full bg-teal-900 flex justify-center">
      <div className="p-16 m-10 rounded-lg bg-stone-200">
        <div style={{ position: "relative" }}>
          <div style={{ position: "relative" }}>
            <Chessboard></Chessboard>
          </div>
          <div style={{ position: "absolute", top: "0" }}>
            {/* <Chessboard distribution={markers}></Chessboard> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
