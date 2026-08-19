"use client";

import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "../components/ResetPasswordForm";
export default function GetNewPassword() {
  const token = useSearchParams().get("token");
  return (
    <>
      <ResetPasswordForm token={token} />
    </>
  );
}
