import {
    Box,
    Image,
    VStack,
    HStack,
    Heading,
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


const LaunchPost = ({postData, allData}) => {
    const { colorMode } = useColorMode()
    const slugID = String(getKey(postData))
    function getKey(value) {
        return Object.keys(allData).find(key => allData[key] === value);
    }
    console.log(postData)
    const badgeColor = {
        
    }

    return (
        <LinkBox as="article" maxW="md" minW="xs" border={colorMode === "light" ? "1px #EDF2F7 solid" : "1px grey solid"} boxShadow={colorMode === "light" ? "lg" : ""} borderRadius="lg" overflow="hidden">
            {/* <Link href={`/launch/${slugID}`}> */}
                <Box>
                    <Image src={postData.image} maxHeight="55%" width="100%" objectFit="cover" mb={3}/>
                    <VStack alignItems="center" mb={3}>
                        <Text fontSize="2xl"><b>{postData.name}</b></Text>
                        <Text><b>Launch Status:</b> {postData.status.name}</Text>
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
                                <Text><b>Provider: </b> {postData.launch_service_provider.name}</Text>
                                <Text><b>Orbit: </b> {postData.mission.orbit.name}</Text>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <HStack>
                        <Badge></Badge>
                    </HStack>
                </Box>
            {/* </Link> */}
        </LinkBox>
    )
}

export default LaunchPost