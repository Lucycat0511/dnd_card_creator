async function getSpell() {
  const data = await fetch("https://www.dnd5eapi.co/api/spells/acid-arrow");
  const item = await data.json();
  return item;
}

export default getSpell;
