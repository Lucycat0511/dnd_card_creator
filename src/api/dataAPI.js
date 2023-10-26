async function getSpell(submission) {
  const data = await fetch(`https://www.dnd5eapi.co/api/spells/${submission}`);
  const item = await data.json();
  console.log(item);
  return item;
}

export default getSpell;
