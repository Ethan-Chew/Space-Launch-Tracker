import {
    Box,
    Image,
    VStack,
    HStack,
    Heading,
    Badge,
    Text,
    LinkBox,
    useColorMode
} from "@chakra-ui/react"
import Link from 'next/link'

export default function LaunchPost({postProperty}) {
    const { colorMode } = useColorMode()
    console.log(postProperty)
    return (
        // <LinkBox as="article" maxW="sm" minW="xs" border={colorMode === "light" ? "1px #EDF2F7 solid" : "1px grey solid"} boxShadow={colorMode === "light" ? "lg" : ""} borderRadius="lg" overflow="hidden">
        //     <Link href="/launch/[id]" as={`/posts/${postProperty.id}`}>
        //         <Image src={postProperty.imageUrl} alt={postProperty.imageAlt} />

        //     </Link>
        // </LinkBox>
        <Text>{postProperty.name}</Text>
    )
}