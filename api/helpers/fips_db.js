'use strict';

var fs = require('fs');
var q = require('q');

module.exports = (function () {
    var dbLoc = './db/fips.csv';
    var db = {};

    return {
        load: function () {
            var deferred = q.defer();
            fs.readFile(dbLoc, 'utf-8', function (err, data) {
                if (err) {
                    deferred.reject(err);
                    console.error(err);
                    return;
                }
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
            console.log(db[shortStateName]);
            try {
                return db[shortStateName][fullCityName];
            } catch (ex) {
                return ex.message;
            }
        }
    }
})();