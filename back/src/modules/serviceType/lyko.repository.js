const axios = require("axios");
const config = require("../../config/server.config");

const LyKoRepository = {
  queryToGeoloc: async (query) => {
    const result = await axios.get("https://api.lyko.tech/v2.1/addresses", {
      params: { text: query, limit: 10, locale: "fr" },
      headers: { "X-API-Key": config.apis.lyko.apiKey },
    });
    if (result.data[0]) return result.data[0].location;
    return null;
  },
};

module.exports = LyKoRepository;
