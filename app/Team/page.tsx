import Styles from './team.module.css'

export default function page() {
  return (
    <div className={Styles.Teammain}>
        <div className={Styles.Teamlogo}>
            <img className={Styles.Teamlogoimg} src="/anime-bg.gif" alt="" />
            <h4 className={Styles.Teamlogotitle}>F P S 道場</h4>
          <p className={Styles.Teamlogopara}>FPS DOJO is an advanced media encoding and video interpolation program that delivers exceptional quality encodes with higher frame rates.</p>
        </div>
        <div className={Styles.Teamchads}>
          <h4 className={Styles.Teamchadstitle}>THE CHADS</h4>
        </div>
        <img className={Styles.Teamrandom} src="/team.gif" alt="" />
    </div>
  )
}
