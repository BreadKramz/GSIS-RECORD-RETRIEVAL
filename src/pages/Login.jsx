import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, Database, UserRound, ArrowRight } from "lucide-react";

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
        style={{ backgroundImage: "url('/gsis-login-background.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#031827]/78 via-[#031827]/34 to-[#031827]/12" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#02121E]/55 via-transparent to-[#031827]/12" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1640px] items-center gap-10 px-8 py-10 lg:px-14 xl:gap-16 xl:px-20 2xl:px-24">
        <section className="hidden min-w-0 flex-1 lg:block">
          <div className="max-w-[780px]">
            <img
              src="/gsis-new-logo.png"
              alt="GSIS Government Service Insurance System"
              className="w-full max-w-[690px] object-contain brightness-110 contrast-110 drop-shadow-[0_7px_20px_rgba(0,0,0,0.35)]"
            />

            <h1 className="mt-7 text-[46px] font-bold leading-none tracking-[-0.035em] text-white drop-shadow-md xl:text-[54px]">
              Record Retrieval System
            </h1>
            <p className="mt-5 max-w-[680px] text-[18px] leading-relaxed text-slate-200 xl:text-[20px]">
              Secure access to GSIS internal records and member information.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-[#0A2236]/58 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
                <ShieldCheck size={18} className="text-[#4DA6FF]" /> Secure Access
              </div>
              <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-[#0A2236]/58 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
                <Database size={18} className="text-[#4DA6FF]" /> Internal Records
              </div>
              <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-[#0A2236]/58 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
                <ShieldCheck size={18} className="text-[#4DA6FF]" /> Authorized Personnel Only
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[510px] lg:mx-0 lg:shrink-0">
          <div className="rounded-[26px] border border-white/25 bg-[#172A3D]/84 p-7 shadow-[0_25px_70px_rgba(0,0,0,0.48)] ring-1 ring-white/5 backdrop-blur-xl sm:p-9 xl:p-10">
            <div className="mb-8 lg:hidden">
              <img
                src="/gsis-new-logo.png"
                alt="GSIS Government Service Insurance System"
                className="mx-auto w-full max-w-[330px] object-contain brightness-110 drop-shadow-lg"
              />
              <h1 className="mt-5 text-center text-2xl font-bold text-white">Record Retrieval System</h1>
            </div>

            <div className="mb-8">
              <h2 className="text-[34px] font-bold tracking-tight text-white">Sign In</h2>
              <p className="mt-2 text-[16px] text-slate-300">Use your GSIS credentials to continue.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <UserRound size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  aria-label="Username"
                  placeholder="Username"
                  className="h-[58px] w-full rounded-xl border border-white/20 bg-white/10 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-300 focus:border-[#78B9FF] focus:bg-white/12 focus:ring-4 focus:ring-[#1684D8]/20"
                />
              </div>

              <div className="relative">
                <LockKeyhole size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  aria-label="Password"
                  placeholder="Password"
                  className="h-[58px] w-full rounded-xl border border-white/30 bg-white/10 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-300 focus:border-[#78B9FF] focus:bg-white/12 focus:ring-4 focus:ring-[#1684D8]/20"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-300 transition hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="group mt-3 flex h-[62px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#1688E5] to-[#2473E8] text-[17px] font-bold text-white shadow-lg shadow-blue-950/25 transition hover:brightness-110 active:scale-[0.995]"
              >
                Sign In
                <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
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
