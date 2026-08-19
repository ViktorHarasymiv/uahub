import { ReactNode } from "react";

export default function ResetPassLayout({ children }: { children: ReactNode }) {
  return (
    <main className="reset-wrapper main main_inside">
      <section className="reset-section">
        <div className="container">
          <h1>Reset your password</h1>
          {children}
        </div>
      </section>
    </main>
  );
}
