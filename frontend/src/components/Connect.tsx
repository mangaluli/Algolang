import { FunctionComponent } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Container,
  Flex,
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface ConnectProps {}

const Connect: FunctionComponent<ConnectProps> = () => {
  return (
    <Flex flexDir="column" justify="center" flexGrow="1">
      <Container
        border="1px"
        rounded="3xl"
        paddingTop="1"
        paddingBottom="4"
        borderColor="gray.200"
        bgColor="gray.50"
        shadow="md"
      >
        <Tabs isFitted variant="line">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <RegisterForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Flex>
  );
};

export default Connect;
