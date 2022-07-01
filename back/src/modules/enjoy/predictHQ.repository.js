const axios = require("axios");
const config = require("../../config/server.config");
const API_BASE_URL = "https://api.predicthq.com/v1/events/";

// api docs: https://docs.predicthq.com/resources/events/#search-events

const PredictHQRepository = {
  getBySearch: async (q, country = "FR", category = null) => {
    const params = {
      q,
      country,
    };
    if (category) params.category = category;
    return (
      await axios.get(API_BASE_URL, {
        params,
        headers: { Authorization: `Bearer ${config.apis.predictHq.apiKey}` },
      })
    ).data;
  },
  getById: async (id) =>
    (
      await axios.get(API_BASE_URL, {
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
    if (page) params.offset = params.limit * (page - 1);
    if (category) params.category = category;
    else params.category = PredictHQRepository.getCategories().join(",");
    return (
      await axios.get(API_BASE_URL, {
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
