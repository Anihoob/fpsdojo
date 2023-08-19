"use client";
import { useState } from "react";
import Styles from "./team.module.css";
import { Icon } from "@iconify-icon/react";

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
        <h4 className={Styles.Teamchadstitle}>THE GIGA CHADS</h4>
        <div className={Styles.Teamchad}>
          <span>
            <img className={Styles.chadimg} src="/ichigo.gif" alt="" />
            <h5>Ichigo</h5>
          </span>
          <span>
            <img className={Styles.chadimg} src="/qewerty.jpg" alt="" />
            <h5>Qewerty</h5>
          </span>
          <span>
            <img className={Styles.chadimg} src="/hinata.gif" alt="" />
            <h5>Hinata</h5>
          </span>
        </div>
        <span className={Styles.Teambenene}>
              {benenecount < 20 ? (

                <>
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
            </>
                  ):(
                    <img src="/team.gif" alt="" />
                  )}
          
        </span>
      </div>
    </div>
  );
}
