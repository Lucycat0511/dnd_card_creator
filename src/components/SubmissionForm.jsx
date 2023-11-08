import _ from "lodash";
import { useContext } from "react";
import { SpellCardContext } from "../hooks/SpellCardProvider";

export default function SubmissionForm() {
  const { setSubmission, spellList, query, setQuery } =
    useContext(SpellCardContext);

  function handleChange(e) {
    const value = e.target.value;
    const results = spellList.filter((spell) => {
      if (value === "") return "";
      return spell.name.toLowerCase().includes(value.toLowerCase());
    });
    setQuery({ name: value, list: results });
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
      <div className="flex flex-col gap-2">
        <input
          type="search"
          id="spell_name"
          className="input input-bordered border rounded-md w-full"
          placeholder="Spell Name"
          value={query.name}
          onChange={handleChange}
        ></input>
        <div className="h-56 overflow-clip border rounded-md">
          <div className="menu">
            {query.list.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    let kebab_spell = _.kebabCase(item.name);
                    setSubmission(kebab_spell);
                  }}
                >
                  <span>{item.name}</span>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
}
