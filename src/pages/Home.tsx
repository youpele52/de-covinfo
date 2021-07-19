import React, { useState, useEffect } from 'react'
import National from '../components/National'
import State from '../components/State'
import logo from '../assets/virus.png'
import { useGlobalContext } from '../context/context'
import moment from 'moment'
export default function Home() {
  const { metaData } = useGlobalContext()
  return (
    <div className='grid grid-cols-1 justify-items-center min-h-screen'>
      <h1 className=' pt-10 text-4xl font-extrabold'>
        De CovInf
        <span>
          <img
            className='w-10 h-10 inline animate-spinner'
            src={logo}
            alt='virus'
          />
        </span>
      </h1>

      <National />
      <State />
      <div className='bg-white text-md text-center p-8 w-full '>
        <div>
          Source: <span className='font-bold'> {metaData.source}</span>
        </div>
        <div>
          Last updated:{' '}
          <span className='font-bold'>
            {moment(metaData.lastUpdate).fromNow()}
          </span>
        </div>
      </div>
    </div>
  )
}
