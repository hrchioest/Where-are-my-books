import CategoriesForm from "../../components/CategoriesForm/CategoriesForm";
import CategoriesTable from "../../components/CategoriesTable/CategoriesTable";

const ContentCategories = () => {
  return (
    <div className='book' style={{ display: "flex", flexDirection: "row" }}>
      <CategoriesTable />
      <CategoriesForm />
    </div>
  );
};

export default ContentCategories;
