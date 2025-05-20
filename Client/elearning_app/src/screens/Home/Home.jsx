import React from 'react'
import Header from '../../components/Header/Header'
import Slider from '../../components/Slider/Slider'

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
        </div>
    </div>
  )
}

export default Home