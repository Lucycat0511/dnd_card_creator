import { createContext, useEffect, useState } from "react";
import { getSpell, getSpellList } from "../api/dataAPI";
import {
  getCollectionData,
  getCollections,
  writeCollectionData,
} from "../api/firebaseAPI";
import { collection } from "@firebase/firestore";

export const CollectionContext = createContext("");

export default function CollectionProvider({ children }) {
  const [spellList, setSpellList] = useState([]);

  const [collections, setCollections] = useState({});

  const [submission, setSubmission] = useState("");
  const [query, setQuery] = useState({ name: "", list: [] });

  useEffect(() => {
    //set initial collection data
    if (!collections.current && !collections.array) {
      getCollections().then((data) => {
        console.log(data);
        setCollections((prev) => {
          return { current: data[0], array: data };
        });
      });
    }

    //populate spellist
    if (spellList.length === 0) {
      //filling the spelllist from API
      getSpellList().then((data) => {
        setSpellList(data);
      });
    }

    //handle submission
    if (submission != "") {
      //New untitled collection with no other collections
      //if no current collection selected
      if (!collections.current) {
        getSpell(submission).then(async (data) => {
          //then create new collection with new key
          const newKey = await writeCollectionData([data.index], "untitled");
          //set current collection to that new collection

          setCollections((prev) => {
            const currentData = {
              key: newKey,
              name: "untitled",
              data: [data],
            };
            const newArray = prev.array
              ? [...prev.array, currentData]
              : [currentData];
            return {
              current: currentData,
              array: newArray,
            };
          });
        });
      }

      //New untitled collection with other collections

      //Update Collection

      //adding a spell to collection and updating current collection
      //and it's position in the collection array
      else {
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
                  data: [...prev.current.data, data.index],
                };
              }),
            };
          });

          //reset submission
          setSubmission("");
        });
      }
    }
  }, [submission, collections]);

  function handleCurrentNameChange(e) {
    const newName = e.target.value;
    setCollections((prev) => {
      return {
        current: { ...prev.current, name: newName },
        array: [...prev.array],
      };
    });
  }

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
    // const collection = { key: 0, name: "", data: [] };

    // setCollections((prev) => {
    //   return { current: collection, array: [...prev.array, collection] };
    // });
    writeCollectionData();
  }

  function setCurrentCollection(key) {
    getCollectionData(key);
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
        handleCurrentNameChange,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}
