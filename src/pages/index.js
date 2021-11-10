import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getData } from "./api/launch"
import LaunchPost from '../components/LaunchPost'

export default function Home() {
  const [dataType, setDataType] = useState("24 Hour Data")
  const [launches, setLaunches] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    document.title = "Ethan Chew | Launch Tracker"
    
    try {
      async function fetchData() {
        const temp = await getData(dataType)
        await setData(temp)
      }
      fetchData()
    } catch (err) {
      console.error(err)
      console.log(`Data Retrival for ${dataType} Failed!`)
    }
    
    setLaunches(data.results)
  }, [])

  return (
      <Box>
        <VStack spacing={30} mb={20}>
          <Heading>Launch Tracker</Heading>
          <HStack>
            <Text ><b>Launch Data</b></Text>
            <FormControl>
              <FormLabel>
                <Select placeholder="24 Hour Data" onChange={(e) => setDataType(e.currentTarget.value)}>
                  <option>Lifetime Data</option>
                </Select>
              </FormLabel>
            </FormControl>
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 2}} spacing={{ base: 5, lg: 8}}>
            {(launches.length === 0) ? <Text>No current launches! Check back soon.</Text> : 
              launches.map((prop) => {
                <LaunchPost key={prop.id} postProperty={prop} />
              })
            }
          </SimpleGrid>
        </VStack>

      </Box>
  )
}
