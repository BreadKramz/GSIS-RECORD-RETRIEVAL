import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, Database, UserRound } from "lucide-react";

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061827]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/gsis-login-background.png')",
          backgroundPosition: "center center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#031827]/72 via-[#031827]/22 to-[#031827]/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#02121E]/42 via-transparent to-black/5" />

      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4F963B] via-[#0875B5] to-[#F2BC19]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] items-center gap-12 px-8 py-10 lg:px-14 xl:gap-20 xl:px-20">
        <section className="hidden min-w-0 flex-1 lg:block">
          <img
            src="/gsis-new-logo.png"
            alt="GSIS Government Service Insurance System"
            className="h-auto w-full max-w-[700px] object-contain brightness-110 contrast-110 drop-shadow-[0_8px_24px_rgba(0,0,0,0.38)]"
          />

          <div className="mt-8 max-w-[760px]">
            <h1 className="text-[46px] font-bold leading-[1.04] tracking-[-0.035em] text-white drop-shadow-lg xl:text-[58px]">
              Record Retrieval System
            </h1>
            <p className="mt-5 max-w-[690px] text-[18px] leading-relaxed text-white/78 xl:text-[20px]">
              Secure access to GSIS physical records, file movement, retrieval, forwarding, and return history.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-[#061E30]/55 px-5 py-2.5 text-sm font-medium text-white/90 shadow-sm backdrop-blur-md">
                <ShieldCheck size={17} className="text-[#6CB6FF]" /> Secure Access
              </div>
              <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-[#061E30]/55 px-5 py-2.5 text-sm font-medium text-white/90 shadow-sm backdrop-blur-md">
                <Database size={17} className="text-[#6CB6FF]" /> Internal Records
              </div>
              <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-[#061E30]/55 px-5 py-2.5 text-sm font-medium text-white/90 shadow-sm backdrop-blur-md">
                <UserRound size={17} className="text-[#6CB6FF]" /> Authorized Personnel Only
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[520px] lg:mx-0 lg:shrink-0">
          <div className="rounded-[28px] border border-white/20 bg-[#10273B]/82 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-9 xl:p-11">
            <div className="mb-8 lg:hidden">
              <img
                src="/gsis-new-logo.png"
                alt="GSIS Government Service Insurance System"
                className="mx-auto h-auto w-full max-w-[330px] object-contain brightness-110 drop-shadow-lg"
              />
              <div className="mt-6 border-t border-white/10 pt-6 text-center">
                <h1 className="text-2xl font-bold text-white">Record Retrieval System</h1>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6CB6FF]">Authorized Access</p>
              <h2 className="text-[34px] font-bold tracking-tight text-white">Sign In</h2>
              <p className="mt-2 text-[16px] text-slate-300">Use your GSIS credentials to continue.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-semibold text-slate-200">Username</label>
                <div className="relative">
                  <UserRound size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    className="h-14 w-full rounded-xl border border-white/15 bg-white/8 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-400 focus:border-[#58AFFF] focus:bg-white/10 focus:ring-4 focus:ring-[#0876B9]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-200">Password</label>
                <div className="relative">
                  <LockKeyhole size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-14 w-full rounded-xl border border-white/15 bg-white/8 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-400 focus:border-[#58AFFF] focus:bg-white/10 focus:ring-4 focus:ring-[#0876B9]/20"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 h-14 w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#1684D8] to-[#256FE8] text-[16px] font-bold text-white shadow-lg shadow-[#0875B5]/20 transition hover:brightness-110 active:scale-[0.995]"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 border-t border-white/10 pt-6 text-center">
              <p className="text-xs text-slate-400">For authorized GSIS personnel only</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
