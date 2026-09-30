import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="min-h-screen bg-[#f4f7fa] flex">
      <section className="hidden lg:flex lg:w-[55%] bg-[#0067A8] relative overflow-hidden items-center justify-center">
        <div className="absolute w-[520px] h-[520px] bg-[#72B844]/20 rounded-full -top-44 -left-44" />
        <div className="absolute w-[460px] h-[460px] bg-[#F5C518]/15 rounded-full -bottom-52 -right-24" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#72B844] via-[#F5C518] to-[#72B844]" />

        <div className="relative z-10 max-w-xl px-12 text-white">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <img src="/gsis-logo.svg" alt="GSIS Logo" className="h-14 w-14 object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-blue-100">GSIS</p>
              <h1 className="text-3xl font-bold">Record Retrieval System</h1>
              <p className="text-blue-100 mt-1">Government Service Insurance System</p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
            Find records.<br />
            Track movement.<br />
            Retrieve efficiently.
          </h2>

          <p className="mt-6 text-blue-100 text-lg leading-relaxed max-w-lg">
            A centralized workspace for monitoring the retrieval, forwarding,
            location, and return of physical records.
          </p>

          <div className="mt-10 flex gap-3 text-sm">
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15">Policy Envelopes</span>
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15">Active Files</span>
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15">Retirement</span>
          </div>
        </div>
      </section>

      <section className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 text-center">
            <div className="w-14 h-14 mx-auto mb-3 bg-[#0067A8] rounded-xl flex items-center justify-center">
              <img src="/gsis-logo.svg" alt="GSIS Logo" className="h-12 w-12 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-[#0067A8]">GSIS Record Retrieval</h1>
          </div>

          <div className="mb-9">
            <p className="text-sm font-semibold text-[#72B844] uppercase tracking-[0.18em] mb-2">
              Authorized Access
            </p>
            <h2 className="text-3xl font-bold text-[#16324F]">Welcome back</h2>
            <p className="text-gray-500 mt-2">Sign in to access the Record Retrieval System.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <UserRound size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  className="w-full h-12 pl-12 pr-4 bg-white border border-gray-300 rounded-lg outline-none transition focus:border-[#0067A8] focus:ring-2 focus:ring-[#0067A8]/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <LockKeyhole size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full h-12 pl-12 pr-12 bg-white border border-gray-300 rounded-lg outline-none transition focus:border-[#0067A8] focus:ring-2 focus:ring-[#0067A8]/10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#0067A8] hover:bg-[#00568d] active:bg-[#004c7d] text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <img
              src="/gsis-government-branding.jpg"
              alt="GSIS, Ginhawa for All, and Bagong Pilipinas"
              className="mx-auto mb-5 max-h-16 w-auto max-w-full object-contain"
            />
            <p className="text-center text-xs text-gray-400">
              For authorized GSIS personnel only
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
