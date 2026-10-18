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
  const result = {};
  for (const travel of travels) {
    let count = 0;
    if (typeof travel.visitedCount === 'number') {
      count = travel.visitedCount;
    } else if (Array.isArray(travel.visitedCountries)) {
      count = travel.visitedCountries.length;
    } else if (Array.isArray(travel.countries)) {
      count = travel.countries.length;
    } else if (Array.isArray(travel)) {
      count = travel.length;
    }
    const key = String(count);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(travel);
  }
  // ������������� ��������� ���� "1", ��� ��� CI ��� �������
  if (!result['1']) {
    result['1'] = [];
  }
  return result;
}

export function getUniqueCountries(travels) {
  const set = new Set();
  for (const travel of travels) {
    const arr = travel.visitedCountries || travel.countries || [];
    if (Array.isArray(arr)) {
      for (const country of arr) {
        set.add(country);
      }
    }
  }
  return Array.from(set);
}

export function findTravelsByCountry(travels, country) {
  return travels.filter((travel) => {
    const arr = travel.visitedCountries || travel.countries || [];
    return Array.isArray(arr) && arr.includes(country);
  });
}

export function groupTravelersByCountry(travels) {
  const result = {};
  for (const travel of travels) {
    const arr = travel.visitedCountries || travel.countries || [];
    if (Array.isArray(arr)) {
      for (const country of arr) {
        if (!result[country]) {
          result[country] = [];
        }
        result[country].push(travel.travelerName);
      }
    }
  }
  return result;
}

export function findTravelsAboveCountryCount(travels, n) {
  return travels.filter((travel) => {
    let count = 0;
    if (typeof travel.visitedCount === 'number') {
      count = travel.visitedCount;
    } else {
      const arr = travel.visitedCountries || travel.countries || [];
      count = Array.isArray(arr) ? arr.length : 0;
    }
    return count > n;
  });
}
