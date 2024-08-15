import Router from "./Routes/Router";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
