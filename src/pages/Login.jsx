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

const features = [
  { icon: ShieldCheck, title: "Secure Access", detail: "Protected workspace" },
  { icon: Database, title: "Internal Records", detail: "Centralized retrieval" },
  { icon: UserRound, title: "Authorized Personnel", detail: "Restricted access" },
];

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#041522] font-sans">
      <div
        className="absolute inset-0 scale-[1.015] bg-cover bg-center"
        style={{ backgroundImage: "url('/gsis-login-background.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#02131f]/82 via-[#031b2a]/35 to-[#03131f]/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020e17]/58 via-transparent to-[#031827]/16" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1760px] items-center gap-12 px-7 py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(420px,0.65fr)] lg:px-12 xl:gap-20 xl:px-20 2xl:grid-cols-[minmax(0,1.45fr)_470px] 2xl:px-28">
        <section className="hidden min-w-0 lg:flex lg:items-center">
          <div className="w-full max-w-[860px]">
            <img
              src="/gsis-new-logo.png"
              alt="GSIS Government Service Insurance System"
              className="w-full max-w-[720px] object-contain brightness-[0.92] contrast-[1.08] saturate-[1.03] drop-shadow-[0_12px_32px_rgba(0,0,0,0.42)]"
            />

            <div className="mt-9 max-w-[790px]">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.22em] text-[#75BEFF]">
                Internal Records Workspace
              </p>
              <h1 className="max-w-[780px] text-[46px] font-bold leading-[1.02] tracking-[-0.045em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.3)] xl:text-[58px] 2xl:text-[64px]">
                Record Retrieval System
              </h1>
              <p className="mt-5 max-w-[650px] text-[18px] leading-8 text-slate-200/85">
                Search, retrieve, forward, and track physical GSIS records through one secure workspace.
              </p>

              <div className="mt-10 grid max-w-[760px] grid-cols-3 gap-3.5">
                {features.map(({ icon: Icon, title, detail }) => (
                  <div
                    key={title}
                    className="min-h-[116px] rounded-2xl border border-white/[0.14] bg-[#071d2d]/44 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#0a2940]/52"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[#66B9FF]/20 bg-[#1485D8]/15">
                      <Icon size={18} className="text-[#70BEFF]" />
                    </div>
                    <p className="text-[13px] font-semibold text-white">{title}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[460px] lg:justify-self-end 2xl:max-w-[470px]">
          <div className="mb-4 hidden items-center justify-end gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.75)]" />
            Secure internal access
          </div>
          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.24] bg-white/[0.07] p-px shadow-[0_36px_100px_rgba(0,0,0,0.52)] backdrop-blur-[36px]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.17] via-white/[0.025] to-[#1485D8]/[0.08]" />
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/75 to-transparent" />
            <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-[#2B9AF0]/15 blur-3xl" />

            <div className="relative rounded-[29px] bg-[#071a29]/48 px-7 py-8 sm:px-9 sm:py-9 lg:px-9 lg:py-9 2xl:px-10 2xl:py-10">
              <div className="mb-8 lg:hidden">
                <img
                  src="/gsis-new-logo.png"
                  alt="GSIS Government Service Insurance System"
                  className="mx-auto w-full max-w-[320px] object-contain brightness-[0.94] drop-shadow-lg"
                />
                <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              <div className="mb-8">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#72C2FF]/25 bg-[#1787D8]/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <LockKeyhole size={20} className="text-[#82C9FF]" />
                </div>
                <h2 className="text-[34px] font-bold tracking-[-0.03em] text-white">Welcome back</h2>
                <p className="mt-2 text-[15px] leading-6 text-slate-300">
                  Sign in with your authorized GSIS account to continue.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-300">
                    Username
                  </label>
                  <div className="group relative">
                    <UserRound size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-[#7CC7FF]" />
                    <input
                      id="username"
                      type="text"
                      autoComplete="username"
                      placeholder="Enter your username"
                      className="h-[58px] w-full rounded-xl border border-white/[0.16] bg-white/[0.085] pl-12 pr-4 text-[15px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] outline-none backdrop-blur-xl transition duration-200 placeholder:text-slate-500 hover:border-white/25 hover:bg-white/[0.105] focus:border-[#73C2FF]/75 focus:bg-white/[0.115] focus:ring-4 focus:ring-[#1684D8]/15"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-300">
                    Password
                  </label>
                  <div className="group relative">
                    <LockKeyhole size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-[#7CC7FF]" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="h-[58px] w-full rounded-xl border border-white/[0.16] bg-white/[0.085] pl-12 pr-12 text-[15px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] outline-none backdrop-blur-xl transition duration-200 placeholder:text-slate-500 hover:border-white/25 hover:bg-white/[0.105] focus:border-[#73C2FF]/75 focus:bg-white/[0.115] focus:ring-4 focus:ring-[#1684D8]/15"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative mt-2 flex h-[58px] w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl border border-[#76C4FF]/25 bg-gradient-to-r from-[#0879BF] via-[#0B82D0] to-[#176FDC] text-[15px] font-bold text-white shadow-[0_16px_34px_rgba(0,89,166,0.3),inset_0_1px_0_rgba(255,255,255,0.24)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_20px_42px_rgba(0,89,166,0.36),inset_0_1px_0_rgba(255,255,255,0.28)] active:translate-y-0"
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.09] to-transparent" />
                  <span className="relative">Sign In</span>
                  <ArrowRight size={18} className="relative transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>

              <div className="mt-8 border-t border-white/[0.09] pt-6">
                <div className="flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-slate-500">
                  <ShieldCheck size={14} />
                  Authorized GSIS personnel only
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
