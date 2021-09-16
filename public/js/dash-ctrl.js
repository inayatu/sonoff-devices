const user_id = getCookie('user');
if (!user_id || user_id == 'null' || user_id == '') window.location.href = '/';

angular.module('app', []).controller('dashCtrl', function ($scope, $http) {
  $scope.loader = true;
  $scope.devices = [{ a: 1 }];
  $scope.switchBtn = null;

  $scope.changeDeviceStatus = (d, index, event) => {
    $scope.switchBtn = 'switchBtn' + index;

    $http({
      method: 'POST',
      url: baseURL + '/api/v1/devices/toggle/' + d.deviceid,
      headers: { user: user_id },
    })
      .then((data) => {
        $scope.switchBtn = null;

        $scope.loader = false;
        console.log(data);
        if (d.params.switch == 'on') d.params.switch = 'off';
        else d.params.switch = 'on';
      })
      .catch((err) => {
        $scope.loader = false;
        $scope.switchBtn = null;

        console.log(err);
      });
  };

  $scope.getDevices = () => {
    $scope.loader = true;
    $http({
      method: 'GET',
      url: baseURL + '/api/v1/devices',
      headers: { user: user_id },
    })
      .then((data) => {
        $scope.loader = false;
        $scope.devices = data.data.data;
      })
      .catch((err) => {
        $scope.loader = false;
      });
  };

  $scope.logout = () => {
    document.cookie = 'user=null';
    window.location.href = '/';
  };
});
