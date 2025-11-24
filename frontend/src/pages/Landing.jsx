import React from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  MessageCircle,
  Zap,
  GraduationCap,
  ArrowRight,
  Menu,
  Search,
  FileText,
  Sparkles,
  CheckCircle,
  Play,
} from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-sm">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-black">
            MyTute
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/chat"
            className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
          >
            Get Started
          </Link>
        </div>
        <div className="md:hidden">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const BentoItem = ({
  title,
  description,
  icon: Icon,
  className = "",
  delay = 0,
  children,
}) => (
  <div
    className={`bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between 
    hover:border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group ${className}`}
    style={{
      animation: `fadeInUp 0.8s ease-out ${delay}s both`,
    }}
  >
    <div className="relative z-10">
      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300 shadow-sm">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-500 text-base leading-relaxed">{description}</p>
    </div>
    {children}
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-gray-100 overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Navbar />

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* New Hero Section: Text Left, Screenshot Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-32 animate-[fadeInUp_0.8s_ease-out]">
          {/* Left Side: Text Content */}
          <div className="space-y-8 order-2 lg:order-1 lg:col-span-5">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900">
                Your personal <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-gray-700 to-gray-500">
                  AI Tutor
                </span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed max-w-lg text-ellipsis">
                Upload your PDFs, lecture notes, and textbooks. Get instant
                answers, summaries, and quizzes tailored to your specific
                curriculum.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Chat with multiple documents at once",
                  "Get answers for every question of yours",
                  "Generate practice quizzes instantly",
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <CheckCircle size={18} className="text-black shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
              >
                Start Learning
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Right Side: App Screenshot */}
          <div className="relative order-1 lg:order-2 lg:col-span-7">
            {/* Decorative Background Elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000"></div>

            {/* Screenshot Container with Rounded Grey Border */}
            <div className="relative rounded-2xl border-8 border-gray-200 shadow-2xl shadow-gray-200/50 overflow-hidden bg-white aspect-auto group transform transition-transform hover:scale-[1.01] duration-500">
              {/* Placeholder Image - Replace with your screenshot */}
              <img
                src="Screenshot2.png"
                alt="MyTute AI Interface"
                className="w-full h-full object-cover object-top"
              />
              {/* Inner Border */}
              <div className="absolute inset-0 border border-black/5 rounded-lg pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Feature 1: Upload (Large) */}
          <div
            className="md:col-span-2 bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-10 relative overflow-hidden group hover:shadow-2xl hover:border-gray-300 transition-all duration-500"
            style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}
          >
            <div className="relative z-10 max-w-md">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-200 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Bring Your Own Data
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Simply drag and drop your PDF notes, slides, or textbooks. We
                process them instantly so you can start chatting with your
                curriculum.
              </p>
            </div>
            {/* Decorative UI */}
            <div className="absolute right-0 bottom-0 w-2/5 h-full bg-white border-l border-gray-100 rounded-tl-3xl p-6 shadow-[0_0_40px_-10px_rgba(0,0,0,0.05)] translate-y-12 translate-x-12 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700 ease-out">
              <div className="space-y-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <FileText size={18} className="text-gray-400" />
                  <div className="h-2.5 bg-gray-200 rounded-full w-24"></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 ml-4">
                  <FileText size={18} className="text-gray-400" />
                  <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <FileText size={18} className="text-gray-400" />
                  <div className="h-2.5 bg-gray-200 rounded-full w-20"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Search/Chat (Tall) */}
          <BentoItem
            title="Deep Search"
            description="Don't just keyword match. Understand the concepts behind your questions."
            icon={Search}
            className="md:row-span-2 bg-white"
            delay={0.3}
          >
            <div className="mt-8 bg-gray-50 rounded-2xl p-5 border border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all duration-500">
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                <div className="h-2.5 bg-gray-200 rounded-full w-3/4 mt-3" />
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-black shrink-0 shadow-md" />
                <div className="bg-black text-white rounded-2xl rounded-tr-sm p-3 text-xs w-full shadow-md">
                  Based on page 42, the concept implies...
                </div>
              </div>
            </div>
          </BentoItem>

          {/* Feature 3: Summaries */}
          <BentoItem
            title="Instant Summaries"
            description="Turn 50 pages of reading into a 5-minute summary. Perfect for exam prep."
            icon={Zap}
            delay={0.4}
          />

          {/* Feature 4: 24/7 */}
          <BentoItem
            title="Always Available"
            description="Your AI tutor never sleeps. Get help with homework at 3 AM without waiting."
            icon={MessageCircle}
            delay={0.5}
          />
        </div>

        {/* Steps Section */}
        <div className="max-w-5xl mx-auto mb-32 mt-32 px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Streamlined for success
            </h1>
            <p className="text-gray-500 text-lg">
              Three simple steps to transform how you study.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-linear-to-r from-gray-200 via-gray-200 to-gray-200 -z-10" />

            {[
              {
                title: "Upload",
                desc: "Drop your PDFs, slides, and notes.",
                icon: Upload,
              },
              {
                title: "Analyze",
                desc: "AI indexes your content instantly.",
                icon: Sparkles,
              },
              {
                title: "Learn",
                desc: "Chat and get cited answers.",
                icon: MessageCircle,
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center relative group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300">
                  <step.icon size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats / Trust Section */}
        <div className="bg-black text-white rounded-[2.5rem] p-12 md:p-24 mb-20 text-center relative overflow-hidden mx-auto max-w-7xl">
          {/* Background Gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-60" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">
              Trusted by students worldwide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
              {[
                { label: "Documents Processed", value: "100+" },
                { label: "Active Students", value: "5,000+" },
                { label: "Doubts Resolved", value: "1K+" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-500">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
