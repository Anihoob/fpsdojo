'use client'
import { useState } from "react";
import Styles from "./search.module.css";




export default function page() {
    const [searchItem, setSearchItem] = useState<any>()

  return (
    <div className={Styles.searchmain}>
      <div className={Styles.search}>
        <h4>Search</h4>
        <input onChange={(e)=> setSearchItem((e.target as HTMLInputElement).value)} type="search" className={Styles.searchbar} placeholder="..." />
      </div>
    </div>
  );
}
