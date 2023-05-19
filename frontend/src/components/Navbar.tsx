import { FunctionComponent, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
  useBreakpointValue,
  Spacer,
  MenuDivider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { UserContext } from "../contexts/UserContext";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const UserMenu = () => (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="teal"
        variant="outline"
        rightIcon={<ChevronDownIcon />}
      >
        {user && user.name ? user.name : "#error"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/new-post")}>New Post</MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );

  const handleLogout = () => {
    alert("logout");
  };

  return (
    <>
      <header>
        <Box bg={bgColor[colorMode]} shadow="md" py={2} px={4}>
          <Flex alignItems="center">
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="teal.600"
              cursor="pointer"
              onClick={() => navigate("/")}
            >
              AlgoLang
            </Text>
            <nav></nav>
            <Spacer />
            {isMobile ? (
              <IconButton
                aria-label="Menu"
                icon={<HamburgerIcon />}
                variant="ghost"
              />
            ) : (
              <>
                {user ? (
                  <UserMenu />
                ) : location.pathname !== "/connect" ? (
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => navigate("/connect")}
                  >
                    Connect
                  </Button>
                ) : (
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    leftIcon={<ChevronLeftIcon />}
                    onClick={() => navigate("/")}
                  >
                    Back
                  </Button>
                )}
              </>
            )}
          </Flex>
        </Box>
      </header>
    </>
  );
};

export default Navbar;
