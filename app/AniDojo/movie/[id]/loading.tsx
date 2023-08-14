import Styles from './movie.module.css'

export default function loading() {
  return (
    <div className={Styles.loading_main}>
        <img className={Styles.loading} src="/anime.gif"></img>
    </div>
  )
}
