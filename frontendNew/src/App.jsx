import "./App.css";
import Model from "./components/Model";

function App() {
  return (
    <div className="root h-screen w-screen">
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src="https://www.pngmart.com/files/15/Vector-Building-PNG-File.png"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          City Quest
        </a>
      </nav>
      <div className="w-[100%] h-[90%] bg-red-200 flex">
        <div className="w-[70%]">
          <Model />
        </div>
        <div className="w-[30%]">hello</div>
      </div>
    </div>
  );
}

export default App;
