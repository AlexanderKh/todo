// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('todos-list', {
      url: '/todos',
      templateUrl: 'templates/todo-list.html',
      controller: 'TodoListCtrl'
    })
    .state('todos-details', {
      url: '/todos/:id',
      templateUrl: 'templates/todo-details.html',
      controller: 'TodoDetailsCtrl'
    })

  $urlRouterProvider.otherwise('/todos');
})

.controller('TodoListCtrl', function ($scope, TodoService) {
  $scope.showDelete = false;
  $scope.toggleDelete = function () {
    $scope.showDelete = !$scope.showDelete;
  };

  $scope.deleteTodo = function (item) {
    TodoService.delete(item.id);
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.items = TodoService.all();
})

.controller('TodoDetailsCtrl', function ($scope, $stateParams, TodoService) {
  $scope.todo = TodoService.get($stateParams.id);
})

.service('TodoService', function() {
  var data = [
    {
      id: 1,
      title: 'Wash dishes',
      deadline: new Date(2016, 09, 02),
      detail: 'ЫЫЫЫЫЫЫ'
    },
    {
      id: 2,
      title: 'Get cat to walk',
      deadline: new Date(2016, 09, 05),
      detail: 'ЫЫЫЫЫЫЫ'
    }
  ];

  return {
    all: function() {
      return data
    },
    get: function (id) {
      return _.find(data, function (obj) { return obj.id == id });
    },
    delete: function (id) {
      data = _.filter(data, function (obj) { return obj.id != id })
    }
  };
});
