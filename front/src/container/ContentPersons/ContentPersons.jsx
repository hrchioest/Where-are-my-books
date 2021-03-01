import PersonsForm from "../../components/PersonsForm/PersonsForm";
import PersonsTable from "../../components/PersonsTable/PersonTable";

const ContentPersons = () => {
  return (
    <div className='book' style={{ display: "flex", flexDirection: "row" }}>
      <PersonsTable />
      <PersonsForm />
    </div>
  );
};

export default ContentPersons;
