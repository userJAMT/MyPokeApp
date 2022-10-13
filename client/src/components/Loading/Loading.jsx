import React from 'react'
import s from './Loading.module.css'


function Loading() {
  return (
    <div className={s.box}>
        <div class={s.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default Loading