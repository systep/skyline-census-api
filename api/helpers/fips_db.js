'use strict';

var fs = require('fs');
var q = require('q');
var request = require('request');

module.exports = (function () {
    var fipsDBPath = process.env.FIPS_DB_URL;
    var db = {};

    return {
        load: function () {
            var deferred = q.defer();
            console.log('downloading fips db from ', fipsDBPath);
            request(fipsDBPath, function (err, response, body) {
                console.log('fips db successfully downloaded.');
                if (err) {
                    deferred.reject(err);
                    console.error(err);
                    return;
                }
                var data = body.toString();
                var s = data.split('\n');
                for (var i = 1; i < s.length; i++) {
                    var l = s[i].split(',');
                    var state = l[0].toLowerCase();
                    var city = l[5].toLowerCase();

                    var cityCode = l[3];
                    var stateCode = l[1];

                    db[state] = db[state] || {};
                    db[state][city] = stateCode + cityCode;
                }
                console.log('fips db loaded', Object.keys(db).length);
                deferred.resolve();
            });
            return deferred.promise;
        },
        isReady: function () {
            return Object.keys(db).length > 0;
        },
        getCityCode: function (shortStateName, fullCityName) {
            if (!Object.keys(db).length) {
                return;
            }
            try {
                return db[shortStateName][fullCityName];
            } catch (ex) {
                console.error(ex.message);
                return;
            }
        }
    }
})();