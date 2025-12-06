const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "HDEV-21ef84b2-7268-4ea5-8a29-9d133055722a";

app.get("/api/valorant/:names/:tag", async (req, res) => {
  const { names, tag } = req.params;

  try {
    const url = `https://api.henrikdev.xyz/valorant/v1/account/${names}/${tag}`;

    const apiRes = await fetch(url, {
      headers: { Authorization: API_KEY },
    });

    const data = await apiRes.json();
    res.status(apiRes.status).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
// Route rang
app.get("/api/valorant/rank/:region/:name/:tag", async (req, res) => {
  const { region, name, tag } = req.params;

  const url = `https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}`;

  try {
    const apiRes = await fetch(url, {
      headers: { Authorization: API_KEY },
    });
    const fullData = await apiRes.json();

    // 🔹 Créer un objet simplifié
    if (fullData.status === 200 && fullData.data) {
      const player = fullData.data;
      const simplified = {
        status: fullData.status,
        data: {
          name: player.name,
          tag: player.tag,
          current_data: {
            currenttier: player.current_data.currenttier,
            currenttierpatched: player.current_data.currenttierpatched,
            ranking_in_tier: player.current_data.ranking_in_tier,
            images: {
              small: player.current_data.images.small
            }
          }
        }
      };

      // 🔹 Afficher dans la console
      console.log(JSON.stringify(simplified, null, 2));

      // 🔹 Renvoyer au front si besoin
      res.status(apiRes.status).json(simplified);
    } else {
      console.log("Erreur ou données manquantes :", fullData);
      res.status(apiRes.status).json(fullData);
    }

  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});
app.listen(3000, () => {
  console.log("Serveur lancé : http://localhost:3000");
});
