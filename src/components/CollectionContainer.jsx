import { useContext } from "react";
import CollectionMenu from "./CollectionMenu";
import SpellCardContainer from "./SpellCardContainer";
import SubmissionForm from "./SubmissionForm";
import { CollectionContext } from "../hooks/CollectionProvider";

export default function CollectionContainer() {
  const {
    collections,
    handleCurrentNameChange,
    setEditableName,
    editable,
    changeName,
  } = useContext(CollectionContext);
  return (
    <>
      {collections.current && (
        <div>
          <div
            className={`tooltip tooltip-accent ${editable && "hidden"}`}
            data-tip="change name?"
          >
            <button
              className="w-fit btn btn-sm
            lg:text-2xl text-center"
              onClick={() => {
                setEditableName(!editable);
              }}
            >
              {collections.current.name}
            </button>
          </div>
          <form
            className={`flex gap-4 items-center ${!editable && "hidden"}`}
            onSubmit={(e) => {
              e.preventDefault();
              changeName();
              setEditableName(!editable);
            }}
          >
            <input
              id="collection_name"
              className={`input input-bordered lg:text-2xl`}
              min={1}
              onChange={handleCurrentNameChange}
              value={collections.current.name}
            ></input>
            <button className="btn btn-sm btn-accent w-fit">Save Name</button>
          </form>
        </div>
      )}
      <div className="lg:hidden flex gap-8">
        <SubmissionForm />
        <CollectionMenu />
      </div>
      <div id="print-content">
        <SpellCardContainer />
      </div>
    </>
  );
}
