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
      <section className="hidden lg:flex lg:w-[61%] xl:w-[63%] relative overflow-hidden items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/gsis-building.bg.png')",
            backgroundPosition: "center center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/82 to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#EAF3F8]/70 via-white/5 to-white/15" />

        <div className="absolute top-0 inset-x-0 h-[5px] bg-[#4F963B]" />
        <div className="absolute bottom-0 left-0 w-[42%] h-[5px] bg-[#F2BC19]" />

        <div className="relative z-10 w-full max-w-[800px] px-14 xl:px-20 2xl:px-24 text-[#17364B]">
          <div className="mb-12">
            <img
              src="/gsis-new-logo.png"
              alt="GSIS Government Service Insurance System"
              className="h-[92px] w-auto max-w-[600px] object-contain drop-shadow-[0_3px_8px_rgba(15,61,87,0.12)]"
            />
            <div className="mt-5 border-l-4 border-[#F2BC19] pl-4">
              <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-[#4E7187]">Internal Records Workspace</p>
              <h1 className="mt-1 text-[30px] font-bold leading-tight tracking-tight text-[#075A89] xl:text-[34px]">
                Record Retrieval System
              </h1>
            </div>
          </div>

          <h2 className="text-[46px] xl:text-[56px] 2xl:text-[62px] font-bold tracking-[-0.035em] leading-[1.08] text-[#123D59]">
            Find records.<br />
            Track movement.<br />
            Retrieve efficiently.
          </h2>

          <p className="mt-7 text-[18px] xl:text-[20px] text-[#35586E] leading-relaxed max-w-[650px]">
            A centralized workspace for monitoring the retrieval,
            forwarding, location, and return of physical records.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <div className="flex items-center gap-2.5 rounded-full border border-[#0A6A9F]/20 bg-white/72 px-5 py-2.5 text-sm font-semibold text-[#075A89] shadow-sm backdrop-blur-md">
              <FileText size={17} /> Policy Envelopes
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-[#0A6A9F]/20 bg-white/72 px-5 py-2.5 text-sm font-semibold text-[#075A89] shadow-sm backdrop-blur-md">
              <FolderOpen size={17} /> Active Files
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-[#0A6A9F]/20 bg-white/72 px-5 py-2.5 text-sm font-semibold text-[#075A89] shadow-sm backdrop-blur-md">
              <Archive size={17} /> Retirement
            </div>
          </div>
        </div>

      </section>

      <section className="flex-1 relative flex items-center justify-center bg-[#FBFCFE] px-8 py-10">
        <div className="absolute -right-28 top-24 h-72 w-72 rotate-45 rounded-[55px] bg-[#F1F6FA]" />
        <div className="absolute -right-24 bottom-[-90px] h-72 w-72 rotate-45 rounded-[55px] bg-[#F4F8FB]" />

        <div className="relative z-10 w-full max-w-[480px]">
          <div className="mb-10 text-center lg:hidden">
            <img
              src="/gsis-new-logo.png"
              alt="GSIS Government Service Insurance System"
              className="mx-auto h-16 w-auto max-w-[330px] object-contain"
            />
            <h1 className="mt-4 text-2xl font-bold text-[#08689F]">Record Retrieval System</h1>
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
