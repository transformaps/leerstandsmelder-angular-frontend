'use strict';

var RegionService = function (apiService, $rootScope) {
    return {
        currentRegion: null,
        setCurrentRegion: function (uuid, cb) {
            var _self = this;
            if (!uuid) {
                _self.currentRegion = null;
                $rootScope.$broadcast('currentRegion:updated', null);
                return cb();
            }
            if (!this.currentRegion || this.currentRegion.uuid !== uuid) {
                apiService('regions').actions.find(uuid, function (err, region) {
                    if (!err && region) {
                        _self.currentRegion = region;
                        $rootScope.$broadcast('currentRegion:updated', region);
                    } else {
                        console.log('error getting region for ' + uuid + ': ' + (err ? err.message : null));
                    }
                    cb();
                });
            } else {
                cb();
            }
        }
    };
};

RegionService.$inject = ['apiService', '$rootScope'];

module.exports = RegionService;