import React, { useState } from "react";
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
  X,
  Star,
  ChevronDown,
  Twitter,
  Linkedin,
  Github,
  IndianRupee,
} from "lucide-react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-sm">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-black">
              MyTute
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/chat"
              className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-sm font-medium text-gray-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/chat"
            className="block w-full text-center text-sm font-medium bg-black text-white px-5 py-3 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

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

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-medium text-gray-900 group-hover:text-black">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-48 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// --- Main Page ---

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
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 lg:mb-32 animate-[fadeInUp_0.8s_ease-out]">
          {/* Left Side: Text Content */}
          <div className="space-y-8 order-1 lg:col-span-5">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900">
                Your personal <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-gray-700 to-gray-500">
                  AI Tutor
                </span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                Upload your PDFs, lecture notes, and textbooks. Get instant
                answers, summaries, and quizzes tailored to your specific
                curriculum.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Chat with multiple documents at once",
                  "Get citations for every answer",
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
              <a
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                Pricing
              </a>
            </div>
          </div>

          {/* Right Side: App Screenshot */}
          <div className="relative order-2 lg:col-span-7">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000"></div>

            <div className="relative rounded-2xl border-8 border-gray-200 shadow-2xl shadow-gray-200/50 overflow-hidden bg-white aspect-16/10 group transform transition-transform hover:scale-[1.01] duration-500">
              <img
                src="Screenshot2.png"
                alt="MyTute AI Interface"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 border border-black/5 rounded-lg pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Features Section (Bento Grid) */}
        <div id="features" className="scroll-mt-24 mb-32">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Everything you need to ace your exams
            </h2>
            <p className="text-gray-500 text-lg">
              Stop searching through hundreds of pages. Let AI do the heavy
              lifting while you focus on understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Feature 1: Upload (Large) */}
            <div className="md:col-span-2 bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-10 relative overflow-hidden group hover:shadow-2xl hover:border-gray-300 transition-all duration-500">
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-200 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Bring Your Own Data
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Simply upload your PDF notes or youtube video links. We
                  process them instantly so you can start chatting with your
                  curriculum.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 w-2/5 h-full bg-white border-l border-gray-100 rounded-tl-3xl p-6 shadow-[0_0_40px_-10px_rgba(0,0,0,0.05)] translate-y-12 translate-x-12 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700 ease-out">
                <div className="space-y-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  {[24, 32, 20].map((w, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 ${
                        i === 1 ? "ml-4" : ""
                      }`}
                    >
                      <FileText size={18} className="text-gray-400" />
                      <div
                        className={`h-2.5 bg-gray-200 rounded-full w-${w}`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2: Search/Chat (Tall) */}
            <BentoItem
              title="Deep Search"
              description="Don't just keyword match. Understand the concepts behind your questions."
              icon={Search}
              className="md:row-span-2 bg-white"
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
            />

            {/* Feature 4: 24/7 */}
            <BentoItem
              title="Always Available"
              description="Your AI tutor never sleeps. Get help with homework at 3 AM without waiting."
              icon={MessageCircle}
            />
          </div>
        </div>

        {/* How it Works Section */}
        <div id="how-it-works" className="max-w-5xl mx-auto mb-32 scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Streamlined for success
            </h2>
            <p className="text-gray-500 text-lg">
              Three simple steps to transform how you study.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-linear-to-r from-gray-200 via-gray-200 to-gray-200 -z-10" />

            {[
              {
                title: "Upload",
                desc: "Drop your PDFs and Youtube Links Links.",
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

        {/* Testimonials Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Loved by students
            </h2>
            <p className="text-gray-500 text-lg">
              Don't just take our word for it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "MyTute saved my finals. I uploaded 500 pages of lecture notes and it summarized everything perfectly.",
                author: "Harshwardhan Singh Shekhawat",
                role: "Data Science",
                bg: "bg-purple-50",
              },
              {
                quote:
                  "The citation feature is a game changer. I can verify every answer directly from my textbooks.",
                author: "Karan Choudhary",
                role: "Computer Science",
                bg: "bg-blue-50",
              },
              {
                quote:
                  "I use it to generate practice quizzes before every exam. It's like having a personal tutor 24/7.",
                author: "Aayush Joshi",
                role: "Artificial Intelegence",
                bg: "bg-green-50",
              },
            ].map((t, i) => (
              <div
                key={i}
                className={`p-8 rounded-3xl border border-gray-100 ${t.bg} bg-opacity-50`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-800 mb-6 font-medium leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-600">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">
                      {t.author}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mb-32 scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-500 text-lg">
              Start for free, upgrade when you need more power.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-3xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Student Basic
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">₹ 0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-500 mb-8">
                Perfect for trying out the platform.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "20 PDF & Videos Uploads / month",
                  "100 Chat messages",
                  "Basic Summaries",
                  "Basic Reasoning Models",
                  "Email Support",
                ].map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <CheckCircle size={16} className="text-gray-400" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                to="/chat"
                className="block w-full py-3 px-6 text-center rounded-xl text-white bg-black border  border-gray-200 font-medium hover:bg-gray-50 transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-3xl border border-black bg-black text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gray-800 text-xs font-bold px-3 py-1 rounded-bl-xl">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Pro Scholar</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">₹ 149</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 mb-8">
                For serious students who need unlimited access.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited PDF Uploads",
                  "Unlimited Chat & History",
                  "Advanced Reasoning Models",
                  "Priority Support",
                  "Quiz Generator",
                ].map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <CheckCircle size={16} className="text-white" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                target="_blank"
                to="https://rzp.io/rzp/mytute-pro"
                className="block w-full py-3 px-6 text-center rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-3xl mx-auto mb-32 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-2">
            <FaqItem
              question="How accurate are the answers?"
              answer="MyTute uses RAG (Retrieval-Augmented Generation) to ground every answer in your uploaded documents. We also provide citations so you can verify the source yourself."
            />
            <FaqItem
              question="Is my data secure?"
              answer="Yes. Your documents are stored securely and are only accessible by you. We do not use your data to train our public models."
            />
            <FaqItem
              question="Can I upload handwritten notes?"
              answer="Currently, we support digital PDFs and text-based documents best. OCR for handwritten notes is coming in a future update."
            />
            <FaqItem
              question="What happens to my files if I cancel?"
              answer="If you cancel your subscription, your files will remain accessible for the remainder of your billing cycle. After that, they will be archived."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black text-white rounded-[2.5rem] p-12 md:p-24 mb-20 text-center relative overflow-hidden mx-auto max-w-7xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-60" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Ready to upgrade your grades?
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Join thousands of students who are studying smarter, not harder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105"
              >
                Start Learning Now
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-100 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-white w-4 h-4" />
                </div>
                <span className="font-bold text-lg">MyTute</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Making education accessible and personalized through Artificial
                Intelligence.
              </p>
              <div className="flex gap-4">
                <Link target="_blank" to="https://x.com/karankumar5772">
                  <Twitter
                    size={20}
                    className="text-gray-400 hover:text-black cursor-pointer"
                  />
                </Link>
                <Link
                  target="_blank"
                  to="https://www.linkedin.com/in/karan5772/"
                >
                  <Linkedin
                    size={20}
                    className="text-gray-400 hover:text-black cursor-pointer"
                  />
                </Link>
                <Link target="_blank" to="https://github.com/karan5772/MyTute">
                  <Github
                    size={20}
                    className="text-gray-400 hover:text-black cursor-pointer"
                  />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#features" className="hover:text-black">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-black">
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://github.com/karan5772/MyTute"
                    className="hover:text-black"
                  >
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://github.com/karan5772/MyTute"
                    className="hover:text-black"
                  >
                    Docs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-black">
                    About
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://karan5772.hashnode.dev/"
                    className="hover:text-black"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/karan5772/"
                    className="hover:text-black"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-black">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400 pt-8 border-t border-gray-50">
            © 2025 MyTute AI. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
