import React from 'react'
import Header from '../../components/Header/Header'
import Slider from '../../components/Slider/Slider'
import CourseList from '../../components/CourseList/CourseList'

const Home = () => {
  return (
    <div>
        <div className='flex flex-col'>
            <div>
                <Header/>
            </div>
            <div>
              <Slider/>
            </div>
            <div className='bg-blue-800'>
              <CourseList/>
            </div>
        </div>
    </div>
  )
}

export default Home