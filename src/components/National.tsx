import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { getNationalData } from '../data/getData'
import { Line, Bar, defaults } from 'react-chartjs-2'
import { CircularProgress } from '@material-ui/core'

defaults.plugins.legend.position = 'bottom'
defaults.font.size = 16

export interface Data {
  data: any
}

function National() {
  const [casesData, setCasesData] = useState<Data['data']>(Object)
  const [incidenceData, setIncidenceData] = useState<Data['data']>(Object)
  const [caseNum, setCaseNum] = useState<Data['data']>([])
  const [caseDate, setCaseDate] = useState<Data['data']>([])
  const [incidenceNum, setIncidenceNum] = useState<Data['data']>([])
  const [incidenceDate, setIncidenceDate] = useState<Data['data']>([])

  useEffect(() => {
    getNationalData(90).then((data) => {
      setCasesData(data?.cases_data)
      setIncidenceData(data?.incidence_data)
      // setNationalData(data)
      if (Object.keys(data?.cases_data).length > 0) {
        const casesNumbers = [
          data?.cases_data.data.map((entry: any, index: any) => entry.cases),
        ]

        const casesDates = [
          data?.cases_data.data.map((entry: any, index: any) =>
            moment(entry.date).format('DD MMM')
          ),
        ]

        setCaseNum(casesNumbers)
        setCaseDate(casesDates)
      }
      if (Object.keys(data?.incidence_data).length > 0) {
        const incidenceNumbers = [
          data?.incidence_data.data.map((entry: any) => entry.weekIncidence),
        ]
        const dateOfIncidence = [
          data?.incidence_data.data.map((entry: any) =>
            moment(entry.date).format('DD MMM')
          ),
        ]
        setIncidenceNum(incidenceNumbers)
        setIncidenceDate(dateOfIncidence)
      }
    })
  }, [])

  return (
    <div>
      {Object.keys(casesData).length <= 0 ? (
        <CircularProgress color='inherit' size={100} />
      ) : (
        <div className='  py-10  grid grid-cols-1 '>
          <h2 className='place-self-center py-5  text-2xl font-bold '>
            National
          </h2>

          <div className='chart container rounded-2xl shadow-xl   pt-8 bg-gray-100 sm:text-base  md:text-xl lg:text-3xl '>
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
  )
}

export default National
