const axios = require("axios");
const config = require("../../config/server.config");
const API_BASE_URL = "https://api.predicthq.com/v1/events/";

const PredictHQRepository = {
  getBySearch: async (q, country = "FR", category = null) => {
    const params = {
      q,
      country,
    };
    if (category) params.category = category;
    return (
      await axios.get(API_BASE_URL, {
        validateStatus: () => true,
        params,
        headers: { Authorization: `Bearer ${config.apis.predictHq.apiKey}` },
      })
    ).data;
  },
  getById: async (id) =>
    (
      await axios.get(API_BASE_URL, {
        validateStatus: () => true,
        params: { id },
        headers: { Authorization: `Bearer ${config.apis.predictHq.apiKey}` },
      })
    ).data,
  getByLocation: async (lng, lat, page, radius, category) => {
    const params = {
      within: `${
        radius ? `${radius}km` : "2km"
      }@${lat.toString()},${lng.toString()}`,
      limit: 20,
    };
    if (page) params.page = page;
    if (category) params.category = category;
    return (
      await axios.get(API_BASE_URL, {
        validateStatus: () => true,
        params,
        headers: { Authorization: `Bearer ${config.apis.predictHq.apiKey}` },
      })
    ).data;
  },
  getCategories: () => [
    "academic",
    "conferences",
    "expos",
    "concerts",
    "festivals",
    "performing-arts",
    "sports",
    "community",
  ],
};

module.exports = PredictHQRepository;
