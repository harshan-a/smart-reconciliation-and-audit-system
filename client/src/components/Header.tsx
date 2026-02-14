// import logo from "../assets/logo-new.svg"
// import type { Dispatch, SetStateAction } from "react"
import mobileLogo from "../assets/logos/mobile-logo-new.svg"

export default function Header() {
  return (
    <header className="fixed top-0 w-full min-w-150 h-12 flex items-center z-100">
      <a
        href="http://harshan.io"
        className="w-fit h-[inherit] text-decoration-none absolute ">
        <img
          className="px-2.5 py-1.75 box-border h-[inherit]"
          src={mobileLogo}
          alt="harshan-logo"
          title="link to my portfolio"
        />
        {/* <img className="logo" src={logo} alt="harshan-logo" /> */}
      </a>
    </header>
  )
}
