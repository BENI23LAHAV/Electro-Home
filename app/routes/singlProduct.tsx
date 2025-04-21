import { useState } from "react";
import type { Product } from "../lib/definitions";
import {
  StarRating,
  Sale,
  New,
  EnterByDot,
  FinalPrice,
  LargeImage,
  SmallImage,
  Specification,
  Quantity,
  TrackComponent,
  ClockComponent,
  LocationComponent,
} from "./singlProductComponents";

export default function SingleProduct() {
  const [currentImage, setCurrentImage] = useState<string>(
    exampleProduct.images[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="mt-20 flex flex-row justify-between mr-[2%]">
      <div className="w-1/2 ">
        <div className="max-w-[95%] min-w-[95%] h-[500px] p-10 bg-white  rounded-md my-5 shadow-[var(--shadow-card)] overflow-hidden">
          <LargeImage url={currentImage} />
        </div>
        <div className="flex flex-row justify-start gap-2 my-5">
          {exampleProduct.images.map((item, k) => (
            <SmallImage
              key={k}
              url={item}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-col items-start w-1/2">
        <div className="w-[90%] mx-auto">
          <div className="">
            {" "}
            {/* <New /> */}
            {exampleProduct.discount > 0 && <Sale />}
          </div>
          <h1 className="text-5xl font-bold">{exampleProduct.name}</h1>
          <span className="text-[var(--color-gray-500)] flex flex-row gap-5 mt-2 py-2">
            {/* <StarRating rating={Math.floor(Math.random() * 10 + 1) / 2} />
          {Math.floor(Math.random() * 30 + 1) + " ביקורות"} */}
          </span>

          <FinalPrice
            price={exampleProduct.price}
            discount={exampleProduct.discount}
          />
          <EnterByDot>{exampleProduct.description}</EnterByDot>
          <Specification specification={exampleProduct.specifications} />
          <Quantity quantity={quantity} setQuantity={setQuantity} />

          <button
            className="w-full  py-3 mt-5 bg-[var(--color-primary)] text-white rounded-full 
          font-semibold
        hover:bg-[var(--color-primary-dark)] hover:cursor-pointer duration-300">
            הוספה לסל
          </button>
          <div className="flex flex-row my-10 justify-between">
            <DeliveryConditons
              title="משלוח חינם"
              text="משלוח לכל חלקי הארץ ללא עלות"
              Icon={<TrackComponent />}
            />
            <DeliveryConditons
              title="זמן אספקה"
              text="3-5 ימי עסקים
"
              Icon={<ClockComponent />}
            />
            <DeliveryConditons
              title="התקנה מקצועית"
              text="שירות התקנה זמין בתוספת תשלום"
              Icon={<LocationComponent />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
interface test extends Product {
  specifications?: TVexample;
}

const exampleProduct: test = {
  id: 1005,
  name: "סמסונג The Frame 43 אינץ'",
  description:
    "טלוויזיה חכמה עם עיצוב ייחודי המחקה מסגרת תמונה. מצב אמנות מובנה להצגת יצירות אמנות כשהטלוויזיה במצב כבוי.",
  images: [
    "https://d3m9l0v76dty0.cloudfront.net/system/photos/12879994/large/81c1a950953bcc83d981a81e78fd3240.png",
    "https://d3m9l0v76dty0.cloudfront.net/system/photos/12879995/large/c90112f806763b8c3df33619a8090fe2.png",
    "https://d3m9l0v76dty0.cloudfront.net/system/photos/12879996/large/2f238044c324d150175bb083756d4ba2.png",
    "https://d3m9l0v76dty0.cloudfront.net/system/photos/12879998/large/922ab11b3e142c3e8c643cec283591da.png",
  ],
  specifications: {
    screen: "43 אינץ'",
    resolution: "4K",
    smartTv: true,
    hdmi: true,
    usb: true,
    audio: "2.1",
    bluetooth: true,
  },
  price: 4299,
  discount: 300,
  categories: ["televisions"],
  amount: 7,
};

type TVexample = {
  screen: number | string;
  resolution: number | string;
  smartTv: boolean;
  hdmi: boolean;
  usb: boolean;
  audio: number | string;
  bluetooth: boolean;
};

function DeliveryConditons({
  title,
  text,
  Icon,
}: {
  title: string;
  text: string;
  Icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 w-[30%] text-center shadow-[var(--shadow-card)] rounded-xl p-5">
      <span className="bg-[var(--color-gray-200)] rounded-full p-2">
        {Icon}
      </span>
      <span className="font-semibold text-[var(--color-dark)]">{title}</span>
      <span className="text-[var(--color-gray-600)]">{text}</span>
    </div>
  );
}
