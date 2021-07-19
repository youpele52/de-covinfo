import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import { Line, defaults } from 'react-chartjs-2'
import { CircularProgress } from '@material-ui/core'
import { getStateNames, getStateData } from '../data/getData'
import { AppContext, useGlobalContext } from '../context/context'
import { Link } from 'react-router-dom'

defaults.plugins.legend.position = 'bottom'
defaults.font.size = 16

export interface Data {
  data: any
}

let names = []

function State() {
  const {
    stateID,
    setStateID,
    stateName,
    setStateName,
    metaData,
    setMetaData,
  } = useGlobalContext()
  const [bundesLand, setBundesLand] = useState<Data['data']>(Object)
  // const [stateID, setStateID] = useState('SH')
  // const [stateName, setStateName] = useState('Schleswig-Holstein')
  const [casesData, setCasesData] = useState<Data['data']>(Object)
  const [incidenceData, setIncidenceData] = useState<Data['data']>(Object)
  const [caseNum, setCaseNum] = useState<Data['data']>([])
  const [caseDate, setCaseDate] = useState<Data['data']>([])
  const [incidenceNum, setIncidenceNum] = useState<Data['data']>([])
  const [incidenceDate, setIncidenceDate] = useState<Data['data']>([])

  useEffect(() => {
    getStateNames().then((data) => {
      setBundesLand(data)
    })
  }, [])

  useEffect(() => {
    getStateData(stateID).then((data) => {
      setCasesData(data?.cases_data.data[stateID].history)
      setIncidenceData(data?.incidence_data.data[stateID].history)
      setMetaData(data?.cases_data.meta)

      if (Object.keys(data?.cases_data.data[stateID].history).length > 0) {
        const casesNumbers = [
          data?.cases_data.data[stateID].history.map(
            (entry: any, index: any) => entry.cases
          ),
        ]

        const casesDates = [
          data?.cases_data.data[stateID].history.map((entry: any, index: any) =>
            moment(entry.date).format('DD MMM')
          ),
        ]

        setCaseNum(casesNumbers)
        setCaseDate(casesDates)
      }

      if (Object.keys(data?.incidence_data.data[stateID].history).length > 0) {
        const incidenceNumbers = [
          data?.incidence_data.data[stateID].history.map(
            (entry: any) => entry.weekIncidence
          ),
        ]
        const dateOfIncidence = [
          data?.incidence_data.data[stateID].history.map((entry: any) =>
            moment(entry.date).format('DD MMM')
          ),
        ]
        setIncidenceNum(incidenceNumbers)
        setIncidenceDate(dateOfIncidence)
        // console.log(incidenceNumbers)
        // console.log(dateOfIncidence)
      }
    })
  }, [stateID])

  const bundesLandHandler = (entry: string) => {
    setStateID(entry)
    // console.log(stateNames)
    setStateName(bundesLand.data[entry].name)
    // console.log(bundesLand.data[entry].name)
    // console.log(stateID)
  }
  // console.log(typeof bundesLand)
  // console.log(bundesLand)
  // console.log(stateID)
  // console.log(casesData)
  // console.log(incidenceData)
  console.log(metaData)
  return (
    <div className='grid grid-cols-1 '>
      <h3 className='place-self-center py-10 text-xl font-bold '>
        Select State
      </h3>
      <div className=''>
        {/* buttons */}

        {Object.keys(bundesLand).length <= 0 ? (
          <CircularProgress color='inherit' size={100} />
        ) : (
          <div className='grid sm:grid-cols-auto md:grid-cols-4 lg:grid-cols-4 justify-items-center px-10'>
            {Object.keys(bundesLand.data).map((entry: any) => {
              return (
                <div key={entry} className='p-2  px-10'>
                  <button
                    className='bg-gray-100 hover:bg-yellow-500 text-grey-darkest  hover:text-white font-bold py-2 px-4 rounded-2xl '
                    onClick={() => bundesLandHandler(entry)}
                  >
                    {bundesLand.data[entry].name}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div>
        {/* graph */}
        {Object.keys(casesData).length <= 0 ? (
          <CircularProgress color='inherit' size={100} />
        ) : (
          <div className='py-10  grid grid-cols-1 '>
            <h2 className='place-self-center pb-5 text-2xl font-bold '>
              {stateName}
            </h2>
            {/* graph goes in here */}
            <div className='chart container rounded-2xl shadow-xl   pt-8 bg-gray-100 sm:text-base   md:text-xl lg:text-3xl place-self-center '>
              <Line
                type='line'
                data={{
                  labels: incidenceDate[0],
                  datasets: [
                    {
                      label: 'Cases',
                      data: caseNum[0],
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 3,
                      lineTension: 0.3,
                    },
                    {
                      label: 'Incidence',
                      data: incidenceNum[0],
                      backgroundColor: 'rgba(245, 171, 53, 1)',
                      borderColor: 'rgba(250, 190, 88, 1)',
                      borderWidth: 3,
                      lineTension: 0.3,
                    },
                  ],
                }}
                // height={90}
                // width={500}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,

                  scales: {
                    x: { title: { display: true, text: 'Date' } },
                    y: { title: { display: true, text: 'Numbers Recorded' } },
                  },
                  plugins: {
                    title: {
                      display: true,
                      text: 'Covid-19 Cases and Incidences in the Passed 90 days',
                      labels: {
                        font: {
                          size: 0,
                          weight: 'bold',
                        },
                      },
                    },
                    legend: {
                      labels: {
                        font: {
                          weight: 'bold',
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className='bg-gray-100 hover:bg-yellow-500 text-grey-darkest  hover:text-white font-bold py-2 px-4 rounded-2xl  mt-10 mb-40 place-self-center'>
        <Link to={`/district/${stateID}`}>
          View {stateName}'s Districts' data
        </Link>
      </div>
    </div>
  )
}

export default State

{
  /* <div className='p-5 grid sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-8'>
                </div> */
}
{
  /* {bundesLand.data[entry].name} */
}

// <h2 className='place-self-center'>State</h2>
// <h3 className='place-self-center'>Pick a state</h3>
