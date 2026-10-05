import { useState } from "react";
import {
  ArrowRight,
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

      {/* Subtle contrast treatment that keeps the building visible. */}
      <div className="absolute inset-0 bg-[#03131f]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#031522]/76 via-[#031522]/28 to-[#031522]/12" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020f19]/48 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1720px] items-center px-7 py-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-20 lg:px-14 xl:grid-cols-[minmax(0,1fr)_460px] xl:px-20 2xl:gap-28 2xl:px-28">
        <section className="hidden min-w-0 lg:block">
          <div className="max-w-[790px]">
            <img
              src="/gsis-new-logo.png"
              alt="GSIS Government Service Insurance System"
              className="w-full max-w-[690px] object-contain brightness-[0.9] contrast-[1.08] drop-shadow-[0_10px_28px_rgba(0,0,0,0.36)]"
            />

            <div className="mt-10 max-w-[720px]">
              <div className="mb-5 h-[3px] w-14 rounded-full bg-[#4DA8F5]" />
              <h1 className="text-[48px] font-semibold leading-[1.04] tracking-[-0.035em] text-white xl:text-[58px]">
                Record Retrieval System
              </h1>
              <p className="mt-5 max-w-[620px] text-[17px] leading-7 text-slate-200/85 xl:text-[18px]">
                Securely locate, retrieve, and track physical records across the GSIS office.
              </p>

              <div className="mt-8 flex items-center gap-3 text-[13px] text-slate-300/90">
                <ShieldCheck size={17} className="text-[#70BEFF]" />
                <span>Secure internal system for authorized personnel</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.20] bg-[#0a1c2a]/62 shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-[26px]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-[#1684D8]/[0.04]" />
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />

            <div className="relative px-7 py-8 sm:px-9 sm:py-9 xl:px-10 xl:py-10">
              <div className="mb-8 lg:hidden">
                <img
                  src="/gsis-new-logo.png"
                  alt="GSIS Government Service Insurance System"
                  className="mx-auto w-full max-w-[310px] object-contain brightness-[0.92] drop-shadow-lg"
                />
                <div className="mx-auto mt-6 h-px max-w-[260px] bg-white/10" />
              </div>

              <div className="mb-8">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.07]">
                  <LockKeyhole size={19} className="text-[#7BC4FF]" />
                </div>
                <h2 className="text-[30px] font-semibold tracking-[-0.025em] text-white">
                  Sign in
                </h2>
                <p className="mt-2 text-[14px] leading-6 text-slate-400">
                  Enter your account credentials to continue.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-[13px] font-medium text-slate-300"
                  >
                    Username
                  </label>
                  <div className="group relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-[#73BFFF]"
                    />
                    <input
                      id="username"
                      type="text"
                      autoComplete="username"
                      placeholder="Enter your username"
                      className="h-14 w-full rounded-xl border border-white/[0.12] bg-white/[0.055] pl-11 pr-4 text-[14px] text-white outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 hover:bg-white/[0.07] focus:border-[#5DB3F4]/65 focus:bg-white/[0.075] focus:ring-4 focus:ring-[#1684D8]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-[13px] font-medium text-slate-300"
                  >
                    Password
                  </label>
                  <div className="group relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-[#73BFFF]"
                    />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="h-14 w-full rounded-xl border border-white/[0.12] bg-white/[0.055] pl-11 pr-12 text-[14px] text-white outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 hover:bg-white/[0.07] focus:border-[#5DB3F4]/65 focus:bg-white/[0.075] focus:ring-4 focus:ring-[#1684D8]/10"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1.5 text-slate-500 transition hover:bg-white/[0.07] hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group mt-2 flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-[#61B7F6]/20 bg-[#0879BD] text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,89,150,0.22)] transition duration-200 hover:bg-[#0A86CE] hover:shadow-[0_14px_30px_rgba(0,89,150,0.28)] active:translate-y-px"
                >
                  Sign in
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </form>

              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck size={14} />
                  <span>Authorized GSIS personnel only</span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-white/35">
            Record Retrieval System · Internal Use
          </p>
        </section>
      </div>
    </main>
  );
}

export default Login;
