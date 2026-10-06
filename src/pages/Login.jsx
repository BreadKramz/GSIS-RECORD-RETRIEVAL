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
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#04131f] font-sans text-white">
      <div
        className="absolute inset-0 bg-cover bg-center lg:bg-[center_48%]"
        style={{ backgroundImage: "url('/gsis-building.bg.png')" }}
      />
      <div className="absolute inset-0 bg-[#02111c]/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#031522]/60 via-[#031522]/16 to-[#031522]/48" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03111d]/65 via-transparent to-[#061a2a]/20" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-[62%] rotate-[4deg] rounded-[50%] border-[22px] border-[#0a73b9]/75" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-44 w-[58%] rotate-[4deg] rounded-[50%] border-[10px] border-[#26a55b]/75" />
      <div className="pointer-events-none absolute -bottom-28 -left-10 h-44 w-[54%] rotate-[4deg] rounded-[50%] border-[6px] border-[#f3c63b]/85" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14 xl:px-20">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-white/60">
              <img src="/gsis-logo.svg" alt="GSIS logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold tracking-[0.08em]">GSIS</span>
                <span className="hidden h-7 w-px bg-white/45 sm:block" />
                <span className="hidden text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:block">
                  Dumaguete Branch
                </span>
              </div>
              <p className="mt-1 hidden text-[11px] tracking-[0.06em] text-white/65 md:block">
                Government Service Insurance System
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-black/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-md md:flex">
            <ShieldCheck size={15} className="text-[#73c7f7]" />
            Secure Internal System
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-[1680px] flex-1 items-center gap-12 px-6 pb-14 sm:px-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:px-14 xl:gap-20 xl:px-20">
          <section className="hidden max-w-[690px] self-end pb-20 lg:block">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#61bdf4]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/85">
                Records Management
              </span>
            </div>
            <h1 className="text-[54px] font-semibold leading-[1.02] tracking-[-0.045em] drop-shadow-lg xl:text-[64px]">
              Record Retrieval
              <span className="block text-white/90">System</span>
            </h1>
            <p className="mt-5 max-w-[560px] text-[17px] leading-7 text-white/75">
              Secure records. Efficient retrieval. Accountable public service.
            </p>
          </section>

          <section className="mx-auto w-full max-w-[520px] lg:mx-0 lg:justify-self-end">
            <div className="overflow-hidden rounded-[28px] border border-white/30 bg-[#102b3b]/55 shadow-[0_30px_90px_rgba(0,0,0,.48)] backdrop-blur-2xl">
              <div className="h-1 bg-gradient-to-r from-[#087bc1] via-[#20a35a] to-[#f4c63d]" />

              <div className="px-7 py-8 sm:px-10 sm:py-10">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2.5 shadow-[0_12px_35px_rgba(0,0,0,.22)] ring-1 ring-white/70">
                    <img src="/gsis-logo.svg" alt="GSIS" className="h-full w-full object-contain" />
                  </div>
                  <h2 className="text-[30px] font-bold tracking-[0.03em]">GSIS</h2>
                  <p className="mt-1 text-[18px] font-semibold tracking-[-0.01em] text-white/95">
                    Record Retrieval System
                  </p>
                  <div className="mx-auto mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-[#1684c7] via-[#22a65d] to-[#f0c83f]" />
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/65">
                    Dumaguete Branch
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="group relative">
                    <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/55 transition group-focus-within:text-white" />
                    <input
                      id="username"
                      type="text"
                      autoComplete="username"
                      required
                      placeholder="Username"
                      className="h-14 w-full rounded-xl border border-white/20 bg-white/10 pl-12 pr-4 text-[14px] text-white outline-none transition placeholder:text-white/55 hover:bg-white/[.13] focus:border-[#71c5f5]/80 focus:bg-white/[.14] focus:ring-4 focus:ring-[#1592d4]/15"
                    />
                  </div>

                  <div className="group relative">
                    <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/55 transition group-focus-within:text-white" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="Password"
                      className="h-14 w-full rounded-xl border border-white/20 bg-white/10 pl-12 pr-12 text-[14px] text-white outline-none transition placeholder:text-white/55 hover:bg-white/[.13] focus:border-[#71c5f5]/80 focus:bg-white/[.14] focus:ring-4 focus:ring-[#1592d4]/15"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/55 transition hover:bg-white/10 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-1 text-[12px]">
                    <label className="flex cursor-pointer items-center gap-2.5 text-white/70">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 accent-[#0c86cb]"
                      />
                      Remember me
                    </label>
                    <button type="button" className="font-medium text-[#8bd1fb] transition hover:text-white">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="group flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0879bd] to-[#0869b5] text-[15px] font-semibold shadow-[0_12px_28px_rgba(0,89,154,.34)] transition hover:brightness-110 active:translate-y-px"
                  >
                    Sign In
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>

                <div className="mt-7 rounded-xl border border-white/12 bg-black/10 px-4 py-3.5">
                  <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-white/78">
                    <ShieldCheck size={15} className="text-[#86d1fb]" />
                    Authorized GSIS Personnel Only
                  </div>
                  <p className="mt-1 text-center text-[10px] leading-4 text-white/45">
                    System access and record activities may be monitored and logged.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-[10px] tracking-[0.08em] text-white/45">
              GOVERNMENT SERVICE INSURANCE SYSTEM · DUMAGUETE BRANCH
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Login;
