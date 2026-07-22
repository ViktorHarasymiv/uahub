"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import Button from "@/app/ui/Button/Button";
import { User } from "@/app/types/auth";
import { useAuthStore } from "@/app/store/useAuthState";
import { editProfile } from "@/app/lib/api/api";
import { AvatarUpdateForm } from "@/app/components/AvatarPicker/AvatarPicker";

export default function Setup() {
  const user = useAuthStore((s) => s.user);
  const fetchData = useAuthStore((s) => s.fetchData);

  const initialValues: User = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  };

  const UserUpdateSchema = Yup.object().shape({
    firstName: Yup.string().min(2).max(50).required("Imię jest wymagane"),
    lastName: Yup.string().min(2).max(50).required("Nazwisko jest wymagane"),
    email: Yup.string()
      .email("Niepoprawny email")
      .required("Email jest wymagany"),
    phone: Yup.string().min(9).max(15).required("Numer telefonu jest wymagany"),
  });

  const handleSubmit = async (
    formValues: User,
    { setSubmitting }: FormikHelpers<User>,
  ) => {
    try {
      const res = await editProfile(formValues);
      if (res) {
        fetchData();
      }

      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const submitVersion = {
    padding: "var(--block-padding)",
    borderRadius: "var(--block-b-radius)",
    backgroundColor: "var(--accent-color)",
    fontWeight: "600",
  };

  if (!user) return null;

  return (
    <div className="block_position">
      {/* CHANGE DATE */}
      <div className="block_internal">
        <Formik
          initialValues={initialValues}
          validationSchema={UserUpdateSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form_block">
              <div className="input_block">
                <label className="input_label">
                  Imię <span className="accent">*</span>
                </label>
                <Field
                  name="firstName"
                  className="input_base"
                  placeholder="Wpisz swoje Imię"
                />
                <ErrorMessage
                  name="firstName"
                  component="span"
                  className="input_error"
                />
              </div>

              <div className="input_block">
                <label className="input_label">Nazwisko</label>
                <Field
                  name="lastName"
                  className="input_base"
                  placeholder="Wpisz swoje Nazwisko"
                />
                <ErrorMessage
                  name="lastName"
                  component="span"
                  className="input_error"
                />
              </div>

              <div className="input_block">
                <label className="input_label">Email</label>
                <Field name="email" type="email" className="input_base" />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="input_error"
                />
              </div>

              <div className="input_block">
                <label className="input_label">Telefon</label>
                <Field
                  name="phone"
                  placeholder="Wpisz numer telefonu"
                  className="input_base"
                />
                <ErrorMessage
                  name="phone"
                  component="span"
                  className="input_error"
                />
              </div>
              <Button
                type={"submit"}
                disable={isSubmitting}
                styles={submitVersion}
              >
                Zaktualizuj
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {/* CHANGE AVATAR */}
      <div className="block_internal">
        <AvatarUpdateForm initialPhoto={user.photoUrl} />
      </div>
    </div>
  );
}
