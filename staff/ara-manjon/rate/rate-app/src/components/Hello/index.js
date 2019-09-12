import React, { useState, useEffect } from 'react'
import Switch from "react-switch"

 
function Hello({ toChange, onChecked }) {
  return <section>
            <h1>Hello</h1>
            <label>
        <span>Start to Rate</span>
        <Switch onChange={toChange} checked={onChecked} />
      </label>
         </section>
}

export default Hello
