import {
  Box,
  Container,
  Spacer,
  Flex,
  AspectRatio,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import Post from "./Post";
import PostPreview from "./PostPreview";
import PostInterface from "../interfaces/Post";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <Flex flexDir="column" maxW="6xl" mx="auto" my="8" gap="12">
        <Heading size={["3xl", "4xl"]} textAlign="center">
          Welcome to AlgoLang!
        </Heading>
        <Flex
          flexDir={["column", "column", "column", "row"]}
          align="center"
          justify="space-evenly"
          gap={["8", "8", "8", "16"]}
          mx={["2", "16"]}
        >
          <Text
            flex="1"
            fontSize={["xl", "2xl"]}
            textAlign={["center", "center", "center", "justify"]}
          >
            Discover a vibrant community of programmers, mathematicians, and
            enthusiasts, all sharing their passion for algorithms, functions,
            and mathematical concepts. Dive into a world where complex equations
            and fascinating visual representations come to life. Engage in
            discussions, explore new concepts, and expand your knowledge
            alongside like-minded individuals.
          </Text>
          <AspectRatio ratio={1} flex="1" w={["90%", "70%", "60%"]}>
            <Image src="/vector.svg" />
          </AspectRatio>
        </Flex>
        <Text fontSize={["xl", "2xl"]} textAlign="center">
          Join us today to contribute your own creations, interact with others,
          and witness the power of mathematics and programming combined.
          AlgoLang - the ultimate hub for all things algorithmic and
          mathematical!
        </Text>
        <Button
          alignSelf="center"
          colorScheme="teal"
          w="64"
          h="16"
          fontSize="2xl"
        >
          Join Now!
        </Button>
      </Flex>
    </>
  );
};

export default Home;
