import React from "react"
import styles from "./grid.module.scss"
import Card from "@/components/card"

const Grid = ({ data }) => {
  return (
    <div className={styles.gridContainer}>
      {data.map((item, index) => {
        return (
          < div className={styles.card} key={index} >
            <Card {...item} />
          </div>
        )
      })}
    </div >
  )
}

export default Grid;