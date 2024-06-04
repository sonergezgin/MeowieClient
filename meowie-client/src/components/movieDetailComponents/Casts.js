import React from 'react'
import Card from './Card'
import loadingSvg from '../../images/loading.svg'
import CardSkeleton from '../skeletons/CardSkeleton'

const Casts = (props) => {
  return (
    <div className='mx-16 pt-12'>
    <h2 className='text-xl font-bold'>
      DIRECTOR
    </h2>
    {props.director ?
      <div>
      <Card
      onClick={""}
      imageURL={props.director?.imageURL}
      name={props.director?.name}
      /> 
      </div>
      :
        <CardSkeleton/>
    }
    <h2 className='text-xl font-bold pt-6'>
      CASTS
    </h2>
    <div className=" flex scrollbar-thin scrollbar-thumb-[#c23442] scrollbar-track-[#d2d2d7] overflow-x-scroll hover:scrollbar-thumb-[#ff6473] overflow-y-hidden pb-2">
        {
        props.actors ?
        props.actors.map((actor,i)=>{
            return (
                <div key={i}>
                  <Card 
                  key={i}
                  onClick={""}
                  imageURL={actor ? actor.imageURL : loadingSvg}
                  name={actor ? actor.name : "notfound"}
                  />
                </div>
            )
        }) : Array.from({ length: props.count }, (_, index) => (
            <CardSkeleton key={index}/>
      ))
        }
    </div>

    </div>
  )
}

export default Casts
