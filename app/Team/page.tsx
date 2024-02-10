import Styles from "./team.module.css";
import Dropdown from "@/components/dropdown";

export default function page() {

  return (
    <div className={Styles.Teammain}>
      <div className={Styles.Teamlogo}>
        <img className={Styles.Teamlogoimg} src="/anime-bg.gif" alt="anime background" />
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
              <img
                className={Styles.chadimg}
                src="/ichigo.gif"
                alt="kurosaki ichigo pfp"
              />
            <h5>Ichigo</h5>
          </span>
          <span>
              <img
                className={Styles.chadimg}
                src="/qewerty.gif"
                alt="qewerty gif"
              />
            <h5>Qewerty</h5>
          </span>
          <span>
              <img
                className={Styles.chadimg}
                src="/hinata.gif"
                alt="hinata gif"
              />
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
      </div>
    </div>
  );
}
