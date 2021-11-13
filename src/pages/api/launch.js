const debug = false // CHECK BEFORE PUSHING TO PROD

export const getData = (dataToGet) => {

  if (dataToGet == "24 Hour Data") {
    return getLaunch24Hrs()
  } else {
    return getAllLaunch()
  }
}

async function getLaunch24Hrs() {
  let API_ENDPOINT = "https://ll.thespacedevs.com/2.2.0/launch/upcoming"

  if (debug) {
    API_ENDPOINT = "https://lldev.thespacedevs.com/2.2.0/launch/upcoming"
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
  let API_ENDPOINT = "https://ll.thespacedevs.com/2.2.0/launch/"

  if (debug) {
    API_ENDPOINT = "https://lldev.thespacedevs.com/2.2.0/launch/"
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