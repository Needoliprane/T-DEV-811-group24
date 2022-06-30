const PredictHQRepository = require("./predictHQ.repository.js");
const LyKoRepository = require("../serviceType/lyko.repository");

const EventService = {
  getBySearch: async (query) => {
    const { q, id, country = "FR", category = null } = query;
    let result;
    try {
      if (id) result = await PredictHQRepository.getById(id);
      else result = await PredictHQRepository.getBySearch(q, country, category);
      return result;
    } catch (err) {
      return err;
    }
    return {
      count: result.count,
      events: result.results.map((e) => {
        return {
          id: e.id,
          title: e.title,
          description: e.description,
          labels: e.labels,
          location: e.location,
          venue_name: e.entities.length ? e.entities[0].name : null,
          address: e.entities.length ? e.entities[0].formatted_address : null,
          country: e.country,
          start: e.start,
          end: e.end,
          timezone: e.timezone,
        };
      }),
    };
  },
  getByLocation: async ({ location }, query) => {
    const { page = null, radius = 10, category = null } = query;
    const geoCoordinates = await LyKoRepository.queryToGeoloc(location);
    if (!geoCoordinates) return { results: [] };
    let results = await PredictHQRepository.getByLocation(
      geoCoordinates.lng,
      geoCoordinates.lat,
      page,
      radius,
      category
    );
    return {
      count: results.count,
      events: results.results.map((e) => {
        return {
          id: e.id,
          title: e.title,
          description: e.description,
          labels: e.labels,
          location: e.location,
          venue_name: e.entities.length ? e.entities[0].name : null,
          address: e.entities.length ? e.entities[0].formatted_address : null,
          country: e.country,
          start: e.start,
          end: e.end,
          timezone: e.timezone,
        };
      }),
    };
  },
  getCategories: () => ({ categories: PredictHQRepository.getCategories() }),
};

module.exports = EventService;
