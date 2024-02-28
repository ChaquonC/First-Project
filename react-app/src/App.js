import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

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
      <h1>WOW</h1>
    </>
  );
}

export default App;
