import Styles from './movies.module.css'

export default function Loading() {
  return (
    <div className={Styles.loading_main}>
        <img className={Styles.loading} src="/anime.gif"></img>
    </div>
  )
}
