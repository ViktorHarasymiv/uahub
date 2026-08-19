"use client";

import { useEffect, useState } from "react";
import { checkEmail } from "../lib/api/api";

export const useEmailChecker = (email: string) => {
  const [exists, setExists] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | boolean>("");

  useEffect(() => {
    if (!email || email.length < 5) {
      setExists(undefined);
      setError(false);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);

      try {
        const { exists } = await checkEmail(email);

        setExists(exists);

        if (exists) {
          setError(true);
        } else {
          setError("E-mail не використовується");
        }
      } catch {
        setError(false);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [email]);

  return { exists, loading, error };
};
