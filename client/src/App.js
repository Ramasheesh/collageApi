import { Route, Routes  } from "react-router-dom";
import Main from "./component/Main";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";

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
