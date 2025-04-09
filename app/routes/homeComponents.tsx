import image1 from "app/lib/images/image1.jpeg";
import { Soon } from "./navbar";
import { Link } from "react-router";
function HeadPage() {
  return (
    <div
      className=" h-[85vh] mx-auto  p-10  rounded-md
  // bg-[linear-gradient(45deg,rgba(43,156,216,0.03),rgba(92,209,164,0.05))]
  bg-[#f4f8fb]
       flex flex-row justify-between items-center">
      <div className="flex flex-col gap-4">
        <Title />
        <Subtitle />
        <div className="flex flex-row gap-4">
          <HomeButton>
            {" "}
            <Link to="/products">מוצרים </Link>
          </HomeButton>
          <HomeButton>
            {" "}
            מבצעים מיוחדים <Soon />
          </HomeButton>
        </div>
      </div>
      <HomeImage />
    </div>
  );
}

function Title() {
  return (
    <h1
      className="
    text-6xl font-bold font-monospace
    text-transparent bg-clip-text
    bg-gradient-to-r from-[var(--gradient-orange-start)] to-[var(--gradient-orange-end)]
  ">
      חוויית קניה <br /> עתידנית
    </h1>
  );
}

function Subtitle() {
  return (
    <h2 className="text-md text-[#666666] leading-relaxed">
      גלה את הדור הבא של מוצרי אלקטרוניקה וטכנולוגיה מתקדמת. מחירים מיוחדים
      <br />
      ומשלוח חינם בכל הזמנה.
    </h2>
  );
}
function HomeImage(props: any) {
  return (
    <img
      src={image1}
      alt="future tech"
      className="w-[500px] h-[400px] object-fill animate-[float_6s_ease-in-out_infinite] rounded-sm z-[0]
  "
    />
  );
}

function HomeButton(props: any) {
  return (
    <button
      className="px-4 py-2 bg-[linear-gradient(45deg,rgba(43,156,216,0.03),rgba(92,209,164,0.05))]
        border-[var(--color-primary)] border-[2.5px]
        text-[var(--color-primary)] rounded-full hover:bg-gradient-to-r hover:from-[var(--color-primary)]
        hover:to-[var(--color-primary)] hover:text-white
        hover:translate-y-[-5px] hover:duration-300 hover:shadow-[0_10px_20px_rgba(110,0,255,0.2)]">
      {props.children}
    </button>
  );
}
export { HeadPage, Title, Subtitle, HomeImage, HomeButton };
