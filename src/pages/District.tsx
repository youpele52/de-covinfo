import React from 'react'
import moment from 'moment'
import { useGlobalContext } from '../context/context'
import DistrictComp from '../components/District'

function District() {
  const { metaData } = useGlobalContext()
  return (
    <div className=' min-h-screen'>
      <DistrictComp />
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

export default District
