//voucher listing

let filters;
const voucherListingUrl = 'https://bbq-crm-api.specbee.in/api/v1/search/vouchers?size=5';
let pageSize;
let filterObject = {};
let totalElements;
let pageNumber;
let currentPageLength;
let filterMinPriceSlider;
let filterMaxPriceSlider;
let filterSelectedMinPrice;
let filterSelectedMaxPrice;

function getCurrencyCode(currency) {
  if (currency === 'INR') {
    return '&#8377;'
  }
  return '&#8377;'
}

function enableFilterClearAllButton() {
  $('#clear-all-voucher-filters').show();
}

function disableFilterClearAllButton() {
  $('#clear-all-voucher-filters').hide();
}

function buildMultiOrSingleMatchQuery(ids, key) {
  filterObject.page = 0;
  const singleKey = `${key}.equals`;
  const multiKey = `${key}.in`;
  if (ids) {
    if (key === 'countryId' && ids === 3 && filterObject[singleKey]) {
      delete filterObject[singleKey];
    } else if (key === 'countryId') {
      filterObject[singleKey] = ids;
    } else if (filterObject[singleKey] === ids) {
      delete filterObject[singleKey];
    } else if (filterObject[multiKey] && filterObject[multiKey].includes(ids)) {
      const index = filterObject[multiKey].indexOf(ids);
      if (index > -1) {
        filterObject[multiKey].splice(index, 1);
      }
      if (filterObject[multiKey].length === 1) {
        const value = filterObject[multiKey][0];
        delete filterObject[multiKey];
        filterObject[singleKey] = value;
      }
    } else if (filterObject[singleKey]) {
      delete Object.assign(filterObject, {
        [multiKey]: filterObject[singleKey]
      })[singleKey];
      filterObject[multiKey] = [filterObject[multiKey]];
      filterObject[multiKey].push(ids);
    } else if (filterObject[multiKey]) {
      filterObject[multiKey].push(ids);
    } else if (!Array.isArray(ids)) {
      filterObject[singleKey] = ids;
    } else if (ids.length > 1) {
      filterObject[multiKey].push(ids.join());
    } else {
      filterObject[singleKey] = ids.join();
    }
  }
}

function buildPriceQuery(minPrice, maxPrice) {
  filterObject.page = 0;
  if (minPrice) {
    filterObject['price.greaterThanOrEqual'] = minPrice;
  }
  if (maxPrice) {
    filterObject['price.lessThanOrEqual'] = maxPrice;
  }
}

function buildIdQuery(countries, cities, branches) {
  buildMultiOrSingleMatchQuery(countries, 'countryId');
  buildMultiOrSingleMatchQuery(cities, 'cityId');
  buildMultiOrSingleMatchQuery(branches, 'branchId');
}

function buildAdditionFilterQuery(treatTypes, foodClassifications, dayOfWeeks, voucherTypes) {
  buildMultiOrSingleMatchQuery(treatTypes, 'treatType');
  buildMultiOrSingleMatchQuery(foodClassifications, 'foodClassification');
  buildMultiOrSingleMatchQuery(dayOfWeeks, 'weekDays');
  buildMultiOrSingleMatchQuery(voucherTypes, 'voucherType');
}

function getCountryFilterList() {
  let countryOptions = '';
  countryOptions += '<option value="3">Select a country</option>';
  filters.countries.forEach((country) => {
    if (filterObject['countryId.equals'] && filterObject['countryId.equals'] === country.country_id) {
      countryOptions += `<option value=${country.country_id} selected>${country.country_name}</option>`;
    } else {
      countryOptions += `<option value=${country.country_id}>${country.country_name}</option>`;
    }
  });
  return countryOptions;
}

function getCityHtml() {
  `<div class="form-item__checkbox">
     <input id="city-${city.city_id}" type="checkbox" name="city" value="${city.city_id}" checked>
     <label for="city-${city.city_id}">${city.city_name}</label>
  </div>`
}

