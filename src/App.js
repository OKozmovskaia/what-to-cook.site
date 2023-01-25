import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Sidebar title="Filter" />
    </div>
  );
}

export default App;
