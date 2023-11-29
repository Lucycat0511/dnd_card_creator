import { createContext, useEffect, useState } from "react";
import { getSpell, getSpellList } from "../api/dataAPI";
import {
  deleteCollectionData,
  getCollectionData,
  getCollections,
  updateCollectionData,
  updateCollectionName,
  writeCollectionData,
} from "../api/firebaseAPI";

export const CollectionContext = createContext("");

export default function CollectionProvider({ children }) {
  const [spellList, setSpellList] = useState([]);

  const [collections, setCollections] = useState({});

  const [submission, setSubmission] = useState("");
  const [query, setQuery] = useState({ name: "", list: [] });

  const [editable, setEditableName] = useState(false);

  useEffect(() => {
    //set initial collection data
    if (!collections.current && !collections.array) {
      getCollections().then((data) => {
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
            updateCollectionData(prev.current.key, [
              ...prev.current.data,
              data,
            ]);
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

  function changeName() {
    updateCollectionName(collections.current.key, collections.current.name);
    //repopulate the array
    getCollections().then((data) => {
      setCollections((prev) => {
        return { current: prev.current, array: data };
      });
    });
  }

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
      console.log(prev.current.key);
      updateCollectionData(prev.current.key, filteredSpellList);
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

  function deleteCollection(key) {
    deleteCollectionData(key).then(() => {
      getCollections().then((data) => {
        setCollections((prev) => {
          return { current: data[0], array: data };
        });
      });
    });
  }

  function newCollection() {
    //write collection with name 'untitled'
    // with empty array
    writeCollectionData([], "untitled").then((key) => {
      //then set new array
      getCollections().then((data) => {
        const new_collection = data.filter((item, index, array) => {
          return item.key == key && item;
        });
        setCollections((prev) => {
          return { current: new_collection[0], array: data };
        });
      });
    });
  }

  function setCurrentCollection(key) {
    getCollectionData(key).then((info) => {
      setCollections((prev) => {
        return {
          current: { key: key, name: info.name, data: info.data },
          array: prev.array,
        };
      });
    });
  }
  return (
    <CollectionContext.Provider
      value={{
        collections,
        setCurrentCollection,
        setSubmission,
        handleDelete,
        spellList,
        query,
        setQuery,
        handleCurrentNameChange,
        editable,
        setEditableName,
        changeName,
        newCollection,
        deleteCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}
