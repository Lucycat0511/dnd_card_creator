import { useEffect, useState, createContext } from "react";
import { getSpellList, getSpell } from "../api/dataAPI";

export const SpellCardContext = createContext("");

export default function SpellCardProvider({ children }) {
  const [spellData, setSpellData] = useState([]);
  const [submission, setSubmission] = useState("");
  const [spellList, setSpellList] = useState([]);
  const [query, setQuery] = useState({ name: "", list: [] });

  useEffect(() => {
    if (spellList.length === 0) {
      getSpellList().then((data) => {
        setSpellList(data);
      });
    }

    if (submission != "") {
      getSpell(submission).then((data) => {
        setSpellData((prev) => {
          return [...prev, data];
        });
        setSubmission("");
      });
    }
  }, [submission]);

  function handleDelete(target) {
    let filteredSpellList = spellData.filter((spell, index) => {
      if (index !== target) {
        return spell;
      }
    });
    setSpellData(filteredSpellList);
  }

  return (
    <div>
      <SpellCardContext.Provider
        value={{
          spellData,
          setSpellData,
          setSubmission,
          handleDelete,
          spellList,
          query,
          setQuery,
        }}
      >
        {children}
      </SpellCardContext.Provider>
    </div>
  );
}
