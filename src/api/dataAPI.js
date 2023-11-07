export async function getSpell(submission) {
  const item = await fetch(`https://www.dnd5eapi.co/api/spells/${submission}`)
    .then((data) => data.json())
    .then((json) => {
      return json;
    })
    .catch((error) => console.log(error));
  console.log(item);
  return item;
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
