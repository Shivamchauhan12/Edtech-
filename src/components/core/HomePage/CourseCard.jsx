import React from 'react'
import { IoPeopleSharp } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {

  return (
    <div className=' bg-white text-black h-[250px] fit-content '>
      <h1>{cardData.heading}</h1>
      <p> {cardData.description}</p>
      <div className='flex flex-row gap-[200px]'>
        <div className=' flex flex-row gap-[10px] ml-[30px] items-center  w-max ' >
          <IoPeopleSharp/>
          {cardData.level}
        </div>
        <div className=' flex flex-row gap-[10px] mr-[30px] items-center w-max '>
          <MdMenuBook/>
          {cardData.lessionNumber} Lessons
        </div>
      </div>
    </div>
  )
}

export default CourseCard;