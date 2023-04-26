import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <Flex
        flexDir="column"
        maxW="8xl"
        mx="auto"
        my="8"
        gap="16"
        px={["2", "2", "2", "16"]}
      >
        <Heading size={["3xl", "4xl"]} textAlign="center">
          Welcome to AlgoLang!
        </Heading>
        <Flex
          flexDir={["column", "column", "column", "row"]}
          align="center"
          justify="space-evenly"
          gap={["8", "8", "8", "0"]}
        >
          <Text
            fontSize={["xl", "2xl"]}
            maxW={["", "", "", "50%"]}
            textAlign={["center", "center", "center", "justify"]}
          >
            Discover a vibrant community of programmers, mathematicians, and
            enthusiasts, all sharing their passion for algorithms, functions,
            and mathematical concepts. Dive into a world where complex equations
            and fascinating visual representations come to life. Engage in
            discussions, explore new concepts, and expand your knowledge
            alongside like-minded individuals.
          </Text>
          <Image w={["", "", "", "33%"]} src="/vector.svg" />
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
