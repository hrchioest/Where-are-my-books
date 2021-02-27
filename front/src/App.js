import "./App.css";
import FormAdd from "./components/FormAdd";
import FormPerson from "./components/FormPerson/FormPerson";
import Modal from "./components/Modal/Modal";
import { DataProvider } from "./context/dataContext";

function App() {
  return (
    <DataProvider>
      <FormPerson />
      <FormAdd />
    </DataProvider>
  );
}

export default App;
