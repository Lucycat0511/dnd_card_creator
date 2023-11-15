export async function getSpell(submission) {
  const item = await fetch(`https://www.dnd5eapi.co/api/spells/${submission}`)
    .then((data) => data.json())
    .then((json) => {
      return json;
    })
    .catch((error) => console.log(error));
  return item;
}

export async function getSpells(array) {
  const spells = await Promise.all(
    array.map(async (spell) => {
      const item = await getSpell(spell);
      return item;
    })
  );

  return spells;
}

export async function getSpellList() {
  const list = await fetch("https://www.dnd5eapi.co/api/spells")
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
  return list.results;
}
