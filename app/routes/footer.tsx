import path from "path";
import { Logo } from "../lib/DesignComponents";
import { FooterUnderline, ATag } from "../lib/DesignComponents";
import {
  FacebookComponent,
  InstegramComponent,
  TwiterComponent,
} from "../lib/DesignComponents";
const quickLinks = [
  { name: "דף הבית", path: "/" },
  { name: "מוצרים", path: "/#our-products" },
  { name: "אודות", path: null },
  { name: "צור קשר", path: null },
];
const supportLinks = [
  {
    name: "מדיניות משלוחים",
    path: null,
  },
  {
    name: "מדיניות החזרות",
    path: null,
  },
  {
    name: "שאלות נפוצות",
    path: null,
  },
  {
    name: "תנאי שימוש",
    path: null,
  },
];
const contactInfo = ["info@example.com", "03-1234567", "אחד העם 1, תל אביב"];

export default function Footer() {
  return (
    <div className="bg-[var(--color-dark)] min-w-full h-95 text-white">
      <div className="flex flex-row justify-around pt-15">
        <div className="">
          <Logo showIcon={false} />
          <p className="mt-5">
            {" "}
            אנו מספקים את המוצרים הטובים ביותר בתחום האלקטרוניקה.
          </p>
          <p>אצלנו תמצאו מוצרים מהחברות המובילות במחירים אטרקטיביים.</p>

          <div className="flex flex-row space-x-3 pt-5">
            <div
              className="bg-[rgba(255,255,255,0.1)] max-w-fit max-h-fit rounded-full overflow-hidden p-3
             transition-[var(--transition-default)] hover:translate-y-[-5px] hover:bg-[var(--color-primary-light)] duration-300">
              {" "}
              <FacebookComponent />
            </div>
            <div
              className="bg-[rgba(255,255,255,0.1)] max-w-fit max-h-fit rounded-full overflow-hidden p-3
            transition-[var(--transition-default)] hover:translate-y-[-5px] hover:bg-[var(--color-primary-light)] duration-300">
              {" "}
              <InstegramComponent />
            </div>
            <div
              className="bg-[rgba(255,255,255,0.1)] max-w-fit max-h-fit rounded-full overflow-hidden p-3
            transition-[var(--transition-default)] hover:translate-y-[-5px] hover:bg-[var(--color-primary-light)] duration-300">
              {" "}
              <TwiterComponent />
            </div>
          </div>
        </div>
        <div className=" relative flex flex-col space-y-3">
          {" "}
          <h3 className="text-lg font-bold  ">קישורים מהירים</h3>{" "}
          <FooterUnderline />
          {quickLinks.map((item, k) => (
            <ATag text={item.name} key={k} path={item.path} />
          ))}
        </div>
        <div className="relative  flex flex-col space-y-3">
          {" "}
          <h3 className="text-lg font-bold ">עזרה ותמיכה</h3>{" "}
          <FooterUnderline />
          {supportLinks.map((item, k) => (
            <ATag text={item.name} key={k} path={item.path} />
          ))}
        </div>
        <div className="relative flex flex-col space-y-3">
          {" "}
          <h3 className="text-lg font-bold ">צור קשר</h3>
          <FooterUnderline />
          {contactInfo.map((item, k) => (
            <ATag text={item} key={k} />
          ))}
        </div>
      </div>
      <span className="inline-block border-b-[0.5px] border-[#444a53] w-[90%] h-[1px] my-10 mx-[5%]"></span>
      <div className="text-center ">© 2025 אלקטרו home. כל הזכויות שמורות.</div>
    </div>
  );
}
