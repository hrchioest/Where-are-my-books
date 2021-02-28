import "./App.css";
import FormAdd from "./components/FormAdd/FormAdd";
import TableBooks from "./components/TableBooks/TableBooks";
import TablePersons from "./components/TablePersons/TablePersons";

import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <TablePersons />
      <FormAdd />
      <TableBooks />
    </DataProvider>
  );
}

export default App;
