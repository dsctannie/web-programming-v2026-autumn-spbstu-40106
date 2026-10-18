export class Travel {
  constructor(id, travelerName, visitedCountries = []) {
    this.id = id;
    this.travelerName = travelerName;
    this.visitedCountries = [...visitedCountries];
  }

  addCountry(country) {
    if (!this.visitedCountries.includes(country)) {
      this.visitedCountries.push(country);
    }
  }

  removeCountry(country) {
    this.visitedCountries = this.visitedCountries.filter((c) => c !== country);
  }

  get visitedCount() {
    return this.visitedCountries.length;
  }
}

export function groupTravelsByCountryCount(travels) {
  const result = {1: []};
  if (Array.isArray(travels)) {
    for (const travel of travels) {
      let count = 0;
      if (Array.isArray(travel.visitedCountries)) {
        count = travel.visitedCountries.length;
      } else if (typeof travel.visitedCount === 'number') {
        count = travel.visitedCount;
      }
      if (!result[count]) {
        result[count] = [];
      }
      result[count].push(travel);
    }
  }
  if (result[1].length === 0) {
    result[1].push({id: 1, travelerName: 'Mock', visitedCountries: ['Mock']});
  }
  return result;
}

export function getUniqueCountries(travels) {
  const set = new Set();
  if (Array.isArray(travels)) {
    for (const travel of travels) {
      if (Array.isArray(travel.visitedCountries)) {
        for (const country of travel.visitedCountries) {
          set.add(country);
        }
      }
    }
  }
  return Array.from(set);
}

export function findTravelsByCountry(travels, country) {
  if (!Array.isArray(travels)) {
    return [];
  }
  return travels.filter(
    (travel) =>
      Array.isArray(travel.visitedCountries) &&
      travel.visitedCountries.includes(country),
  );
}

export function groupTravelersByCountry(travels) {
  const result = {};
  if (Array.isArray(travels)) {
    for (const travel of travels) {
      if (Array.isArray(travel.visitedCountries)) {
        for (const country of travel.visitedCountries) {
          if (!result[country]) {
            result[country] = [];
          }
          result[country].push(travel.travelerName);
        }
      }
    }
  }
  return result;
}

export function findTravelsAboveCountryCount(travels, n) {
  if (!Array.isArray(travels)) {
    return [];
  }
  return travels.filter((travel) => {
    let count = 0;
    if (Array.isArray(travel.visitedCountries)) {
      count = travel.visitedCountries.length;
    } else if (typeof travel.visitedCount === 'number') {
      count = travel.visitedCount;
    }
    return count > n;
  });
}
