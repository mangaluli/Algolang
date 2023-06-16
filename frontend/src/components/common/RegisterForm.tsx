import { FunctionComponent } from "react";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../apis/authApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Values {
  username: string;
  email: string;
  password: string;
  password_repeat: string;
}

const initialValues: Values = {
  username: "",
  email: "",
  password: "",
  password_repeat: "",
};

const registerSchema = Yup.object({
  username: Yup.string()
    .required("this is a required field")
    .min(2, "too short")
    .max(12, "too long"),
  email: Yup.string()
    .email("invalid email")
    .required("this is a required field")
    .min(5, "invalid email"),
  password: Yup.string()
    .required("this is a required field")
    .min(8, "too short"),
  password_repeat: Yup.string()
    .required("this is a required field")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

// interface RegisterFormProps {}

const RegisterForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const id = toast.loading("Registering...");
    const new_user = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    try {
      await register(new_user);
      toast.success("Registraion successfull, Please verify your email.", {
        id,
      });
      navigate("/");
    } catch (error: any) {
      toast.error(
        `Resitration failed: ${
          error.response.data.message || "Unexpected Error"
        }`,
        { id }
      );
    }
    setSubmitting(false);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-2 py-2">
            {/* USERNAME */}
            <div className="flex flex-col justify-end gap-1">
              <label className="font-bold text-stone-900" htmlFor="username">
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="TheLegend27"
                className={`rounded-md border-2 px-2 py-1 ${
                  errors.username && touched.username
                    ? "border-red-400"
                    : "border-stone-400"
                }`}
              />
              {errors.username && touched.username ? (
                <ErrorMessage name="username">
                  {(msg) => <span className="text-sm text-red-400">{msg}</span>}
                </ErrorMessage>
              ) : (
                <span className="text-sm text-stone-500">
                  The name that people will see as
                </span>
              )}
            </div>

            {/* EMAIL */}
            <div className="flex flex-col justify-end gap-1">
              <label className="font-bold text-stone-900" htmlFor="email">
                Email
              </label>
              <Field
                id="email"
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
                  {(msg) => <span className="text-sm text-red-400">{msg}</span>}
                </ErrorMessage>
              ) : (
                <span className="text-sm text-stone-500">
                  Only used for email-verification (wont be visible)
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
                  {(msg) => <span className="text-sm text-red-400">{msg}</span>}
                </ErrorMessage>
              ) : (
                <span className="text-sm text-stone-500">
                  Choose a strong password for your user access
                </span>
              )}
            </div>

            {/* PASSWORD REPEAT */}
            <div className="flex flex-col justify-end gap-1">
              <label
                className="font-bold text-stone-900"
                htmlFor="password_repeat"
              >
                Repeat Password
              </label>
              <Field
                id="password_repeat"
                name="password_repeat"
                type="password"
                placeholder="********"
                className={`rounded-md border-2 px-2 py-1 ${
                  errors.password_repeat && touched.password_repeat
                    ? "border-red-400"
                    : "border-stone-400"
                }`}
              />
              {errors.password_repeat && touched.password_repeat ? (
                <ErrorMessage name="password_repeat">
                  {(msg) => <span className="text-sm text-red-400">{msg}</span>}
                </ErrorMessage>
              ) : (
                <span className="text-sm text-stone-500">
                  Please repeat your password
                </span>
              )}
            </div>
            {/* SUBMIT */}
            <button
              className="mt-1 rounded-lg border-2 border-stone-100 bg-blue-600 px-4 py-1 text-lg text-stone-50 hover:border-blue-600 hover:bg-blue-600"
              disabled={isSubmitting}
              type="submit"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
