import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .min(5),
      password: Yup.string().required("Password is required").min(8),
    }),
    onSubmit: (values) => {
      console.log(values); // Replace with your form submission code
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <FormControl
            id="email"
            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
          >
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              bgColor="white"
            />
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
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <Checkbox
            isChecked={rememberMe}
            onChange={(e) => {
              setRememberMe(e.target.checked);
              formik.setFieldValue("rememberMe", e.target.checked);
            }}
          >
            Remember me
          </Checkbox>
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={formik.isSubmitting}
          >
            Sign in
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default LoginForm;
