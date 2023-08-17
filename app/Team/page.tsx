import Styles from './team.module.css'

export default function page() {
  return (
    <div className={Styles.Teammain}>
        <div className={Styles.Teamabout}>
            <img className={Styles.Teamaboutimg} src="/anime-bg.gif" alt="" />
        </div>
    </div>
  )
}
