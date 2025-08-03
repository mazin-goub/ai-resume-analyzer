import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {[
    {title: "Resumind | Auth"},
    {name: "description", content: "Login or register to access your account."},

]}

const Auth = () => {

    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next)
            else if (!auth.isAuthenticated) navigate("/")
    }, [auth.isAuthenticated, next, navigate])

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">

            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log in to continue your job journey!</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                Singing you in...
                            </button>
                        ) : (
                            <>
                            {auth.isAuthenticated ? (
                                <button className="auth-button" onClick={auth.signOut}>
                                    Log Out
                                </button>
                            ) : (
                                <button className="auth-button" onClick={auth.signIn}>
                                    Login
                                </button>
                            )}
                            </>
                        )}
                    </div>
                </section>
            </div>

        </main>
    );
}

export default Auth;