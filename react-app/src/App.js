import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(authenticate()).then(() => setIsLoaded(true));
//   }, [dispatch]);
  return (
    <>
      {/* {isLoaded && (
        <div>
            <h1>we MADE IT</h1>
        </div>
      )} */}
      <LandingPage/>
    </>
  );
}

export default App;
