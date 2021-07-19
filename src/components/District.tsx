import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import moment from 'moment'
import { Line, defaults } from 'react-chartjs-2'
import { CircularProgress } from '@material-ui/core'
import { getDistrictData, getStateDistricts } from '../data/getData'
import { useGlobalContext } from '../context/context'
import { keys } from '@material-ui/core/styles/createBreakpoints'

defaults.plugins.legend.position = 'bottom'

export interface Data {
  data: any
  params: any
}

interface IDistrictInfo {
  stateAbbreviation: string
  name: string
}
interface IStateInfo {
  [key: string]: IDistrictInfo
}
function District() {
  const { id } = useParams<Data['params']>()

  // console.log(id)

  const { stateID, setStateID, stateName, setStateName } = useGlobalContext()
  const [districtCode, setDistrictCode] = useState('09162')
  const [districtName, setDistrictName] = useState(
    'Regionalverband Saarbrücken'
  )
  const [casesData, setCasesData] = useState<Data['data']>(Object)
  const [incidenceData, setIncidenceData] = useState<Data['data']>(Object)
  const [caseNum, setCaseNum] = useState<Data['data']>([])
  const [caseDate, setCaseDate] = useState<Data['data']>([])
  const [incidenceNum, setIncidenceNum] = useState<Data['data']>([])
  const [incidenceDate, setIncidenceDate] = useState<Data['data']>([])

  const [stateDistricts, setStateDistricts] = useState<IStateInfo>({})

  useEffect(() => {
    getStateDistricts().then((data) => {
      if (Object.keys(data.data).length > 0) {
        setStateDistricts(data.data)
      }
    })
  }, [])
  // console.log(stateDistricts)
  // extract district data
  useEffect(() => {
    getDistrictData(districtCode).then((data) => {
      setCasesData(data?.cases_data.data[districtCode].history)
      setIncidenceData(data?.incidence_data.data[districtCode].history)
      // console.log(casesData)
      if (Object.keys(data?.cases_data.data[districtCode].history).length > 0) {
        const casesNumbers = [
          data?.cases_data.data[districtCode].history.map(
            (entry: any, index: any) => entry.cases
          ),
        ]

        const casesDates = [
          data?.cases_data.data[districtCode].history.map(
            (entry: any, index: any) => moment(entry.date).format('DD MMM')
          ),
        ]

        setCaseNum(casesNumbers)
        setCaseDate(casesDates)
        console.log('cases')
        console.log(caseNum)
        console.log(caseDate)
      }
      if (
        Object.keys(data?.incidence_data.data[districtCode].history).length > 0
      ) {
        const incidenceNumbers = [
          data?.incidence_data.data[districtCode].history.map(
            (entry: any) => entry.weekIncidence
          ),
        ]
        const dateOfIncidence = [
          data?.incidence_data.data[districtCode].history.map((entry: any) =>
            moment(entry.date).format('DD MMM')
          ),
        ]
        setIncidenceNum(incidenceNumbers)
        setIncidenceDate(dateOfIncidence)
        console.log(incidenceNum)
        // console.log(dateOfIncidence)
      }
    })
  }, [districtCode])

  const DistrictCodeHandler = (code: string, nameOfDistrict: string) => {
    setDistrictCode(code)
    setDistrictName(nameOfDistrict)
  }

  console.log(districtCode)
  return (
    <div className='grid grid-cols-1 '>
      {/* button */}
      <h1 className='place-self-center  pt-10 text-4xl font-extrabold'>
        Districts in {stateName}
      </h1>

      <div className=''>
        {Object.keys(casesData).length <= 0 ? (
          <CircularProgress color='inherit' size={100} />
        ) : (
          // { CodesAndName }
          <div>
            <div className='py-10  grid grid-cols-1 '>
              <h2 className='place-self-center pb-5 text-2xl font-bold '>
                {districtName}
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
          </div>
        )}
      </div>
      {/* graph */}
      <div className='grid sm:grid-cols-auto md:grid-cols-4 lg:grid-cols-4 justify-items-center px-10 mb-10'>
        {Object.entries(stateDistricts).map((district, index) => {
          const [districtAgs, districtInfo] = district
          if (districtInfo.stateAbbreviation === id) {
            return (
              <div className='p-2  px-10'>
                <button
                  key={`${districtInfo.stateAbbreviation}-${index}`}
                  className='bg-gray-100 hover:bg-yellow-500 text-grey-darkest  hover:text-white font-bold py-2 px-4 rounded-2xl '
                  onClick={() =>
                    DistrictCodeHandler(districtAgs, districtInfo.name)
                  }
                >
                  {districtInfo.name}
                </button>
              </div>
            )
          }
        })}
      </div>
      <div className='bg-red-600 hover:bg-red-300 text-grey-darkest text-white font-bold py-2 px-10 rounded-2xl  mt-10 mb-40 place-self-center'>
        <Link to='/'>Back</Link>
      </div>
    </div>
  )
}

export default District

// Schleswig-Holstein
// console.log(data.data[districtCode])
// we also need county county name for display purpose
