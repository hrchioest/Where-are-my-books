import "./App.css";
import PersonsForm from "./components/PersonsForm/PersonsForm";
import PersonsTable from "./components/PersonsTable/PersonTable";
import BooksTable from "./components/BooksTable/BooksTable";
import BooksForm from "./components/BooksForm/BooksForm";
import CategoriesForm from "./components/CategoriesForm/CategoriesForm";
import CategoriesTable from "./components/CategoriesTable/CategoriesTable";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <PersonsTable />
      <PersonsForm />
      <BooksTable />
      <BooksForm />
      <CategoriesTable />
      <CategoriesForm />
    </DataProvider>
  );
}

export default App;
