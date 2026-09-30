import { useState } from "react";
import { Eye, EyeOff, FileText, FolderOpen, LockKeyhole, Archive, UserRound } from "lucide-react";

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <main className="min-h-screen bg-white flex overflow-hidden">
      <section className="hidden lg:flex lg:w-[62%] xl:w-[64%] relative overflow-hidden items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i0.wp.com/www.theurbanroamer.com/wp-content/uploads/2013/10/pa120094.jpg')",
            backgroundPosition: "58% center",
          }}
        />
        <div className="absolute inset-0 bg-[#045B91]/42" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#034F82]/95 via-[#075E96]/68 to-[#075E96]/22" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#034D7D]/80 via-transparent to-[#075E96]/10" />

        <div className="absolute top-0 inset-x-0 h-[5px] bg-[#4F963B]" />
        <div className="absolute bottom-0 left-0 w-[42%] h-[5px] bg-[#F2BC19]" />

        <img
          src="/gsis-logo.svg"
          alt=""
          aria-hidden="true"
          className="absolute -left-14 bottom-8 w-[300px] opacity-[0.09] brightness-0 invert pointer-events-none"
        />

        <div className="relative z-10 w-full max-w-[760px] px-14 xl:px-20 text-white">
          <div className="flex items-center gap-5 mb-14">
            <div className="w-[74px] h-[74px] bg-white rounded-xl flex items-center justify-center shadow-xl">
              <img src="/gsis-logo.svg" alt="GSIS Logo" className="h-[66px] w-[66px] object-contain" />
            </div>
            <div>
              <p className="text-[15px] font-bold tracking-[0.24em] text-white/90">GSIS</p>
              <h1 className="mt-1 text-[32px] xl:text-[38px] leading-none font-bold tracking-tight">
                Record Retrieval System
              </h1>
              <p className="mt-3 text-lg xl:text-xl text-white/90">
                Government Service Insurance System
              </p>
            </div>
          </div>

          <h2 className="text-[48px] xl:text-[60px] font-bold tracking-[-0.035em] leading-[1.08] drop-shadow-sm">
            Find records.<br />
            Track movement.<br />
            Retrieve efficiently.
          </h2>

          <p className="mt-7 text-[18px] xl:text-[20px] text-white/90 leading-relaxed max-w-[650px]">
            A centralized workspace for monitoring the retrieval,
            forwarding, location, and return of physical records.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <div className="flex items-center gap-2.5 rounded-full border border-white/35 bg-[#05649D]/45 px-5 py-2.5 text-sm font-medium backdrop-blur-sm">
              <FileText size={17} /> Policy Envelopes
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-white/35 bg-[#05649D]/45 px-5 py-2.5 text-sm font-medium backdrop-blur-sm">
              <FolderOpen size={17} /> Active Files
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-white/35 bg-[#05649D]/45 px-5 py-2.5 text-sm font-medium backdrop-blur-sm">
              <Archive size={17} /> Retirement
            </div>
          </div>
        </div>

        <svg className="absolute bottom-0 left-0 z-[5] h-[120px] w-full pointer-events-none" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,72 C190,118 310,24 500,67 C700,112 815,32 1000,54 L1000,120 L0,120 Z" fill="rgba(255,255,255,.14)" />
          <path d="M0,94 C210,132 330,50 520,88 C720,128 835,56 1000,73 L1000,120 L0,120 Z" fill="rgba(7,104,159,.48)" />
        </svg>
      </section>

      <section className="flex-1 relative flex items-center justify-center bg-[#FBFCFE] px-8 py-10">
        <div className="absolute -right-28 top-24 h-72 w-72 rotate-45 rounded-[55px] bg-[#F1F6FA]" />
        <div className="absolute -right-24 bottom-[-90px] h-72 w-72 rotate-45 rounded-[55px] bg-[#F4F8FB]" />

        <div className="relative z-10 w-full max-w-[480px]">
          <div className="lg:hidden mb-10 text-center">
            <img src="/gsis-logo.svg" alt="GSIS Logo" className="h-16 w-16 mx-auto object-contain" />
            <h1 className="mt-3 text-2xl font-bold text-[#08689F]">GSIS Record Retrieval</h1>
          </div>

          <div className="mb-10">
            <p className="text-sm font-bold text-[#08689F] uppercase tracking-[0.24em] mb-3">Authorized Access</p>
            <h2 className="text-[34px] font-bold tracking-tight text-[#172D3F]">Welcome back</h2>
            <p className="text-gray-500 mt-2 text-[17px]">Sign in to access the Record Retrieval System.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-[#243746] mb-2.5">Username</label>
              <div className="relative">
                <UserRound size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input id="username" type="text" autoComplete="username" placeholder="Enter your username"
                  className="w-full h-14 pl-12 pr-4 bg-white border border-slate-300 rounded-lg outline-none transition shadow-sm focus:border-[#0876B9] focus:ring-4 focus:ring-[#0876B9]/10" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#243746] mb-2.5">Password</label>
              <div className="relative">
                <LockKeyhole size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password"
                  className="w-full h-14 pl-12 pr-12 bg-white border border-slate-300 rounded-lg outline-none transition shadow-sm focus:border-[#0876B9] focus:ring-4 focus:ring-[#0876B9]/10" />
                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit"
              className="w-full h-14 bg-[#0875B5] hover:bg-[#06679F] active:bg-[#055A8B] text-white text-[17px] font-bold rounded-lg transition-colors cursor-pointer shadow-md shadow-[#08689F]/15">
              Sign In
            </button>
          </form>

          <div className="mt-11 pt-7 border-t border-slate-200">
            <img src="/gsis-government-branding.jpg" alt="GSIS, Ginhawa for All, and Bagong Pilipinas"
              className="mx-auto mb-5 max-h-[68px] w-auto max-w-full object-contain" />
            <p className="text-center text-xs text-slate-400">For authorized GSIS personnel only</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
