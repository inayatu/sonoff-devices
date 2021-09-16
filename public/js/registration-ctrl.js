angular.module('app', []).controller('regCtrl', function ($scope, $http) {
  $scope.user = {};
  $scope.loader = false;
  $scope.login = () => {
    $scope.loader = true;
    $http({
      method: 'POST',
      url: `${baseURL}/api/v1/users/login`,
      data: {
        email: $scope.user.email,
        password: $scope.user.password,
      },
    })
      .then((suc) => {
        $scope.loader = false;
        swal('Login success', '', 'success');
        window.location.href = '/dashboard.html';
      })
      .catch((err) => {
        $scope.loader = false;
        swal(`Oops!`, `${err.data.message}`, 'error');
      });
  };
  $scope.signup = () => {
    $scope.loader = true;
    if ($scope.user.password != $scope.user.reset_password) {
      $scope.loader = false;
      swal(`Oops!`, `Password doesn't match`, 'error');
      return;
    }
    $http({
      method: 'POST',
      url: `${baseURL}/api/v1/users`,
      data: {
        email: $scope.user.email,
        password: $scope.user.password,
        first_name: $scope.user.first_name,
        last_name: $scope.user.last_name,
        region: $scope.user.region,
        phone: $scope.user.phone,
      },
    })
      .then((suc) => {
        $scope.loader = false;
        swal('Signup success', 'Please login now', 'success');
      })
      .catch((err) => {
        // console.log(err);
        $scope.loader = false;
        const err_msg = `1. Make sure you have created eweLink Account.
        2. You haven't created account here with this email.
        3. Your region name is correct, it can be [as, us, eu, etc]
        4. Make sure have entered the same email and password as in ewelink account`;
        swal(`Oops!`, `${err_msg}`, 'error');
      });
  };
});
