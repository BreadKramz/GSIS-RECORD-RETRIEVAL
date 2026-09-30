import { useState } from "react";
import {
  ArrowRight,
  Database,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061827] font-sans">
      <div
        className="absolute inset-0 scale-[1.01] bg-cover bg-center"
        style={{ backgroundImage: "url('/gsis-login-background.png')" }}
      />

      {/* Preserve the building while creating controlled contrast only where UI sits. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#031522]/80 via-[#041b2a]/30 to-[#031522]/16" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020f19]/48 via-transparent to-[#041827]/14" />
      <div className="absolute inset-y-0 right-0 w-[44%] bg-gradient-to-l from-black/16 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1680px] items-center gap-12 px-8 py-10 lg:px-14 xl:gap-20 xl:px-20 2xl:px-24">
        <section className="hidden min-w-0 flex-1 lg:flex lg:flex-col lg:justify-center">
          <div className="max-w-[790px]">
            <img
              src="/gsis-new-logo.png"
              alt="GSIS Government Service Insurance System"
              className="w-full max-w-[720px] object-contain brightness-[1.04] contrast-[1.08] saturate-[1.08] drop-shadow-[0_10px_30px_rgba(0,0,0,0.42)]"
            />

            <div className="mt-8 max-w-[760px]">
              <h1 className="text-[46px] font-bold leading-[1.04] tracking-[-0.04em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.35)] xl:text-[56px]">
                Record Retrieval System
              </h1>
              <p className="mt-5 max-w-[670px] text-[18px] leading-8 text-slate-200/90 xl:text-[19px]">
                Secure access to GSIS internal records and member information.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  [ShieldCheck, "Secure Access"],
                  [Database, "Internal Records"],
                  [UserRound, "Authorized Personnel Only"],
                ].map(([Icon, label]) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#071d2d]/48 px-4 py-2.5 text-[13px] font-semibold text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl"
                  >
                    <Icon size={17} className="text-[#62B4FF]" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[510px] lg:mx-0 lg:shrink-0">
          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.28] bg-white/[0.075] p-[1px] shadow-[0_32px_100px_rgba(0,0,0,0.52)] backdrop-blur-[34px]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.18] via-white/[0.035] to-[#1385d6]/[0.09]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#42A9FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-20 h-60 w-60 rounded-full bg-[#4F963B]/10 blur-3xl" />

            <div className="relative rounded-[29px] bg-[#071a29]/52 p-7 sm:p-9 xl:p-10">
              <div className="mb-8 lg:hidden">
                <img
                  src="/gsis-new-logo.png"
                  alt="GSIS Government Service Insurance System"
                  className="mx-auto w-full max-w-[320px] object-contain brightness-110 drop-shadow-lg"
                />
                <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
                  Record Retrieval System
                </h1>
              </div>

              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#67B7FF]/20 bg-[#1787D8]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8CCAFF]">
                  <ShieldCheck size={14} />
                  Authorized Access
                </div>
                <h2 className="text-[35px] font-bold tracking-[-0.025em] text-white">
                  Sign in
                </h2>
                <p className="mt-2 text-[15px] leading-6 text-slate-300">
                  Enter your GSIS credentials to access the records workspace.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="mb-2 block text-[13px] font-semibold text-slate-200">
                    Username
                  </label>
                  <div className="group relative">
                    <UserRound
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-[#76BEFF]"
                    />
                    <input
                      id="username"
                      type="text"
                      autoComplete="username"
                      placeholder="Enter your username"
                      className="h-[56px] w-full rounded-xl border border-white/[0.18] bg-white/[0.095] backdrop-blur-xl pl-12 pr-4 text-[15px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition duration-200 placeholder:text-slate-400/90 hover:border-white/30 hover:bg-white/[0.12] focus:border-[#74C2FF]/80 focus:bg-white/[0.13] focus:ring-4 focus:ring-[#1684D8]/15"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-[13px] font-semibold text-slate-200">
                    Password
                  </label>
                  <div className="group relative">
                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-[#76BEFF]"
                    />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="h-[56px] w-full rounded-xl border border-white/[0.18] bg-white/[0.095] backdrop-blur-xl pl-12 pr-12 text-[15px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition duration-200 placeholder:text-slate-400/90 hover:border-white/30 hover:bg-white/[0.12] focus:border-[#74C2FF]/80 focus:bg-white/[0.13] focus:ring-4 focus:ring-[#1684D8]/15"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative mt-2 flex h-[58px] w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl border border-[#6DBBFF]/20 bg-gradient-to-r from-[#087BC3] to-[#176FE0] text-[16px] font-bold text-white shadow-[0_14px_32px_rgba(0,85,160,0.28),inset_0_1px_0_rgba(255,255,255,0.22)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_18px_38px_rgba(0,85,160,0.34),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-0"
                >
                  <span className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />
                  <span className="relative">Sign In</span>
                  <ArrowRight size={18} className="relative transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>

              <div className="mt-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <p className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
                  GSIS Internal System
                </p>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <p className="mt-4 text-center text-xs text-slate-400">
                Access is restricted to authorized personnel.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
