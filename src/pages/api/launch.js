const debug = true // CHECK BEFORE PUSHING TO PROD

export const getData = (dataToGet) => {

  if (dataToGet == "Upcoming Data") {
    return getLaunchUpcoming()
  } else {
    return getAllLaunch()
  }
}

async function getLaunchUpcoming() {
  let API_ENDPOINT = "https://ll.thespacedevs.com/2.2.0/launch/upcoming?limit=35"

  if (debug) {
    API_ENDPOINT = "https://lldev.thespacedevs.com/2.2.0/launch/upcoming?limit=35"
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "GET"
    })
    const res = await response.json()
    return res
  } catch (err) {
      console.error(err)
      return err
  }
}

async function getAllLaunch() {
  let API_ENDPOINT = "https://ll.thespacedevs.com/2.2.0/launch?limit=135"

  if (debug) {
    API_ENDPOINT = "https://lldev.thespacedevs.com/2.2.0/launch?limit=135"
  }

  try {
    const response = await fetch(API_ENDPOINT, {
        method: "GET"
    })
    const res = await response.json()
    return res
  } catch (err) {
      console.error(err)
      return err
  }
}