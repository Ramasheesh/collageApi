import { Route, Routes  } from "react-router-dom";
import Main from "./component/Main/index.jsx";
import SignIn from "./component/SignIn/index.jsx";
import SignUp from "./component/SignUp/index.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Main />} />
      <Route path="/login" exact element={<SignIn />} />
      <Route path="/signup" exact element={<SignUp />} />
    </Routes>
  );
}

export default App;
