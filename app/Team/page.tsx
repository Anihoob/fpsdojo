
import Styles from "./team.module.css";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "@/components/dropdown";

export default function page() {

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
        <h4 className={Styles.Teamchadstitle}>
          {"The Outlaws".toLocaleUpperCase()}
        </h4>
        <div className={Styles.Teamchad}>
          <span>
            <Link href={"https://t.me/Kuroski_Ichigo"}>
              <img
                className={Styles.chadimg}
                src="/ichigo.gif"
                alt=""
              />
            </Link>
            <h5>Ichigo</h5>
          </span>
          <span>
            <Link href={"https://t.me/Qewertyy"}>
              <img
                className={Styles.chadimg}
                src="/qewerty.gif"
                alt=""
              />
            </Link>
            <h5>Qewerty</h5>
          </span>
          <span>
            <Link href={"https://t.me/sad_sensei"}>
              <img
                className={Styles.chadimg}
                src="/hinata.gif"
                alt=""
              />
            </Link>
            <h5>Hinata</h5>
          </span>
        </div>
        <div className={Styles.Teamchannels}>
          <h4 className={Styles.teamfaq}>F. A. Q</h4>
          <Dropdown
            dropdown={"one"}
            question="1. Who Are We?"
            answer="dojoverse is a pioneering platform dedicated to enhancing your entertainment experience. We specialize in offering upscaled and frame interpolated movies and anime, bringing you content that's enriched with stunning visual quality and smoothness."
          />
          <Dropdown
            dropdown={"two"}
            question="2. What is Frame Interpolation?"
            answer="Frame interpolation is a sophisticated technology that calculates and inserts additional frames between existing ones to create a higher frame rate. This process results in smoother motion and heightened realism, enriching your viewing experience."
          />
          <Dropdown
            dropdown={"three"}
            question="3. What is the Difference Between 30fps and 60fps?"
            answer="Frames per second (fps) directly impact the smoothness and realism of motion in videos. While 30fps delivers a standard level of fluidity, 60fps doubles the frame rate, resulting in exceptionally smoother visuals. This difference is especially noticeable during fast-paced action sequences."
          />
          <Dropdown
            dropdown={"four"}
            question="4. Does My Device Support 60fps?"
            answer="To determine if your device supports 60fps, check its specifications or settings. Most modern devices, including smartphones, tablets, smart TVs, and computers, are equipped to handle 60fps content. However, for the best experience, ensure that your device meets the recommended requirements."
          />
          <Dropdown
            dropdown={"five"}
            question="5. What Media Player Should I Use?"
            answer="We recommend using media players that support high frame rates for optimal viewing our content. For windows we recommend using MPC-HC (https://sourceforge.net/projects/mpc-hc/), while android users can use OPlayer."
          />
        </div>
        <div className={Styles.TeamSupport}>
          <h4>Support Group</h4>
          <span>
            <Link href={"https://t.me/dojoverse"}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <defs>
                  <linearGradient
                    id="logosTelegram0"
                    x1="50%"
                    x2="50%"
                    y1="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="#2AABEE" />
                    <stop offset="100%" stop-color="#229ED9" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#logosTelegram0)"
                  d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"
                />
                <path
                  fill="#FFF"
                  d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072Z"
                />
              </svg>
            </Link>
            <Link href={"https://discord.gg/WZx3jeBE"}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <g fill="none">
                  <rect width="256" height="256" fill="#5865F2" rx="60" />
                  <g clip-path="url(#skillIconsDiscord0)">
                    <path
                      fill="#fff"
                      d="M197.308 64.797a164.918 164.918 0 0 0-40.709-12.627a.618.618 0 0 0-.654.31c-1.758 3.126-3.706 7.206-5.069 10.412c-15.373-2.302-30.666-2.302-45.723 0c-1.364-3.278-3.382-7.286-5.148-10.412a.643.643 0 0 0-.655-.31a164.472 164.472 0 0 0-40.709 12.627a.583.583 0 0 0-.268.23c-25.928 38.736-33.03 76.52-29.546 113.836a.685.685 0 0 0 .26.468c17.106 12.563 33.677 20.19 49.94 25.245a.648.648 0 0 0 .702-.23c3.847-5.254 7.276-10.793 10.217-16.618a.633.633 0 0 0-.347-.881c-5.44-2.064-10.619-4.579-15.601-7.436a.642.642 0 0 1-.063-1.064a86.364 86.364 0 0 0 3.098-2.428a.618.618 0 0 1 .646-.088c32.732 14.944 68.167 14.944 100.512 0a.617.617 0 0 1 .655.08a79.613 79.613 0 0 0 3.106 2.436a.642.642 0 0 1-.055 1.064a102.622 102.622 0 0 1-15.609 7.428a.638.638 0 0 0-.339.889a133.075 133.075 0 0 0 10.208 16.61a.636.636 0 0 0 .702.238c16.342-5.055 32.913-12.682 50.02-25.245a.646.646 0 0 0 .26-.46c4.17-43.141-6.985-80.616-29.571-113.836a.506.506 0 0 0-.26-.238ZM94.834 156.142c-9.855 0-17.975-9.047-17.975-20.158s7.963-20.158 17.975-20.158c10.09 0 18.131 9.127 17.973 20.158c0 11.111-7.962 20.158-17.974 20.158Zm66.456 0c-9.855 0-17.974-9.047-17.974-20.158s7.962-20.158 17.974-20.158c10.09 0 18.131 9.127 17.974 20.158c0 11.111-7.884 20.158-17.974 20.158Z"
                    />
                  </g>
                  <defs>
                    <clipPath id="skillIconsDiscord0">
                      <path fill="#fff" d="M28 51h200v154.93H28z" />
                    </clipPath>
                  </defs>
                </g>
              </svg>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
