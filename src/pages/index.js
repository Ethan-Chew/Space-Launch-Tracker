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
  const [dataType, setDataType] = useState("Upcoming Data")
  const [data, setData] = useState([])

  useEffect(() => {
    document.title = "Ethan Chew | Launch Tracker"
  }, [])

  useEffect(async () => {
    try {
      const temp = await getData(dataType)
      setData(temp.results)

      if (data === {} || data === undefined || data === null) {
        console.error("Data is Empty or Undefined!")
      }

    } catch (err) {
      console.error(err)
      console.log(`Data Retrival for ${dataType} Failed!`)
    }
  }, dataType)

  return (
      <Box>
        <VStack spacing={30} mb={20}>
          <Heading fontSize="4xl">Space Launch Tracker</Heading>
          <HStack>
            <Text ><b>Launch Data</b></Text>
            <FormControl>
              <FormLabel>
                <Select variant="filled" onChange={(e) => {
                  setDataType(e.currentTarget.value)
                }}>
                  <option value="Upcoming Data">Upcoming Data</option>
                  <option value="Lifetime Data">Lifetime Data</option>
                </Select>
              </FormLabel>
            </FormControl>
          </HStack>
          {(Object.values(data).length === 0) ? <Text>Launch Data is Loading. Please hold on...</Text> : 
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3}} spacing={{ base: 5, lg: 8}}>
                {Object.values(data).map((prop) => (
                  <LaunchPost key={prop.id} postData={prop} allData={data} />
                ))}
              </SimpleGrid>
            }
        </VStack>
      </Box>
  )
}
