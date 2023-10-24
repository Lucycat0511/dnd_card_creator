import { useEffect, useState } from "react";
import getSpell from "./api/dataAPI";
import SpellCard from "./components/SpellCard";

export default function Home() {
  const [spellData, setSpellData] = useState({});
  useEffect(() => {
    getSpell().then((data) => {
      setSpellData(data);
    });
  }, []);
  return (
    <div>
      <SpellCard data={spellData} />
    </div>
  );
}
