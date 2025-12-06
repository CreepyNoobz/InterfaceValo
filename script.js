const names = "KripyNoobz";
const tag = "Noobz";
const region = "eu";
async function getAccount() {
  const output = document.getElementById("output");

  try {
    const res = await fetch(`http://localhost:3000/api/valorant/${names}/${tag}`);
    const data = await res.json();

    if (!res.ok) {
      output.innerHTML = `<p style="color:red;">Erreur API : ${data.errors ? data.errors[0].message : "Erreur inconnue"}</p>`;
      return;
    }

    // Afficher les infos
    output.innerHTML = `
      <h2>${data.data.name} #${data.data.tag}</h2>
      <p>ID unique : ${data.data.puuid}</p>
      <p>Région : ${data.data.region}</p>
      <p>Compte créé : ${data.data.account_level}</p>
    `;

  } catch (err) {
    output.innerHTML = `<p style="color:red;">Erreur fetch : ${err}</p>`;
  }
}

async function getAccountRank() {
  const output = document.getElementById("outputRank");

  const res = await fetch(`http://localhost:3000/api/valorant/rank/${region}/${names}/${tag}`);
  const json = await res.json();

  const data = json.data;
  const rank = json.data.current_data;
  console.log("RR :", rank.ranking_in_tier);
  output.innerHTML = `
    <b>RR : ${rank.ranking_in_tier}</b>
    <img src="${rank.images.small}" alt="Rank icon">
  `;
}
getAccountRank();

