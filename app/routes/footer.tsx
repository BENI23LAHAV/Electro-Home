import { Logo } from "./navbar";
import type { ATagProps } from "../lib/definitions";
const quickLinks = ["דף הבית", "מוצרים", "אודות", "צור קשר"];
const supportLinks = [
  "מדיניות משלוחים",
  "מדיניות החזרות",
  "שאלות נפוצות",
  "תנאי שימוש",
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
          <h3 className="text-lg font-bold  ">קישורים מהירים</h3> <Underline />
          {quickLinks.map((item, k) => (
            <ATag text={item} key={k} />
          ))}
        </div>
        <div className="relative  flex flex-col space-y-3">
          {" "}
          <h3 className="text-lg font-bold ">עזרה ותמיכה</h3> <Underline />
          {supportLinks.map((item, k) => (
            <ATag text={item} key={k} />
          ))}
        </div>
        <div className="relative flex flex-col space-y-3">
          {" "}
          <h3 className="text-lg font-bold ">צור קשר</h3>
          <Underline />
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

function Underline() {
  return <span className="bg-[var(--color-primary)] w-15 h-1 mr-50"></span>;
}
function ATag(props: ATagProps) {
  return (
    <a
      href=""
      className=" hover:text-[var(--color-tertiary)] hover:translate-x-[-5px] duration-300">
      {props.text}
    </a>
  );
}

function FacebookComponent(props: any) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="#fff" {...props}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}
function InstegramComponent(props: any) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="#fff" {...props}>
      <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
      <path
        d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.5 6.5L17.51 6.5"
      />
    </svg>
  );
}
function TwiterComponent(props: any) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="#fff" {...props}>
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  );
}