function getCityFilterList() {
  let cityList = '';
  filters.cities.forEach((city) => {
    if ((filterObject['cityId.in'] && filterObject['cityId.in'].includes(city.city_id)) || (filterObject['cityId.equals'] && filterObject['cityId.equals'] === city.city_id)) {
      cityList += `<div class="form-item__checkbox">
                     <input id="city-${city.city_id}" type="checkbox" name="city" value="${city.city_id}" checked>
                     <label for="city-${city.city_id}">${city.city_name}</label>
                  </div>`;
    } else {
      cityList += `<div class="form-item__checkbox">
                     <input id="city-${city.city_id}" type="checkbox" name="city" value="${city.city_id}">
                     <label for="city-${city.city_id}">${city.city_name}</label>
                  </div>`;
    }
  });
  return cityList;
}

function getBranchFilterList() {
  let branchList = '';
  filters.branches.forEach((branch) => {
    if ((filterObject['branchId.in'] && filterObject['branchId.in'].includes(branch.branch_id)) || (filterObject['branchId.equals'] && filterObject['branchId.equals'] === branch.branch_id)) {
      branchList += `<div class="form-item__checkbox">
                        <input id="branch-${branch.branch_id}" type="checkbox" name="branch" value="${branch.branch_id}" checked>
                        <label for="branch-${branch.branch_id}">${branch.branch_name}</label>
                    </div>`;
    } else {
      branchList += `<div class="form-item__checkbox">
                        <input id="branch-${branch.branch_id}" type="checkbox" name="branch" value="${branch.branch_id}">
                        <label for="branch-${branch.branch_id}">${branch.branch_name}</label>
                    </div>`;
    }
  });
  return branchList;
}

function getAdditionFilterList(additionFilters, type) {
  let additionFilterList = '';
  additionFilters.forEach((filter) => {
    if ((filterObject[`${type}.in`] && filterObject[`${type}.in`].includes(filter)) || (filterObject[`${type}.equals`] && filterObject[`${type}.equals`] === filter)) {
      additionFilterList += `<div class="form-item__checkbox">
                                <input id="${type}-${filter}" type="checkbox" name=${type} value="${filter}" checked>
                                <label for="${type}-${filter}">${filter}</label>
                             </div>`;
    } else {
      additionFilterList += `<div class="form-item__checkbox">
                                <input id="${type}-${filter}" type="checkbox" name=${type} value="${filter}">
                                <label for="${type}-${filter}">${filter}</label>
                             </div>`;
    }
  });
  return additionFilterList;
}

function getWeekDayList() {
  let weekDayList = '';
  filters.dayOfWeeks.forEach((dayOfWeek) => {
    if ((filterObject['weekDays.in'] && filterObject['weekDays.in'].includes(dayOfWeek)) || (filterObject['weekDays.equals'] && filterObject['weekDays.equals'] === dayOfWeek)) {
      weekDayList += `<div class="form-item__checkbox">
                        <input id="${dayOfWeek}" type="checkbox" name="dayOfWeek" value="${dayOfWeek}" checked>
                        <label for="${dayOfWeek}">${dayOfWeek}</label>
                      </div>`
    } else {
      weekDayList += `<div class="form-item__checkbox">
                        <input id="${dayOfWeek}" type="checkbox" name="dayOfWeek" value="${dayOfWeek}">
                        <label for="${dayOfWeek}">${dayOfWeek}</label>
                      </div>`
    }
  });
  return weekDayList;
}

function buildVoucherCard(voucher) {
  return `<article id="${voucher.voucher_id}" class="card card--voucher">
            <div class="card__media">
                <img src="${voucher.voucher_banner}" alt="Voucher">
            </div>
            <div class="card__header">
                <div class="unit">${voucher.voucher_name}</div>
                <div class="price">${getCurrencyCode(voucher.currency_code)}${voucher.price}</div>
            </div>
            <div class="card__footer">
              <div class="atc">
                <a href="#" class="button button--atc">Add to Cart</a>
                <div class="card__footer__form-wrap">
                  <form class="form form--atc">
                      <div class="value-button" class="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                      <input type="text" class="number" value="0" readonly/>
                      <div class="value-button" class="increase" onclick="increaseValue()" value="Increase Value">+</div>
                  </form>
                </div>
              </div>
              <div class="info">
                <a href="#" class="open-dialog">More info</a>
              </div>
            </div>
           </article>`;
}

