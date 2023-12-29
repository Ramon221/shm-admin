angular.module('shm_services_select', [
])
.directive('servicesList', [ 'shm_request', function( shm_request ) {
    return {
        restrict: 'E',
        scope: {
            data: '=?data',
            id: '=?id',
        },
        link: function ($scope, $element, $attrs) {
            $scope.readonly = 'readonly' in $attrs;

            var request = 'v1/admin/service';
            var args = {
                limit: 0,
            };
            var key_field = 'service_id';

            $scope.$watch('data', function(newValue, oldValue){
                if (!newValue) return;
                $scope.id = newValue[key_field];
            });

            if ( $scope.readonly ) {
                args[key_field] = $scope.id;
            }

            shm_request('GET', request, args).then(function(response) {
                var rows = response.data.data;
                if (!rows) return;
                $scope.items = rows;

                if ( $scope.id ) {
                    rows.forEach(function(item) {
                        if ( $scope.id == item[key_field] ) {
                            $scope.data = item;
                        }
                    });
                } else $scope.data = rows[0];
            });
        },
        templateUrl: "views/shm/modules/services-list/select.html"
    }
}])
;
