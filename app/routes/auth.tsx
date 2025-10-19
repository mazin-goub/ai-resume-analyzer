import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "../lib/puter";
import type { Route } from "./+types/auth";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind | Authentication" },
    { name: "description", content: "Log in to your account" },
  ];
}

const AuthPage = () => {
  const { auth, isLoading } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated && next) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-gradient min-h-screen flex items-center justify-center p-4">
      <div className="bg-liquid-glass border border-liquid-glass-border backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10">
        <section className="flex flex-col gap-8 bg-dark-200/80 rounded-2xl p-10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-gradient">Welcome</h1>
            <h2 className="text-gray-300">Log In to Continue Your Job Journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse bg-dark-300 border border-dark-400">
                <p className="text-gray-400">Signing You In...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button purple-gradient hover:purple-gradient-hover transition-all duration-300 hover:shadow-glow" onClick={auth.signOut}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button purple-gradient hover:purple-gradient-hover transition-all duration-300 hover:shadow-glow" onClick={auth.signIn}>
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthPage;
