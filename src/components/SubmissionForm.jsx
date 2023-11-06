import _ from "lodash";
import { useContext, useState } from "react";
import { SpellCardContext } from "../hooks/SpellCardProvider";

export default function SubmissionForm() {
  const spellList = ["burning hands", "acid arrow", "ac", "bu", "bur"];
  const { setSubmission } = useContext(SpellCardContext);
  const [query, setQuery] = useState({ name: "", list: [] });
  function handleChange(e) {
    const value = e.target.value;
    const results = spellList.filter((spell) => {
      if (value === "") return "";
      return spell.toLowerCase().includes(value.toLowerCase());
    });
    setQuery({ query: value, list: results });
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        let kebab_spell = _.kebabCase(e.target.spell_name.value);
        setSubmission(kebab_spell);
      }}
    >
      <div className="flex gap-1">
        <input
          type="search"
          id="spell_name"
          className="input input-bordered border rounded-md"
          placeholder="Spell Name"
          value={query.name}
          onChange={handleChange}
        ></input>

        <button className="btn btn-secondary px-4 py-2 rounded-md h-fit self-end">
          Add
        </button>
      </div>
      <div>
        {query.list.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </div>
    </form>
  );
}
