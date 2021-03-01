import BooksTable from "../../components/BooksTable/BooksTable";
import BooksForm from "../../components/BooksForm/BooksForm";

const ContentBooks = () => {
  return (
    <div className='book' style={{ display: "flex", flexDirection: "row" }}>
      <BooksTable />
      <BooksForm />
    </div>
  );
};

export default ContentBooks;
