import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const result = await onLogin(email.trim(), password);
    if (!result.ok) setError(result.message);
    setLoading(false);
  };

  return (
    <main className="relative h-screen max-h-screen w-screen overflow-hidden bg-[#061522] font-sans text-white">
      <div
        className="absolute -inset-2 scale-[1.02] bg-cover bg-[center_58%] bg-no-repeat blur-[1.5px]"
        style={{ backgroundImage: "url('/gsis-login-background.png')" }}
      />
      <div className="absolute inset-0 bg-[#03131f]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#02111d]/78 via-[#03131f]/32 to-[#02111d]/62" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020b13]/55 via-transparent to-[#03131f]/28" />
      <div className="absolute inset-y-0 right-0 w-[48%] bg-gradient-to-l from-[#020d16]/42 to-transparent" />

      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 items-center px-8 lg:grid-cols-[1fr_410px] lg:gap-16 lg:px-12 xl:grid-cols-[1fr_430px] xl:px-16">
        <section className="hidden self-center lg:block">
          <div className="mb-7 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-1.5 shadow-xl">
              <img src="/gsis-logo.svg" alt="GSIS" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-[28px] font-bold leading-none tracking-[0.08em]">GSIS</div>
              <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
                Dumaguete Branch
              </div>
            </div>
          </div>

          <div className="max-w-[620px]">
            <div className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
              <span className="h-px w-9 bg-[#62b8ed]" />
              Internal Records Management
            </div>
            <h1 className="text-[50px] font-semibold leading-[1.02] tracking-[-0.045em] drop-shadow-[0_3px_16px_rgba(0,0,0,.35)] xl:text-[58px]">
              Record Retrieval
              <span className="block text-white/90">System</span>
            </h1>
            <p className="mt-5 max-w-[520px] text-[15px] leading-6 text-white/68">
              Securely locate, retrieve, and track physical records from one centralized workspace.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[430px]">
          <div className="rounded-2xl border border-white/[0.18] bg-[#071b29]/82 shadow-[0_24px_65px_rgba(0,0,0,.45)] backdrop-blur-xl">
            <div className="h-[3px] rounded-t-2xl bg-gradient-to-r from-[#0879bd] via-[#29a55e] to-[#e7bf38]" />

            <div className="p-7 xl:p-8">
              <div className="mb-6 lg:hidden">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5">
                    <img src="/gsis-logo.svg" alt="GSIS" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tracking-[0.06em]">GSIS</p>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/55">Dumaguete Branch</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#78c6f3]">
                  Record Retrieval System
                </p>
                <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em]">Welcome back</h2>
                <p className="mt-1 text-[12px] text-white/48">Sign in to continue to the records workspace.</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="mb-1.5 block text-[11px] font-medium text-white/65">Email</label>
                  <div className="group relative">
                    <UserRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 group-focus-within:text-[#74c3f2]" />
                    <input
                      id="username"
                      type="email"
                      autoComplete="username"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-lg border border-white/[0.13] bg-white/[0.055] pl-10 pr-3 text-[13px] text-white outline-none transition placeholder:text-white/30 focus:border-[#5bb5eb]/65 focus:bg-white/[0.075] focus:ring-2 focus:ring-[#1586ce]/15"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-1.5 block text-[11px] font-medium text-white/65">Password</label>
                  <div className="group relative">
                    <LockKeyhole size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 group-focus-within:text-[#74c3f2]" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-lg border border-white/[0.13] bg-white/[0.055] pl-10 pr-10 text-[13px] text-white outline-none transition placeholder:text-white/30 focus:border-[#5bb5eb]/65 focus:bg-white/[0.075] focus:ring-2 focus:ring-[#1586ce]/15"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-white/35 transition hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <label className="flex items-center gap-2 text-white/48">
                    <input type="checkbox" className="h-3.5 w-3.5 accent-[#0b80c3]" />
                    Remember me
                  </label>
                  <button type="button" className="font-medium text-[#79c5f0] hover:text-white">Forgot password?</button>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-300/20 bg-red-500/10 px-3 py-2.5 text-[11px] text-red-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-lg bg-[#0879bd] text-[13px] font-semibold shadow-[0_9px_22px_rgba(0,88,150,.28)] transition hover:bg-[#0987ce] active:translate-y-px disabled:cursor-wait disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-5 flex items-center justify-center gap-2 border-t border-white/[0.08] pt-4 text-[9px] uppercase tracking-[0.08em] text-white/32">
                <ShieldCheck size={12} />
                Authorized GSIS personnel only
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-[9px] uppercase tracking-[0.12em] text-white/30">
            Government Service Insurance System · Dumaguete
          </p>
        </section>
      </div>
    </main>
  );
}

export default Login;
