import Sidebar from "./components/sidebar/Sidebar";
import MobileNav from "./components/nav/MobileNav";

export default function Home() {
  return (
     <main className="min-h-screen bg-white text-black">
      <MobileNav />
      <Sidebar />
      <div className="main-content">
        {/* Your main content goes here */}
      </div>
    
    </main>
  );
}
