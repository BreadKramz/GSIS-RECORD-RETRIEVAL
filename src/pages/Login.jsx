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
    <main className="relative min-h-screen overflow-hidden bg-[#061725] font-sans text-white">
      <div
        className="absolute inset-0 bg-cover bg-center lg:bg-[center_46%]"
        style={{ backgroundImage: "url('/gsis-login-background.png')" }}
      />

      {/* Keep the Dumaguete branch visible while giving the interface a clear focal area. */}
      <div className="absolute inset-0 bg-[#041521]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#03131f]/88 via-[#031522]/55 to-[#03131f]/28" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020d16]/68 via-transparent to-[#031522]/18" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex h-20 items-center justify-between px-6 sm:px-9 lg:h-24 lg:px-14 xl:px-20 2xl:px-24">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.20)] ring-1 ring-black/5 lg:h-14 lg:w-14">
              <img
                src="/gsis-logo.svg"
                alt="GSIS"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="leading-none">
              <p className="text-[22px] font-bold tracking-[0.04em] text-white lg:text-[25px]">GSIS</p>
              <p className="mt-1.5 hidden text-[9px] font-medium uppercase tracking-[0.12em] text-white/55 sm:block">
                Government Service Insurance System
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 md:flex">
            <ShieldCheck size={14} className="text-[#75BFFF]" />
            Internal System
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-[1720px] flex-1 items-center gap-12 px-6 pb-16 pt-4 sm:px-9 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-14 lg:pb-20 lg:pt-0 xl:grid-cols-[minmax(0,1fr)_450px] xl:gap-20 xl:px-20 2xl:px-24">
          <section className="hidden max-w-[760px] lg:block">
            <div className="mb-6 inline-flex items-center border-l-2 border-[#5DB4EF] pl-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-200/85">
              GSIS Dumaguete Branch
            </div>

            <h1 className="max-w-[700px] text-[50px] font-semibold leading-[1.02] tracking-[-0.045em] text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.32)] xl:text-[60px] 2xl:text-[66px]">
              Record Retrieval
              <span className="block text-white/92">System</span>
            </h1>

            <p className="mt-6 max-w-[590px] text-[17px] leading-7 text-slate-200/82 xl:text-[18px]">
              A secure internal workspace for locating, retrieving, and tracking physical records.
            </p>

            <div className="mt-9 flex items-center gap-3 text-[13px] text-slate-300/75">
              <span className="h-px w-10 bg-[#64B8F5]/80" />
              Built for fast, accountable record handling
            </div>
          </section>

          <section className="mx-auto w-full max-w-[450px] lg:mx-0 lg:justify-self-end">
            <div className="overflow-hidden rounded-2xl border border-white/[0.16] bg-[#071925]/88 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl">
              <div className="h-[3px] w-full bg-[#0C79B8]" />

              <div className="px-7 py-8 sm:px-9 sm:py-9">
                <div className="mb-8 lg:hidden">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#77C1F8]">
                    GSIS Dumaguete Branch
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
                    Record Retrieval System
                  </h1>
                </div>

                <div className="mb-8">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055]">
                    <LockKeyhole size={20} className="text-[#79C3F8]" />
                  </div>
                  <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-white">
                    Welcome back
                  </h2>
                  <p className="mt-2 text-[14px] leading-6 text-slate-400">
                    Sign in to access the records workspace.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username" className="mb-2 block text-[13px] font-medium text-slate-300">
                      Username
                    </label>
                    <div className="group relative">
                      <UserRound
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-[#75C2FA]"
                      />
                      <input
                        id="username"
                        type="text"
                        autoComplete="username"
                        placeholder="Enter your username"
                        className="h-[54px] w-full rounded-xl border border-white/[0.11] bg-white/[0.055] pl-11 pr-4 text-[14px] text-white outline-none transition placeholder:text-slate-500 hover:border-white/[0.18] focus:border-[#59AFF0]/65 focus:bg-white/[0.07] focus:ring-4 focus:ring-[#1586CE]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-2 block text-[13px] font-medium text-slate-300">
                      Password
                    </label>
                    <div className="group relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-[#75C2FA]"
                      />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="h-[54px] w-full rounded-xl border border-white/[0.11] bg-white/[0.055] pl-11 pr-12 text-[14px] text-white outline-none transition placeholder:text-slate-500 hover:border-white/[0.18] focus:border-[#59AFF0]/65 focus:bg-white/[0.07] focus:ring-4 focus:ring-[#1586CE]/10"
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
                    className="group mt-1 flex h-[54px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#0879BD] text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,87,145,0.24)] transition duration-200 hover:bg-[#0A86CE] hover:shadow-[0_14px_30px_rgba(0,87,145,0.3)] active:translate-y-px"
                  >
                    Sign in
                    <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </form>

                <div className="mt-7 flex items-center gap-2 border-t border-white/[0.08] pt-5 text-[11px] text-slate-500">
                  <ShieldCheck size={14} />
                  <span>Access is restricted to authorized GSIS personnel.</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-[11px] text-white/35">
              GSIS Dumaguete Branch · Record Retrieval System
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Login;