function disableOrEnablePrice() {
  if (filterMinPriceSlider === filterMaxPriceSlider) {
    $('#price-filter').hide();
  } else {
    const priceElement = $('#price-filter');
    if (priceElement.is(':hidden')) {
      priceElement.show();
    }
  }
}

function convertFilterObjectArrayValues() {
  const requestFilterObject = {};
  if (filterObject['price.greaterThanOrEqual']) {
    requestFilterObject['price.greaterThanOrEqual'] = filterObject['price.greaterThanOrEqual'];
  }
  if (filterObject['price.lessThanOrEqual']) {
    requestFilterObject['price.lessThanOrEqual'] = filterObject['price.lessThanOrEqual'];
  }
  if (filterObject.sort) {
    requestFilterObject.sort = filterObject.sort;
  }
  if (filterObject.size) {
    requestFilterObject.size = filterObject.size;
  }
  if (filterObject.page) {
    requestFilterObject.page = filterObject.page;
  }
  if (filterObject['countryId.in']) {
    requestFilterObject['countryId.in'] = filterObject['countryId.in'].join();
  }
  if (filterObject['countryId.equals']) {
    requestFilterObject['countryId.equals'] = filterObject['countryId.equals'];
  }
  if (filterObject['cityId.in']) {
    requestFilterObject['cityId.in'] = filterObject['cityId.in'].join();
  }
  if (filterObject['cityId.equals']) {
    requestFilterObject['cityId.equals'] = filterObject['cityId.equals'];
  }
  if (filterObject['branchId.in']) {
    requestFilterObject['branchId.in'] = filterObject['branchId.in'].join();
  }
  if (filterObject['branchId.equals']) {
    requestFilterObject['branchId.equals'] = filterObject['branchId.equals'];
  }
  if (filterObject['treatType.in']) {
    requestFilterObject['treatType.in'] = filterObject['treatType.in'].join();
  }
  if (filterObject['treatType.equals']) {
    requestFilterObject['treatType.equals'] = filterObject['treatType.equals'];
  }
  if (filterObject['foodClassification.in']) {
    requestFilterObject['foodClassification.in'] = filterObject['foodClassification.in'].join();
  }
  if (filterObject['foodClassification.equals']) {
    requestFilterObject['foodClassification.equals'] = filterObject['foodClassification.equals'];
  }
  if (filterObject['weekDays.in']) {
    requestFilterObject['weekDays.in'] = filterObject['weekDays.in'].join();
  }
  if (filterObject['weekDays.equals']) {
    requestFilterObject['weekDays.equals'] = filterObject['weekDays.equals'];
  }
  if (filterObject['voucherType.in']) {
    requestFilterObject['voucherType.in'] = filterObject['voucherType.in'].join();
  }
  if (filterObject['voucherType.equals']) {
    requestFilterObject['voucherType.equals'] = filterObject['voucherType.equals'];
  }
  return requestFilterObject;
}

function emptyVoucherListing() {
  $('#voucher-list').empty();
}

function disableLoadMore() {
  $('#filter-load-more').hide();
}

function enableLoadMore() {
  $('#filter-load-more').show();
}

