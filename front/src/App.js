import "./App.css";
import PersonForm from "./components/PersonForm/PersonForm";
import TablePersons from "./components/TablePersons/TablePersons";
import BooksTable from "./components/BooksTable/BooksTable";
import BooksForm from "./components/BookForm/BookForm";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <TablePersons />
      <PersonForm />
      <BooksTable />
      <BooksForm />
    </DataProvider>
  );
}

export default App;
