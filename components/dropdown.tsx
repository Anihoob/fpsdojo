import { Icon } from "@iconify-icon/react";

interface Props {
  question: string;
  answer: string;
  dropdown:string ;
}

import "./components.css";

export default function Dropdown(props: Props) {
  return (
    <div className="dropdown-main">
      <input type="checkbox" id={`check${props.dropdown}`} />
        <label htmlFor={`check${props.dropdown}`} className={`dropdown-question`}>
        <h4 className="quest-title">{props.question}</h4>
          <Icon
            icon={"solar:alt-arrow-down-bold-duotone"}
            style={{ color: "white" }}
          />
        </label>
      <p className={`dropdown-answer${props.dropdown}`}>{props.answer}</p>
    </div>
  );
}
