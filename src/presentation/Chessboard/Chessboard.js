import "./Chessboard.css";

function Chessboard({distribution}) {
  let board = Array.from({ length: 64 }, (_, index) => (
    <div
      key={index}
      className={`size-20 flex justify-center items-center ${
        (index - parseInt(index / 8)) % 2 ? "bg-slate-400" : ""
      }`}
    >
      {distribution[index]}
    </div>
  ));
  return <div className="grid grid-cols-8 w-fit">{board}</div>;
}

export default Chessboard;
