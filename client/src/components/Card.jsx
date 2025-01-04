import cardTextBlack from "../images/cardTextBlack.svg";
import cardTextWhite from "../images/cardTextWhite.svg";

export default function Card({ color, text, tailwind, onClick, style }) {
  return (
    <div
      className={`w-[250px] h-[350px] border-2 rounded-lg px-[25px] py-[20px] flex flex-col justify-between ${
        color === "black" ? "border-white bg-black" : "border-black bg-white"
      } ${tailwind}`}
      onClick={onClick}
      style={style}
    >
      <div
        className={`font-bold text-[21px] ${
          color === "black" ? "text-white" : "text-black"
        }`}
      >
        {text}
      </div>
      <img
        src={color === "black" ? cardTextWhite : cardTextBlack}
        alt="Cards Against Humanity Logo"
        width="300px"
        height="100px"
        priority
      />
    </div>
  );
}
