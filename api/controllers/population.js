'use strict';

var util = require('util');
var q = require('q');
var cheerio = require('cheerio');
var request = require('request');
var fipsDB = require('../helpers/fips_db.js');

module.exports = {
    population: population
};

var baseUrl = 'http://www.census.gov/quickfacts/table/PST045216';
fipsDB.load();

function population(req, res) {
    if (!fipsDB.isReady()) {
        res.json('fips db not ready');
        return;
    }

    var shortStateName = req.swagger.params.shortStateName.value || '';
    var fullCityName = req.swagger.params.fullCityName.value || '';

    if (!fullCityName || !shortStateName) {
        res.json('error: missing mandatory fields country or city name');
        return;
    }

    var cityCode = fipsDB.getCityCode(shortStateName, fullCityName);
    if (!cityCode) {
        console.error('error: city not found', shortStateName, fullCityName);
        res.json('error: city not found');
        return;
    }

    fetchCensusData(cityCode)
        .then(function (html) {
            var result = parseCensusData(html);
            res.json(result);
        }).fail(function (err) {
            res.json(err);
        });
}

function fetchCensusData(cityCode) {
    var deferred = q.defer();
    var url = util.format('%s/%s', baseUrl, cityCode);
    console.log("url =", url);
    request(url, null, function (error, res, html) {
        if (error || res.statusCode !== 200) {
            console.error(error);
            deferred.reject();
            return;
        }
        console.log('fetch success: ', html.length);
        deferred.resolve(html);
    });
    return deferred.promise;
}

function parseCensusData(html) {
    console.log('parseCensusData: ', html.length);
    var toRemove = ['                      \n            (b)',
        'i \n            ',
        '                      \n            (a)',
        'i\n              \n              ',
        '                       \n            (c)'];
    var $ = cheerio.load(html);

    var arr = [];
    $('td').each(function (j1, el) {
        var tdVal = $(el).text().trim();
        $(toRemove).each(function (j2, rm) {
            tdVal = tdVal.replace(rm, '');
        });
        arr.push(tdVal);
    });

    var result = {};
    $(arr).each(function (i, el) {
        if (i < 1) {
            return;
        }
        if (i % 2 == 1) {
            result[arr[i - 1]] = arr[i];
        }
    });
    return result;
}