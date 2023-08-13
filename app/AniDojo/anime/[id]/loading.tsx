import Styles from "./tvseries.module.css";

export default function loading() {
    return (
      <div className={Styles.loading_main}>
          <img className={Styles.loading} src="https://tenor.com/bAUZN.gif"></img>
      </div>
    )
  }
  