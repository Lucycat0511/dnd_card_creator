import { useContext } from "react";
import SpellCard from "./SpellCard";
import { CollectionContext } from "../hooks/CollectionProvider";

export default function SpellCardContainer() {
  const { collections, handleDelete } = useContext(CollectionContext);

  return (
    <div
      id="print-content"
      className={`grid grid-cols-1 print:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4
    print:gap-0`}
    >
      {collections.current &&
        typeof collections.current.data[0] !== typeof "" &&
        collections.current.data.map((spell, index) => {
          return (
            <SpellCard
              key={index}
              data={spell}
              handleDelete={() => {
                handleDelete(index);
              }}
            />
          );
        })}
    </div>
  );
}
