import { NavLink } from "react-router";
import type { ATagProps, LogoProps, StarRatingProps } from "./definitions";

function Logo({ showIcon = true, width = "auto", height = "auto" }: LogoProps) {
  return (
    <NavLink to={"/"}>
      <div
        className="flex items-center gap-2 text-3xl font-extrabold bg-gradient-to-r from-[#2b9cd8] to-[#5cd1a4] text-transparent bg-clip-text mr-10 hover:cursor-pointer z-100"
        style={{ width, height }}>
        {showIcon && (
          <svg
            className="w-8 h-8 text-[#2b9cd8]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
        אלקטרו home
      </div>
    </NavLink>
  );
}
function Soon(props: any) {
  return (
    <span
      className="text-[0.7rem] px-[0.4rem] py-[0.1rem]
          bg-[var(--color-gray-200)] text-[var(--color-gray-600)]
          rounded-[10px] font-normal relative
          before:absolute before:-top-3 before:right-0
          before:text-[9px] before:text-[rgba(100,100,100,0.6)]
          before:font-mono">
      בקרוב
    </span>
  );
}

function UnderLine(props: any) {
  return (
    <span
      className="absolute bottom-0 left-0 h-[3px] w-0
          bg-[var(--color-primary)]
          transition-all transition-defult
          group-hover:w-full mt-1     
          bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-tertiary)]
  
          "></span>
  );
}

function CartComponent(props: any) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
function FooterUnderline() {
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
function FilterComponent(props: any) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M4 21L4 14" />
      <path d="M4 10L4 3" />
      <path d="M12 21L12 12" />
      <path d="M12 8L12 3" />
      <path d="M20 21L20 16" />
      <path d="M20 12L20 3" />
      <path d="M1 14L7 14" />
      <path d="M9 8L15 8" />
      <path d="M17 16L23 16" />
    </svg>
  );
}
function HomeButton(props: any) {
  return (
    <button
      className="px-4 py-2 bg-[linear-gradient(45deg,rgba(43,156,216,0.03),rgba(92,209,164,0.05))]
        border-[var(--color-primary)] border-[2.5px]
        text-[var(--color-primary)] rounded-full hover:bg-gradient-to-r hover:from-[var(--color-primary)]
        hover:to-[var(--color-primary)] hover:text-white
        hover:translate-y-[-5px] hover:duration-300 hover:shadow-[0_10px_20px_rgba(110,0,255,0.2)] hover:cursor-pointer">
      {props.children}
    </button>
  );
}
function TrackComponent(props: any) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M1 3H16V16H1z" />
      <path d="M16 8L20 8 23 11 23 16 16 16 16 8z" />
      <circle cx={5.5} cy={18.5} r={2.5} />
      <circle cx={18.5} cy={18.5} r={2.5} />
    </svg>
  );
}
function ClockComponent(props: any) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <circle cx={12} cy={12} r={10} />
      <path d="M12 6L12 12 16 14" />
    </svg>
  );
}
function LocationComponent(props: any) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx={12} cy={10} r={3} />
    </svg>
  );
}
function StatusComponent(props: any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <circle cx={12} cy={12} r={10} />
      <path d="M12 8L12 12" />
      <path d="M12 16L12.01 16" />
    </svg>
  );
}
function Sale() {
  return (
    <span className="mr-3  bg-[var(--color-secondary)] rounded-full px-2 py-1 text-[12px] font-semibold text-[var(--color-dark)]">
      במבצע!
    </span>
  );
}
function New() {
  return (
    <span className=" mr-3 bg-[var(--color-secondary)] rounded-full px-2 py-1 text-[12px] font-semibold text-[var(--color-dark)]">
      חדש!{" "}
    </span>
  );
}
function StarRating({ rating }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <svg
          key={i}
          className="w-6 h-6 text-yellow-400 fill-current"
          viewBox="0 0 24 24">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 
                               12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <svg key={i} className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`half-${i}`} x1="100%" x2="0%" y1="0" y2="0">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
          <polygon
            fill={`url(#half-${i})`}
            stroke="currentColor"
            strokeWidth="1"
            points="12 2 15.09 8.26 22 9.27 17 14.14 
                        18.18 21.02 12 17.77 5.82 21.02 
                        7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          className="w-6 h-6 text-gray-300 fill-current"
          viewBox="0 0 24 24">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 
                               12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
      );
    }
  }

  return <div className="flex  gap-1">{stars}</div>;
}
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
function WalletComponent(props: any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
      <path d="M1 10L23 10" />
    </svg>
  );
}
function RemoveComponent(props: any) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
function ArrowComponent(props: any) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M19 12H5m7 7l-7-7 7-7" />
    </svg>
  );
}
export {
  Logo,
  CartComponent,
  UnderLine,
  Soon,
  FacebookComponent,
  InstegramComponent,
  TwiterComponent,
  ATag,
  FooterUnderline,
  FilterComponent,
  HomeButton,
  TrackComponent,
  ClockComponent,
  LocationComponent,
  StatusComponent,
  Sale,
  New,
  StarRating,
  DeliveryConditons,
  WalletComponent,
  RemoveComponent,
  ArrowComponent,
};
