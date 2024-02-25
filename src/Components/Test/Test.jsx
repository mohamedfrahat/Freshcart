import React, { useState } from 'react'

export default function Test() {
 let [wishcolor ,setWishcolor] = useState('green')

  return (
    <div>
      <button onClick={()=>setWishcolor('red')}> ooooooooo</button>
      <h2 style={{color:wishcolor}}>  color</h2>
    </div>
  )
}
