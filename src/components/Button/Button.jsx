import React from "react";
import { Link } from "react-router-dom";

export default function Boton({ action, style, display, to }) {
  if (to) {
    return (
      <div className="flex flex-wrap text-center justify-center m-2">
        <Link className={style} to={to}>
          {display}
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex flex-wrap justify-center m-4">
        <button className={style} onClick={action}>
          {display}
        </button>
      </div>
    );
  }
}