"use client";

import Link from "next/link";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import style from "./Style.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";

import { useModalStore } from "@/app/store/useModalStore";
import { useState } from "react";
import { login } from "@/app/lib/api";
import { useAuthStore } from "@/app/store/useAuthState";

export default function LoginModal() {
  // STORE
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);

  const login = useAuthStore((s) => s.login);

  // STATE

  const [showPass, setShowPass] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Некоректний email")
      .required("Email обов'язковий"),
    password: Yup.string()
      .min(6, "Мінімум 6 символів")
      .required("Пароль обов'язковий"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Login:", values);

    const success = await login({
      email: values.email,
      password: values.password,
    });

    console.log(success);

    if (success) {
      closeModal();
    } else {
      return;
    }
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Увійти в свій профіль</h2>
      <button type="button" onClick={closeModal} className={style.close}>
        <IoCloseOutline />
      </button>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* INPUTS */}
        <Form style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className={style.input_wrapper}>
            {/* EMAIL */}

            <div>
              <Field
                name="email"
                type="email"
                placeholder="Е-мейл"
                className={style.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={style.error}
              />
            </div>

            {/* PASSWORD */}

            <div>
              <div className={style.trick_wrapper}>
                <Field
                  name="password"
                  type={showPass ? "name" : "password"}
                  placeholder="Пароль"
                  className={style.input}
                />
                {!showPass ? (
                  <MdOutlineRemoveRedEye
                    onClick={() => setShowPass((prev) => !prev)}
                    className={style.show_trick}
                  />
                ) : (
                  <LuEyeOff
                    onClick={() => setShowPass((prev) => !prev)}
                    className={style.show_trick}
                  />
                )}
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={style.error}
              />
            </div>
          </div>
          {/* HELP DESC  */}

          <div className={style.help_wrapper}>
            <div className="checkbox">
              <label htmlFor="checkbox" className="checkbox_label">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="checkbox_input"
                />
                <div className="checkbox_input_custom"></div>
                <span>Запам`ятати мене?</span>
              </label>
            </div>
            <Link href={"#"} className={style.forgot_pass}>
              Забули пароль?
            </Link>
          </div>

          {/* ACTION */}

          <div className={style.action_wrapper}>
            <button type="submit" className={style.submit_btn}>
              Увійти
            </button>
            <div className={style.line}>or</div>

            <button className={style.google_btn}>
              <FcGoogle />
              <span>Увійти з Google</span>
            </button>

            <span
              onClick={() => openModal("signUp")}
              className={style.create_link}
            >
              Створити профіль
            </span>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
