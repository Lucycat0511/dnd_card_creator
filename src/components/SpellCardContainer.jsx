import { useContext } from "react";
import { SpellCardContext } from "../hooks/SpellCardProvider";
import SpellCard from "./SpellCard";

export default function SpellCardContainer() {
  const { spellData, handleDelete } = useContext(SpellCardContext);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
      {spellData.map((spell, index) => {
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
