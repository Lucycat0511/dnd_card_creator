import { createContext, useEffect, useState } from "react";
import { getSpell, getSpellList } from "../api/dataAPI";

export const CollectionContext = createContext("");

export default function CollectionProvider({ children }) {
  const [spellList, setSpellList] = useState([]);

  const [collections, setCollections] = useState({
    current: { key: 0, name: "collection 1", data: [] },
    array: [
      { key: 0, name: "collection 1", data: [] },
      { key: 1, name: "collection 2", data: [] },
    ],
  });

  const [submission, setSubmission] = useState("");
  const [query, setQuery] = useState({ name: "", list: [] });

  useEffect(() => {
    if (spellList.length === 0) {
      //filling the spelllist from API
      getSpellList().then((data) => {
        setSpellList(data);
      });
    }

    if (submission != "") {
      //adding a spell to collection and updating current collection
      //and it's position in the collection array
      getSpell(submission).then((data) => {
        setCollections((prev) => {
          return {
            current: {
              key: prev.current.key,
              name: prev.current.name,
              data: [...prev.current.data, data],
            },
            array: prev.array.filter((spellData, index, array) => {
              if (spellData.key != prev.current.key) return spellData;
              return {
                key: prev.current.key,
                name: prev.current.name,
                data: [...prev.current.data, data],
              };
            }),
          };
        });
        setSubmission("");
      });
    }
  }, [submission]);

  function handleDelete(target) {
    let filteredSpellList = collections.current.data.filter((spell, index) => {
      if (index !== target) {
        return spell;
      }
    });
    setCollections((prev) => {
      return {
        current: {
          key: prev.current.key,
          name: prev.current.name,
          data: filteredSpellList,
        },
        array: prev.array.filter((spellData, index, array) => {
          if (spellData.key != prev.current.key) return spellData;
          return {
            key: prev.current.key,
            name: prev.current.name,
            data: filteredSpellList,
          };
        }),
      };
    });
  }

  function addCollection() {
    //assign proper key
    //prompt for name
    //handle name perameters
    //
    const collection = { key: 0, name: "", data: [] };

    setCollections((prev) => {
      return { current: collection, array: [...prev.array, collection] };
    });
  }
  function setCurrentCollection(index) {
    setCollections((prev) => {
      return { current: prev.collections.array[index], array: [...prev.array] };
    });
  }
  return (
    <CollectionContext.Provider
      value={{
        collections,
        setCurrentCollection,
        addCollection,
        setSubmission,
        handleDelete,
        spellList,
        query,
        setQuery,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}
