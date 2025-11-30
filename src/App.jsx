import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import MainContent from "./components/MainContent";

function App() {
  return (
    <>
      <div className="w-full h-auto bg-[#0B0D27]">
        <div className="w-full sm:w-[85%] md:w-[70%] lg:w-[55%] mx-auto py-10 sm:py-16 lg:py-20">
          <Header />
          <Main />
          <MainContent />
        </div>
      </div>
    </>
  );
}

export default App;
