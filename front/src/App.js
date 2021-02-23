import "./App.css";
import FormAdd from "./components/FormAdd";
import FormPerson from "./components/FormPerson/FormPerson";
import LibrosPrestados from "./components/LibrosPrestados";
import { DataProvider } from "./context/dataContext";

function App() {
  return (
    <DataProvider>
      <FormPerson />
      <FormAdd />
      <LibrosPrestados />
    </DataProvider>
  );
}

export default App;
