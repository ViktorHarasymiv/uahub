"use client";

import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import { ResetPassword } from "@/app/types/auth";
import Button from "@/app/ui/Button/Button";
import { useEmailChecker } from "@/app/hook/useEmailChecker";
import { sendResetEmail } from "@/app/lib/api/api";
import toast from "react-hot-toast";

export default function SentEmailForm() {
  const [email, setEmail] = useState("");

  const { exists, error } = useEmailChecker(email);

  const initialValues: ResetPassword = {
    email: "",
  };

  const UserUpdateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Niepoprawny email")
      .required("Email jest wymagany"),
  });

  const handleSubmit = async (formValues: ResetPassword) => {
    const { email } = formValues;

    if (!email) {
      toast.error("Email is missing");
      return;
    }

    try {
      const res = await sendResetEmail(email);
      if (res) {
        toast.success("Link successfully sent");
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="block_position">
      <div className="block_internal">
        <Formik
          initialValues={initialValues}
          validationSchema={UserUpdateSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="form_block">
              <div>
                <h2 className="block_title">Wpisz swoj e-mail</h2>
                <p className="block_sub_title">
                  Na adres e-mail wyślemy Ci wiadomość z linkiem aktywacyjnym.
                </p>
              </div>

              <div className="input_block">
                <label className="input_label">Email</label>

                <Field
                  name="email"
                  type="email"
                  className="input_base"
                  onChange={(e: FormikValues) => {
                    values.email = e.target.value;
                    setEmail(e.target.value);
                  }}
                />

                {error && <span className="input_error">{error}</span>}
              </div>

              <Button type="submit" accent disable={!exists}>
                Wyślij
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