function mergeFilters(newFilters) {
  const newMinPrice = newFilters.minPrice;
  const newMaxPrice = newFilters.maxPrice;
  if (newMinPrice < filters.minPrice) {
    filters.minPrice = newMinPrice;
  }
  if (newMaxPrice > filters.maxPrice) {
    filters.maxPrice = newMaxPrice;
  }
  if (filters.countries && newFilters.countries) {
    const countryIds = new Set(filters.countries.map((country) => country.country_id));
    filters.countries = [...filters.countries,
      ...newFilters.countries.filter((country) => !countryIds.has(country.country_id))
    ];
    filters.countries.sort((a, b) => a.country_name.localeCompare(b.country_name));
  }
  if (filters.cities && newFilters.cities) {
    const cityIds = new Set(filters.cities.map((city) => city.city_id));
    filters.cities = [...filters.cities,
      ...newFilters.cities.filter((city) => !cityIds.has(city.city_id))
    ];
    filters.cities.sort((a, b) => a.city_name.localeCompare(b.city_name));
  }
  if (filters.branches && newFilters.branches) {
    const branchIds = new Set(filters.branches.map((branch) => branch.branch_id));
    filters.branches = [...filters.branches,
      ...newFilters.branches.filter((branch) => !branchIds.has(branch.branch_id))
    ];
    filters.branches.sort((a, b) => a.branch_name.localeCompare(b.branch_name));
  }
  if (filters.voucherTypes && newFilters.voucherTypes) {
    filters.voucherTypes = [...new Set([...filters.voucherTypes, ...newFilters.voucherTypes])];
    filters.voucherTypes.sort();
  }
  if (filters.foodClassifications && newFilters.foodClassifications) {
    filters.foodClassifications = [...new Set([...filters.foodClassifications,
      ...newFilters.foodClassifications
    ])];
    filters.foodClassifications.sort();
  }
  if (filters.treatTypes && newFilters.treatTypes) {
    filters.treatTypes = [...new Set([...filters.treatTypes, ...newFilters.treatTypes])];
    filters.treatTypes.sort();
  }
  if (filters.dayOfWeeks && newFilters.dayOfWeeks) {
    filters.dayOfWeeks = [...new Set([...filters.dayOfWeeks, ...newFilters.dayOfWeeks])];
  }
}

function buildFilter(filterData, updateStatus) {
  if (updateStatus) {
    mergeFilters(filterData);
  } else {
    filters = new VoucherFilter(filterData);
  }
  if (!filterMinPriceSlider) {
    filterMinPriceSlider = filters.minPrice;
  }
  if (!filterMaxPriceSlider) {
    filterMaxPriceSlider = filters.maxPrice;
  }
  if (!filterSelectedMinPrice) {
    filterSelectedMinPrice = filters.minPrice;
  }
  if (!filterSelectedMaxPrice) {
    filterSelectedMaxPrice = filters.maxPrice;
  }
  const minPrice = $('#amount-min');
  const maxPrice = $('#amount-max');
  $('#price-range').slider({
    range: true,
    min: filterMinPriceSlider,
    max: filterMaxPriceSlider,
    values: [filterSelectedMinPrice, filterSelectedMaxPrice],
    slide(event, ui) {
      minPrice.val(ui.values[0]);
      maxPrice.val(ui.values[1]);
    },
    stop(event, ui) {
      filterSelectedMinPrice = ui.values[0];
      filterSelectedMaxPrice = ui.values[1];
      buildPriceQuery(filterSelectedMinPrice, filterSelectedMaxPrice);
      getVoucherListingPage();
    },
  });
  minPrice.val(filterSelectedMinPrice);
  maxPrice.val(filterSelectedMaxPrice);
  disableOrEnablePrice();
  $('#country-filter-dropdown').html(getCountryFilterList());
  $('#city-filter-select').html(getCityFilterList());
  $('#branch-filter-select').html(getBranchFilterList());
  $('#treat-type-select').html(getAdditionFilterList(filters.treatTypes, 'treatType'));
  $('#food-classification-select').html(getAdditionFilterList(filters.foodClassifications, 'foodClassification'));
  $('#day-of-the-week-select').html(getWeekDayList());
  $('#voucher-type-select').html(getAdditionFilterList(filters.voucherTypes, 'voucherType'));
}

function buildVoucherListing(voucherData, updateStatus) {
  const voucherList = $('#voucher-list');
  if (!updateStatus) {
    voucherList.empty();
  }
  voucherData.forEach((voucher) => {
    voucherList.append(buildVoucherCard(voucher));
  });
}

$(document).on('click', '.open-dialog', () => {
  $('#dialog').load('voucher_info.html', function () {
    $('#dialog .close').click(function (e) {
      $('#dialog').children().remove();
      e.preventDefault();
    });
  });
});

