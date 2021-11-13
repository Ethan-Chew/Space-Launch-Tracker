import {
    Box,
    Image,
    VStack,
    HStack,
    Heading,
    Button,
    Badge,
    Text,
    LinkBox,
    useColorMode,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react"
import Link from 'next/link'
import { saveAs } from "file-saver"

const LaunchPost = ({postData, allData}) => {
    const { colorMode } = useColorMode()
    const slugID = String(getKey(postData))
    const ics = require('ics')

    function getKey(value) {
        return Object.keys(allData).find(key => allData[key] === value);
    }

    // Date Formatting
    const date = postData.net.split("-") // Ignore date[2]
    const dayTime = date[2].split("T") // Ignore dayTime[1]
    const time = dayTime[1].replace("Z", "")
    let newDate = new Date(postData.net)
    newDate.toString()
    newDate = String(newDate)
    let newNewDate = newDate.split(" ")

    // Create ics event
    const event = {
        start : [Number(date[0]), Number(date[1]), Number(dayTime[0]), Number(newNewDate[4].split(":")[0]), Number(newNewDate[4].split(":")[1])], // year, month, day, hour, minute, second
        duration: { hours: 2, minutes: 30 },
        title: postData.name,
        description: (postData.mission === null) ? postData.status.description : postData.mission.description,
        location: postData.pad.name,
        url: postData.url,
        // geo: { lat: 40.0095, lon: 105.2669 },
        categories: ['Space Launch'],
    }

    newNewDate = `${newNewDate[0]}, ${newNewDate[2]} ${newNewDate[1]} ${newNewDate[3]} -- ${newNewDate[4]}`

    const createICSFile = () => {
        ics.createEvent(event, (err, val) => {
            if (err) {
                console.error(err)
            }
            const file = new File([val], "event.ics", {
                type: "text/plain",
            })
            saveAs(file)
        })
    }
    
    return (
        <LinkBox as="article" maxW="md" minW="xs" border={colorMode === "light" ? "1px #EDF2F7 solid" : "1px grey solid"} boxShadow={colorMode === "light" ? "lg" : ""} borderRadius="lg" overflow="hidden">
            {/* <Link href={`/launch/${slugID}`}> */}
                <Box>
                    <Image src={postData.image} height="180px" width="100%" objectFit="cover" mb={3}/>
                    <VStack alignItems="center" mb={3}>
                        <Text fontSize="2xl" textAlign="center"><b>{postData.name}</b></Text>
                        {postData.probability === 80 ? <Text><b>Launch Status:</b> Launch Successful</Text> : <Text><b>Launch Status:</b> {postData.status.name}</Text>}
                        <Text><b>T-0: </b> {newNewDate}</Text>
                        {postData.mission === null ? <Text><b>Mission: </b> Unknown</Text> : <Text><b>Mission:</b> {postData.mission.type}</Text>}
                    </VStack>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    <b>Additional Information</b>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Text><b>Launch Pad: </b> {postData.pad.name}</Text>
                                <Text mb={2}><b>Provider: </b> {postData.launch_service_provider.name}</Text>
                                <VStack alignItems="left" spacing={2}>
                                    {(postData.mission === null || postData.mission.orbit === null) ? <Text><b>Orbit: </b> Unknown</Text> : <Text><b>Orbit: </b> {postData.mission.orbit.name}</Text>}
                                    {(postData.mission === null) ? <Text><b>Description: </b> {postData.status.description}</Text> : <Text><b>Description: </b> {postData.mission.description}</Text>}
                                    {(postData.webcast_live === false) ? (postData.probability === 80 ? <Text mb={2}><b>Livestream/Webcast: </b> Ended</Text> : <Text mb={2}><b>Livestream/Webcast: </b> Offline</Text>) : <Text mb={2}><b>Livestream/Webcast: </b> Online</Text>}
                                    {(postData.failreason === "") ? <></> : <Text mb={2}><b>Failed: </b> {postData.failreason}</Text>}
                                    {(postData.holdreason === "") ? <></> : <Text mb={2}><b>On Hold: </b> {postData.holdreason}</Text>}
                                </VStack>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <VStack alignItems="center" mt={2} mb={3}>
                        <Button onClick={createICSFile}>Download .ics</Button>
                    </VStack>
                    {/* <HStack>
                        {(postData.holdreason === "") ? <></> : <Badge colorScheme="orange">On Hold</Badge>}
                        {(postData.failreason === "") ? <></> : <Badge colorScheme="red">Failed</Badge>}
                    </HStack> */}
                </Box>
            {/* </Link> */}
        </LinkBox>
    )
}

export default LaunchPost