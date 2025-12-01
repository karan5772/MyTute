import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/Landing";
import ChatPage from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import { ArrowRight, GraduationCap } from "lucide-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/chat"
          element={
            <>
              <SignedOut>
                <div className="flex flex-col items-center justify-center h-screen bg-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-40"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                        linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
                      `,
                      backgroundSize: "4rem 4rem",
                    }}
                  />

                  <SignIn forceRedirectUrl="/chat" />
                </div>
              </SignedOut>
              <SignedIn>
                <ChatPage />
              </SignedIn>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
