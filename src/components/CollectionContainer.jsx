import { useContext } from "react";
import CollectionMenu from "./CollectionMenu";
import SpellCardContainer from "./SpellCardContainer";
import SubmissionForm from "./SubmissionForm";
import { CollectionContext } from "../hooks/CollectionProvider";

export default function CollectionContainer() {
  const { collections, handleCurrentNameChange } =
    useContext(CollectionContext);
  return (
    <>
      {collections.current && (
        <input
          className="lg:text-2xl text-xl text-center"
          onChange={handleCurrentNameChange}
          value={collections.current.name}
        ></input>
      )}
      <div className="lg:hidden flex gap-8">
        <SubmissionForm />
        <CollectionMenu />
      </div>
      <SpellCardContainer />
    </>
  );
}
