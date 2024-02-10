"use client";
import Link from "next/link";
import "./components.css";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="nav-main">
      <div className="nav-links">
        <li>
          <Link href={"/"}>
            <h6 className={pathname === "/" ? "active" : ""}>ANIME</h6>
          </Link>
        </li>
        <li>
          <Link href={"/Movies"}>
            <h6 className={pathname === "/Movies" ? "active" : ""}>MOVIES</h6>
          </Link>
        </li>
        <li>
          <Link href={"/Team"}>
            <h6 className={pathname === "/Team" ? "active" : ""}>TEAM</h6>
          </Link>
        </li>
        <li>
          <Link href={"/Search"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 256 256"
            >
              <path
                fill={pathname === "/Search" ? "#fff" : "#000"}
                d="m229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72Z"
              />
            </svg>
            {/* <h6 className={pathname === "/Search" ? "active" : ""}>SEARCH</h6> */}
          </Link>
        </li>
      </div>
    </div>
  );
}
