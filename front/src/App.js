import "./App.css";
import PersonForm from "./components/PersonForm/PersonForm";
import TablePersons from "./components/TablePersons/TablePersons";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <TablePersons />
      <PersonForm />
    </DataProvider>
  );
}

export default App;
