import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  FormErrorMessage,
  AlertIcon,
  Alert,
  Text,
  Flex,
  FormHelperText,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addUser } from "../services/userService";

function RegisterForm() {
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required").min(2).max(16),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .min(5),
      password: Yup.string().required("Password is required").min(8),
      password_confirmation: Yup.string()
        .required("Please retype your password.")
        .oneOf([Yup.ref("password")], "Your passwords do not match."),
    }),
    onSubmit: (values) => {
      const { username, email, password } = values;
      addUser({ username, email, password })
        .then(() => navigate("/"))
        .catch((error) => {
          setError(error);
          console.log(error);
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          {error && (
            <Alert status="error">
              <AlertIcon />
              There was an error processing your request
            </Alert>
          )}
          <FormControl
            id="username"
            isInvalid={
              formik.touched.username && Boolean(formik.errors.username)
            }
          >
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              bgColor="white"
            />
            {formik.errors.username ? (
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            ) : (
              <FormHelperText>
                Displayed on your post's and comment's.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            id="email"
            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
          >
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              bgColor="white"
            />
            <FormHelperText>Hidden, for verification only!</FormHelperText>

            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="password"
            isInvalid={
              formik.touched.password && Boolean(formik.errors.password)
            }
          >
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              bgColor="white"
            />
            <FormHelperText>A password for your account.</FormHelperText>

            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="password_confirmation"
            isInvalid={
              formik.touched.password_confirmation &&
              Boolean(formik.errors.password_confirmation)
            }
          >
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              bgColor="white"
            />
            <FormHelperText>Re-enter to confirm password.</FormHelperText>

            <FormErrorMessage>
              {formik.errors.password_confirmation}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            marginTop="30px"
            colorScheme="blue"
            isLoading={formik.isSubmitting}
          >
            Sign in
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default RegisterForm;
