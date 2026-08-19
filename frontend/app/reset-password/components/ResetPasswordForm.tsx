"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import Button from "@/app/ui/Button/Button";
import { sendResetPassword } from "@/app/lib/api/api";

interface tokenProps {
  token: string | null;
}

export default function ResetPasswordForm({ token }: tokenProps) {
  const initialValues = {
    password: "",
  };

  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Hasło musi mieć minimum 6 znaków")
      .required("Hasło jest wymagane"),
  });

  const handleSubmit = async (values: { password: string }) => {
    if (!token) {
      toast.error("Token is missing");
      return;
    }

    try {
      const res = await sendResetPassword(token, values.password);

      if (res) {
        toast.success("Hasło zostało zmienione");
      }
    } catch (error) {
      console.log(error);
      toast.error("Błąd podczas zmiany hasła");
    }
  };
  return (
    <div className="block_position">
      <div className="block_internal">
        <Formik
          initialValues={initialValues}
          validationSchema={PasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form_block">
              <div>
                <h2 className="block_title">Ustaw nowe hasło</h2>
                <p className="block_sub_title">
                  Wpisz nowe hasło, aby zakończyć proces resetowania.
                </p>
              </div>

              <div className="input_block">
                <label className="input_label">Nowe hasło</label>

                <Field name="password" type="password" className="input_base" />

                <ErrorMessage
                  name="password"
                  component="span"
                  className="input_error"
                />
              </div>

              <Button type="submit" accent disable={isSubmitting}>
                Zmień hasło
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
