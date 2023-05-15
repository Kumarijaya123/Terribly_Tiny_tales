import React from 'react'
import './Style/list.css'

export default function List(props) {
  const barwidth=`${props.frequency*3}%`
  console.log(barwidth)
  return (
    <div className='list' style={{fontSize:props.heading?'22px':'16px'}}>
            <div>{props.word}</div>  
            <div>
                <div className="bargraph" style={{minWidth:barwidth,maxWidth:barwidth}}>{props.frequency}</div>  
            </div>    

    </div>
  )
}
