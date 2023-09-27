import React from 'react'

const Item = ({myData}) => {
    const { id } = myData;
    console.log(`id: ${id}`)
  return (
    <div className="item">ITEM - {id}</div>
  )
}

export default Item