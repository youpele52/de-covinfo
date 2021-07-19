export const getNationalData = async (days: number) => {
  try {
    const cases_res = await fetch(
      `https://api.corona-zahlen.org/germany/history/cases/${days}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    const incidence_res = await fetch(
      `https://api.corona-zahlen.org/germany/history/incidence/${days}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    const cases_data = await cases_res.json()
    const incidence_data = await incidence_res.json()
    return { cases_data, incidence_data }
    // const incidence_res
  } catch (error) {
    console.log(error)
  }
}

export const getStateNames = async () => {
  try {
    const stateRes = await fetch('https://api.corona-zahlen.org/states', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const stateName = await stateRes.json()
    return stateName
    // console.log(stateName)
  } catch (error) {
    console.log(error)
  }
}

export const getStateData = async (stateID: string) => {
  try {
    const cases_res = await fetch(
      `https://api.corona-zahlen.org/states/${stateID}/history/cases/90`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    const incidence_res = await fetch(
      `https://api.corona-zahlen.org/states/${stateID}/history/incidence/90`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    const cases_data = await cases_res.json()
    const incidence_data = await incidence_res.json()
    return { cases_data, incidence_data }
  } catch (error) {
    console.log(error)
  }
}

export const getStateDistricts = async () => {
  try {
    const districts_res = await fetch(
      `https://api.corona-zahlen.org/districts`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    const districts_data = await districts_res.json()
    return districts_data
  } catch (error) {
    console.log(error)
  }
}

export const getDistrictData = async (districtCode: string) => {
  try {
    const cases_res = await fetch(
      ` https://api.corona-zahlen.org/districts/${districtCode}/history/cases/90`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    const incidence_res = await fetch(
      ` https://api.corona-zahlen.org/districts/${districtCode}/history/incidence/90`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    const cases_data = await cases_res.json()
    const incidence_data = await incidence_res.json()
    return { cases_data, incidence_data }
  } catch (error) {
    console.log(error)
  }
}

// this is the goal

// https://api.corona-zahlen.org/districts/09162/history/cases/90

// and

// https://api.corona-zahlen.org/districts/09162/history/incidence/90
