"use client";
import { useState } from "react";
import Styles from "./team.module.css";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import Image from "next/image";

export default function page() {
  const [benenecount, setBenenecount] = useState(0);

  function benene() {
    setBenenecount(benenecount + 1);
  }

  return (
    <div className={Styles.Teammain}>
      <div className={Styles.Teamlogo}>
        <img className={Styles.Teamlogoimg} src="/anime-bg.gif" alt="" />
        <h4 className={Styles.Teamlogotitle}>F P S 道場</h4>
        <p className={Styles.Teamlogopara}>
          FPS DOJO is an advanced media encoding and video interpolation program
          that delivers exceptional quality encodes with higher frame rates.
        </p>
      </div>
      <div className={Styles.Teamchads}>
        <h4 className={Styles.Teamchadstitle}>THE G'S</h4>
        <div className={Styles.Teamchad}>
          <span>
            <Link href={"https://t.me/Kuroski_Ichigo"}>
            <img className={Styles.chadimg} src="/ichigo.gif" alt="" />
            </Link>
            <h5>Ichigo</h5>
          </span>
          <span>
            <Link href={"https://t.me/Qewertyy"}>
            <img className={Styles.chadimg} src="/qewerty.gif" alt="" />
            </Link>
            <h5>Qewerty</h5>
          </span>
          <span>
            <Link href={"https://t.me/sad_sensei"}>
            <img className={Styles.chadimg} src="/hinata.gif" alt="" />
            </Link>
            <h5>Hinata</h5>
          </span>
        </div>
        <div className={Styles.Teamchannels}>
          <h4>Telegram Channels</h4>
          <span>
            <Image width={100} height={100} src="/fpslogo.png" alt="" />
            <Image width={100} height={100} src="/anihublogo.jpg" alt="" />
          </span>
        </div>
        <div className={Styles.TeamSupport}>
          <h4>Support Group</h4>
          <span>
          <Link href={"/"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><defs><linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2AABEE"/><stop offset="100%" stop-color="#229ED9"/></linearGradient></defs><path fill="url(#logosTelegram0)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"/><path fill="#FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072Z"/></svg>
          </Link>
          </span>
        </div>
        <div className={Styles.Teambenene}>
              <h4>Give Benene</h4>
              <svg
                onClick={benene}
                className={Styles.beneneicon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                >
                <path
                  fill="#f2eacc"
                  d="M46.6 42.2c-6.5 9.4-16.8 1.2-10.3-8.2C48.1 22.7 47.8 6.6 52.2 6c5.6-.7 9.8 16-5.6 36.2"
                  />
                <path
                  fill="#9c6525"
                  d="m5.5 40.7l-3.5 3c.9 1.3 1.8 2.6 2.9 3.8c1.7-1.4 3.6-3.2 4.9-5c-1.5-.4-3-1-4.3-1.8"
                  />
                <path
                  fill="#fee801"
                  d="M34.2 20.1c-7.2-1.8-11.9 3.2-11.9 3.2c6.8-3.6 16.8 4.6 15.4 7.3c-5.1 9.2-15.2 14.5-25.7 12.5c-.8-.1-1.5-.3-2.2-.6c-1.3 1.7-3.2 3.6-4.9 5c14.1 7 30.9 2.9 38.1-11.3c2.9-5.7-2.7-14.5-8.8-16.1"
                  />
                <path
                  fill="#e5c900"
                  d="M62 43.2s-1.4-5.7-8.2-8.4C47.2 32.1 43 36.2 43 36.2c-5.4 9.7-16 15.2-27 13.1c-3.3-.6-6.3-1.9-9-3.7c-.7.7-1.4 1.3-2.1 1.9c3.8 4.3 8.9 7.4 14.8 8.6c9.3 1.8 18.3-1.6 24.4-8.3C53.5 35.9 62 43.2 62 43.2"
                />
                <path
                  fill="#f5f5f5"
                  d="M34.5 41.1c2.9-1.8 4.4-4.9 3.3-6.9c-.3-.6-.9-1-1.6-1.3c-.2.3-.4.5-.5.8c.5.2 1 .5 1.2 1c.9 1.6-.3 4.1-2.7 5.6c-2.3 1.5-4.9 1.4-5.8-.1c-.4.2-.7.4-1.1.6c1.1 2 4.3 2.1 7.2.3"
                  />
                <path
                  fill="#42ade2"
                  d="M28.4 40.2c1 1.5 3.5 1.5 5.8.1c2.4-1.5 3.6-4 2.7-5.6c-.3-.5-.7-.8-1.2-1c-2 2.7-4.5 4.9-7.3 6.5"
                  />
                <path
                  fill="#fee801"
                  d="M62 43.2c.2 5.3-3.7 13.7-10.3 14.8c-6.7 1.1 8.4-19.9-1.7-24.1c0 0 11.6 0 12 9.3"
                  />
                <path
                  fill="#e5c900"
                  d="M35.9 20.8C21.1 14.6 16 33.4 23.5 31.2c2.6-.8 4.2-6.4 12.4-10.4"
                  />
              </svg>
              <p>{benenecount}</p>
        </div>
      </div>
    </div>
  );
}
