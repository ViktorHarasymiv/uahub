"use client";

import Link from "next/link";
import style from "./Style.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ICONS

import { IoCloseOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { BsHeart } from "react-icons/bs";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";
import { IoIosArrowRoundBack } from "react-icons/io";

// STORE

import { useModalStore } from "@/app/store/useModalStore";
import { useEffect, useState } from "react";
import { ApiError } from "@/app/api/api";
import { RegisterRequest } from "@/app/types/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthState";
import { checkEmail } from "@/app/lib/api";

export default function SignUpModal() {
  const router = useRouter();
  // STORE
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);

  const register = useAuthStore((s) => s.register);

  // STATE
  const [email, setEmail] = useState("");

  const [emailInUse, setEmailInUse] = useState(false);

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    // firstName: "",
    // lastName: "",
    marketing: false,
    concent: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Некоректний email")
      .required("Email обов'язковий"),

    // firstName:
    //   step === 2 ? Yup.string().required("Ім'я обов'язкове") : Yup.string(),

    // lastName:
    //   step === 2 ? Yup.string().required("Прізвище обов'язкове") : Yup.string(),

    password:
      step === 2
        ? Yup.string()
            .min(6, "Мінімум 6 символів")
            .required("Пароль обов'язковий")
        : Yup.string(),

    confirmPassword:
      step === 2
        ? Yup.string()
            .oneOf([Yup.ref("password")], "Паролі не співпадають")
            .required("Повторіть пароль")
        : Yup.string(),

    // marketing:
    //   step === 2
    //     ? Yup.boolean().oneOf([true], "Потрібна згода на маркетинг")
    //     : Yup.boolean(),

    // concent:
    //   step === 2
    //     ? Yup.boolean().oneOf(
    //         [true],
    //         "Потрібна згода на інформаційні оновлення",
    //       )
    //     : Yup.boolean(),
  });

  const handleSubmit = async (values: RegisterRequest) => {
    try {
      // STEP 1 → STEP 2

      if (emailInUse) {
        return;
      }

      if (step === 1) {
        setStep(2);
        return;
      }

      // STEP 2 → фінальна відправка
      if (step === 2) {
        const payload = {
          email: values.email,
          password: values.password,
        };

        const res = await register(payload);
        closeModal();
        console.log(res);

        if (res) {
          router.push("/profile");
        } else {
          setError("Invalid email or password");
        }
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error",
      );
    }
  };

  useEffect(() => {
    if (!email || email.length < 5) {
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const { exists } = await checkEmail(email);

        if (exists) {
          setEmailInUse(exists);
          setError("Цей email вже використовується");
        } else {
          setEmailInUse(false);
          setError("");
        }
      } catch {
        setError("Помилка перевірки email");
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(delay);
  }, [email]);

  return (
    <>
      {/* CONTENT */}
      <div className={style.signUp_wrapper}>
        {/* 1 */}
        <div className={style.content_wrapper}>
          {/* ICON */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve"
              id="Layer_1"
              x="0"
              y="0"
              viewBox="0 0 48 48"
              width="32"
              height="32"
              display="inline"
              className={style.icon}
            >
              <path d="M23.8 12c-.6 0-1.1.5-1.1 1.1v11.2c0 .4.2.7.5.9l9.2 6c.2.1.4.2.6.2.4 0 .7-.2.9-.5.3-.5.2-1.2-.3-1.6L25 23.7V13.1c0-.6-.5-1.1-1.2-1.1"></path>
              <path d="M39 9C31.2 1.2 18.9.7 10.5 7.6l-.2-3.2c0-.6-.6-1.1-1.2-1.1S8 3.9 8 4.5l.3 6.1c0 .6.5 1.1 1.1 1.1l6.5-.2c.6 0 1.1-.5 1.1-1.2s-.6-1.1-1.2-1.1l-4.2.1c7.5-6.2 18.5-5.8 25.5 1.2 7.4 7.4 7.4 19.4 0 26.8s-19.4 7.4-26.8 0c-5.5-5.5-7.1-14-3.9-21.2.3-.6 0-1.2-.6-1.5s-1.2 0-1.5.6C1 23.3 2.8 32.8 9 39c4.1 4.1 9.6 6.2 15 6.2s10.9-2.1 15-6.2c8.3-8.2 8.3-21.7 0-30"></path>
            </svg>
          </div>
          {/* CONTENT */}
          <div className={style.content}>
            {/* TITLE */}
            <h3 className={style.sub_title}>
              Пошук проданих & зданих у оренду оголошень
            </h3>
            {/* DESCR */}
            <p className={style.description}>
              Перегляньте роки проданих та зданих у оренду оголошень, щоб
              побачити історію цін та дізнатися, скільки коштує ваша нерухомість
            </p>
          </div>
        </div>
        {/* 2 */}
        <div className={style.content_wrapper}>
          {/* ICON */}
          <div>
            <BsHeart className={style.icon} />
          </div>
          {/* CONTENT */}
          <div className={style.content}>
            {/* TITLE */}
            <h3 className={style.sub_title}>Зберегти вибране</h3>
            {/* DESCR */}
            <p className={style.description}>
              Зберігайте та відстежуйте свої улюблені оголошення за допомогою
              оновлень у режимі реального часу, персоналізованих нотаток та
              порівнянь.
            </p>
          </div>
        </div>
        {/* 3 */}
        <div className={style.content_wrapper}>
          {/* ICON */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve"
              id="Layer_1"
              x="0"
              y="0"
              viewBox="0 0 48 48"
              width="32"
              height="32"
              display="inline"
              className={style.icon}
            >
              <path d="M37.2 24.2v-4.6c0-5.8-3.7-10.9-9.3-12.6-2.4-.7-4.9-.7-7.3 0-5.5 1.6-9.3 6.7-9.3 12.4v4.8c0 2.8-1 5.6-2.7 7.7C6.9 33.9 6 36.4 6 39c0 .3.1.6.3.8s.5.3.7.3h9.8c.5 3.6 3.6 6.4 7.4 6.4s6.9-2.8 7.4-6.4h9.8c.6 0 1.1-.5 1.1-1.1 0-2.6-.9-5.1-2.6-7.1-1.7-2.2-2.7-4.9-2.7-7.7M24.3 44.3c-2.5 0-4.6-1.7-5.1-4.1h10.2c-.6 2.3-2.7 4.1-5.1 4.1m-16-6.4c.2-1.7.9-3.2 2-4.5 2.1-2.6 3.3-5.8 3.3-9.2v-4.8c0-4.7 3.2-8.9 7.7-10.3 2-.6 4.1-.6 6 0 4.6 1.4 7.7 5.6 7.7 10.4v4.6c0 3.3 1.2 6.6 3.3 9.2 1.1 1.3 1.8 2.9 2 4.5h-32zM14.4 4.6c.6-.2.9-.9.6-1.4-.2-.6-.9-.8-1.5-.6-5.7 2.4-9.7 8-10 14.3 0 .6.4 1.1 1.1 1.2h.1c.6 0 1.1-.5 1.1-1.1.2-5.4 3.6-10.3 8.6-12.4M34.4 2.6c-.6-.2-1.2 0-1.5.6-.2.6 0 1.2.6 1.5 5 2.1 8.4 6.9 8.7 12.3 0 .6.5 1.1 1.1 1.1h.1c.6 0 1.1-.6 1.1-1.2-.3-6.3-4.3-11.9-10.1-14.3"></path>
            </svg>
          </div>
          {/* CONTENT */}
          <div className={style.content}>
            {/* TITLE */}
            <h3 className={style.sub_title}>
              Отримуйте сповіщення про оновлення
            </h3>
            {/* DESCR */}
            <p className={style.description}>
              Будьте на крок попереду ринку — підпишіться на миттєві сповіщення
              про нові оголошення, що відповідають вашому пошуку
            </p>
          </div>
        </div>
      </div>
      {/* FORM */}
      <div className={style.wrapper}>
        <div className={style.title_block}>
          <h2 className={style.signUp_title}>Створи новий профіль</h2>

          {step > 1 && (
            <div className={style.back_action}>
              <IoIosArrowRoundBack
                className="svg_color_black"
                onClick={() => setStep(1)}
              />
              Back
            </div>
          )}
        </div>
        <button type="button" onClick={closeModal} className={style.close}>
          <IoCloseOutline />
        </button>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {/* INPUTS */}
          {({ values, handleChange, handleBlur }) => (
            <Form
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div className={style.input_wrapper}>
                {/* EMAIL */}
                {step === 1 && (
                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Е-мейл"
                      className={style.input}
                      value={values.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        setEmail(e.target.value); // записуємо email у реальному часі
                      }}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={style.error}
                    />
                    {error.length > 0 && (
                      <div className={style.error}>{error}</div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <>
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
                            onMouseEnter={() => setShowPass((prev) => !prev)}
                            className={style.show_trick}
                          />
                        ) : (
                          <LuEyeOff
                            onClick={() => setShowPass((prev) => !prev)}
                            onMouseLeave={() => setShowPass((prev) => !prev)}
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
                    {/* CONFIRM PASSWORD */}
                    <div>
                      <div className={style.trick_wrapper}>
                        <Field
                          name="confirmPassword"
                          type={showPass ? "name" : "password"}
                          placeholder="Повторіть пароль"
                          className={style.input}
                        />
                        {!showPass ? (
                          <MdOutlineRemoveRedEye
                            onClick={() => setShowPass((prev) => !prev)}
                            onMouseEnter={() => setShowPass((prev) => !prev)}
                            className={style.show_trick}
                          />
                        ) : (
                          <LuEyeOff
                            onClick={() => setShowPass((prev) => !prev)}
                            onMouseLeave={() => setShowPass((prev) => !prev)}
                            className={style.show_trick}
                          />
                        )}
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className={style.error}
                      />
                    </div>
                    {/* MARKETING CONSENT */}

                    <div>
                      <div className="checkbox">
                        <label htmlFor="marketing" className="checkbox_label">
                          <Field
                            type="checkbox"
                            name="marketing"
                            id="marketing"
                            className="checkbox_input"
                          />
                          <div className="checkbox_input_custom"></div>
                          <span className="label">
                            Отримуйте новини ринку, аналітичні матеріали та
                            поради експертів у свою поштову скриньку. Ми не
                            будемо розсилати вам спам!
                          </span>
                        </label>
                      </div>

                      <ErrorMessage
                        name="marketing"
                        component="div"
                        className={style.error}
                      />
                    </div>
                    {/*  CONSENT */}

                    <div style={{ marginBottom: "20px" }}>
                      <div className="checkbox">
                        <label htmlFor="concent" className="checkbox_label">
                          <Field
                            type="checkbox"
                            name="concent"
                            id="concent"
                            className="checkbox_input"
                          />
                          <div className="checkbox_input_custom"></div>

                          <div className={style.protected}>
                            <span className="label">
                              This site is protected by reCAPTCHA and the{" "}
                              <Link href={"#"} className={style.link}>
                                Privacy Policy
                              </Link>
                              &
                              <Link href={"#"} className={style.link}>
                                Terms of Service
                              </Link>
                              apply.
                            </span>
                          </div>
                        </label>
                      </div>

                      <ErrorMessage
                        name="concent"
                        component="div"
                        className={style.error}
                      />
                    </div>
                  </>
                )}
              </div>
              {/* HELP DESC  */}
              {step === 1 && (
                <div className={style.protected}>
                  This site is protected by reCAPTCHA and the{" "}
                  <Link href={"#"} className={style.link}>
                    Privacy Policy
                  </Link>
                  &
                  <Link href={"#"} className={style.link}>
                    Terms of Service
                  </Link>
                  apply.
                </div>
              )}

              {/* ACTION */}

              <div className={style.action_wrapper}>
                <button
                  type="submit"
                  className={`${style.submit_btn} ${style.accent_btn}`}
                >
                  {step === 1 ? "Перейти далі" : "Створити профіль"}
                </button>

                {/* HELP DESC  */}
                {step === 2 && (
                  <div className={style.protected}>
                    This site is protected by reCAPTCHA and the{" "}
                    <Link href={"#"} className={style.link}>
                      Privacy Policy
                    </Link>
                    &
                    <Link href={"#"} className={style.link}>
                      Terms of Service
                    </Link>
                    apply.
                  </div>
                )}

                {step === 1 && (
                  <>
                    <div className={style.line}>або</div>

                    <button className={style.google_btn}>
                      <FcGoogle />
                      <span>Створити з Google</span>
                    </button>
                  </>
                )}
                <span
                  onClick={() => {
                    openModal("signIn");
                  }}
                  className={style.create_link}
                >
                  Уже маєте профіль? Увійти
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
