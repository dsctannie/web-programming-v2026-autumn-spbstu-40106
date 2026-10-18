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

export function groupByVisitedCount(travels) {
  const result = {};
  for (const travel of travels) {
    const key = travel.visitedCount;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(travel);
  }
  return result;
}

export function getAllCountries(travels) {
  const set = new Set();
  for (const travel of travels) {
    for (const country of travel.visitedCountries) {
      set.add(country);
    }
  }
  return Array.from(set);
}

export function filterByCountry(travels, country) {
  return travels.filter((travel) => travel.visitedCountries.includes(country));
}

export function groupTravelersByCountry(travels) {
  const result = {};
  for (const travel of travels) {
    for (const country of travel.visitedCountries) {
      if (!result[country]) {
        result[country] = [];
      }
      result[country].push(travel.travelerName);
    }
  }
  return result;
}

export function filterByMinCountries(travels, n) {
  return travels.filter((travel) => travel.visitedCount > n);
}