function getVoucherListingPage(updateStatus = false) {
  $.ajax({
    dataType: 'json',
    url: voucherListingUrl,
    data: convertFilterObjectArrayValues(),
    headers: {
      'BBQ-Search-Key': 'fca2cd09af45d7872342a882f035a6e3',
    },
    success(vouchers) {
      totalElements = vouchers.total_elements;
      pageNumber = vouchers.page_number;
      pageSize = vouchers.page_size;
      currentPageLength = vouchers.content.length;
      if (pageSize * (pageNumber + 1) < totalElements) {
        enableLoadMore();
      } else {
        disableLoadMore();
      }
      if (currentPageLength !== 0) {
        if (filterObject && Object.keys(filterObject).length !== 0) {
          enableFilterClearAllButton();
        }
        buildFilter(vouchers.filters, updateStatus);
        buildVoucherListing(vouchers.content, updateStatus);
      } else {
        emptyVoucherListing();
        $('#price-filter').hide();
        $('#country-filter-dropdown').empty();
        $('#city-filter-select').empty();
        $('#branch-filter-select').empty();
        $('#treat-type-select').empty();
        $('#food-classification-select').empty();
        $('#day-of-the-week-select').empty();
        $('#voucher-type-select').empty();
      }
    },
  });
}

$(() => {
  buildIdQuery(1);
  getVoucherListingPage();
});

$('#clear-all-voucher-filters').click(() => {
  filterObject = {};
  getVoucherListingPage();
  filterSelectedMinPrice = null;
  filterSelectedMaxPrice = null;
  disableFilterClearAllButton();
});

$('#country-filter-dropdown').change(() => {
  const countryOptionId = parseInt($('#country-filter-dropdown option:selected').val(), 10);
  buildIdQuery(countryOptionId);
  getVoucherListingPage();
});

$('#city-filter-select').change((e) => {
  buildIdQuery(null, parseInt($(`#${e.target.id}`).val(), 10));
  getVoucherListingPage();
});

$('#branch-filter-select').change((e) => {
  buildIdQuery(null, null, parseInt($(`#${e.target.id}`).val(), 10));
  getVoucherListingPage();
});

$('#treat-type-select').change((e) => {
  buildAdditionFilterQuery($(`#${e.target.id}`).val());
  getVoucherListingPage();
});

$('#food-classification-select').change((e) => {
  buildAdditionFilterQuery(null, $(`#${e.target.id}`).val());
  getVoucherListingPage();
});

$('#day-of-the-week-select').change((e) => {
  buildAdditionFilterQuery(null, null, $(`#${e.target.id}`).val());
  getVoucherListingPage();
});

$('#voucher-type-select').change((e) => {
  buildAdditionFilterQuery(null, null, null, $(`#${e.target.id}`).val());
  getVoucherListingPage();
});

$('#amount-min').focusout((e) => {
  const value = parseInt(e.target.value, 10);
  if (value !== filterSelectedMinPrice) {
    filterSelectedMinPrice = value;
    buildPriceQuery(filterSelectedMinPrice, filterSelectedMaxPrice);
    getVoucherListingPage();
  }
});

$('#amount-max').focusout((e) => {
  const value = parseInt(e.target.value, 10);
  if (value !== filterSelectedMaxPrice) {
    filterSelectedMaxPrice = value;
    buildPriceQuery(filterSelectedMinPrice, filterSelectedMaxPrice);
    getVoucherListingPage();
  }
});

$('#voucher-filter-sort-dropdown').change(() => {
  const sort = parseInt($('#voucher-filter-sort-dropdown option:selected').val(), 10);
  if (sort === 0) {
    if (filterObject.page) {
      filterObject.page = null;
    }
    filterObject.sort = 'price';
    getVoucherListingPage();
  } else if (sort === 1) {
    if (filterObject.page) {
      filterObject.page = null;
    }
    filterObject.sort = 'price,desc';
    getVoucherListingPage();
  }
});

$('#filter-load-more-button').click(() => {
  filterObject.page = pageNumber + 1;
  getVoucherListingPage(true);
});

class VoucherFilter {
  constructor(filter) {
    this.countries = filter.countries;
    this.cities = filter.cities;
    this.branches = filter.branches;
    this.voucherTypes = filter.voucher_types;
    this.foodClassifications = filter.food_classifications;
    this.treatTypes = filter.treat_types;
    this.dayOfWeeks = filter.day_of_weeks;
    this.minPrice = filter.min_price;
    this.maxPrice = filter.max_price;
  }
}
