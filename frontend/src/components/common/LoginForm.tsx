import { FunctionComponent, useContext, useEffect, useRef } from "react";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login, register } from "../../apis/authApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: "",
  password: "",
};

const registerSchema = Yup.object({
  email: Yup.string()
    .email("invalid email")
    .required("this is a required field")
    .min(5, "invalid email"),
  password: Yup.string()
    .required("this is a required field")
    .min(8, "too short"),
});

// interface LoginFormProps {}

const LoginForm: FunctionComponent = () => {
  const { refreshUser } = useContext(UserContext);
  const navigate = useNavigate();
  const email_field = useRef<HTMLInputElement>();
  const password_field = useRef<HTMLInputElement>();

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const { email, password } = values;
    const user = { email, password };
    const id = toast.loading("Logging in..");
    login(user)
      .then(() => {
        toast.success("You are logged in!", { id });
        refreshUser();
        navigate("/");
        setSubmitting(false);
      })
      .catch((error) => {
        toast.error(`Login Error: ${error.response.data.message}`, { id });
        setSubmitting(false);
      });
  };

  return (
    <>
      <div
        className="mt-3 flex flex-col gap-1 border-b border-t border-stone-400 bg-blue-50 bg-opacity-50 p-2"
        role="alert"
      >
        <p className="font-bold">Skip registration</p>
        <p className="">
          <span className="font-medium underline underline-offset-2">
            Email:
          </span>{" "}
          user@example.com
        </p>
        <p>
          <span className="font-medium underline underline-offset-2">
            Password:
          </span>{" "}
          12341234
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-2 py-2">
            {/* EMAIL */}
            <div className="flex flex-col justify-end gap-1">
              <label className="font-bold text-stone-900" htmlFor="email">
                Email
              </label>
              <Field
                id="email"
                as="input"
                ref={email_field}
                name="email"
                type="email"
                placeholder="legend27@domain.com"
                className={`rounded-md border-2 px-2 py-1 ${
                  errors.email && touched.email
                    ? "border-red-400"
                    : "border-stone-400"
                }`}
              />
              {errors.email && touched.email ? (
                <ErrorMessage name="email">
                  {(msg: string) => (
                    <span className="text-sm text-red-400">{msg}</span>
                  )}
                </ErrorMessage>
              ) : (
                <span className="text-sm text-stone-500">
                  Please enter your email
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col justify-end gap-1">
              <label className="font-bold text-stone-900" htmlFor="password">
                Password
              </label>
              <Field
                id="password"
                as="input"
                ref={password_field}
                name="password"
                type="password"
                placeholder="********"
                className={`rounded-md border-2 px-2 py-1 ${
                  errors.password && touched.password
                    ? "border-red-400"
                    : "border-stone-400"
                }`}
              />
              {errors.password && touched.password ? (
                <ErrorMessage name="password">
                  {(msg: string) => (
                    <span className="text-sm text-red-400">{msg}</span>
                  )}
                </ErrorMessage>
              ) : (
                <span className="text-sm text-stone-500">
                  Please enter your password{" "}
                </span>
              )}
            </div>

            {/* SUBMIT */}
            <button
              className="mt-1 rounded-lg bg-blue-600 px-4 py-1 text-lg text-stone-50 shadow-md"
              disabled={isSubmitting}
              type="submit"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
