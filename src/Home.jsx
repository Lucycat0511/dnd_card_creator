import { useEffect, useState } from "react";
import getSpell from "./api/dataAPI";
import SpellCard from "./components/SpellCard";
import _ from "lodash";

export default function Home() {
  const [spellData, setSpellData] = useState([]);
  const [submission, setSubmission] = useState("");
  useEffect(() => {
    if (submission != "") {
      getSpell(submission).then((data) => {
        setSpellData((prev) => {
          return [...prev, data];
        });
        setSubmission("");
      });
    }
  }, [submission]);
  return (
    <div className="flex flex-col gap-8">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          let kebab_spell = _.kebabCase(e.target.spell_name.value);
          setSubmission(kebab_spell);
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="spell_name">Spell Name</label>
          <input
            id="spell_name"
            className="input-bordered border p-1 rounded-md"
            placeholder="acid-arrow"
          ></input>
        </div>
        <button className="btn-accent px-4 py-2 rounded-md h-fit self-end">
          Add
        </button>
      </form>
      <div className="grid grid-cols-3 grid-flow-row gap-4">
        {spellData.map((spell, index) => {
          return <SpellCard key={spell.name} data={spell} />;
        })}
      </div>
    </div>
  );
}
