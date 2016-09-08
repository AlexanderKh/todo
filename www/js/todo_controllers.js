angular.module('todo.controllers', [])

    .controller('TodoListCtrl', function ($scope, $ionicPopup, $ionicModal, TodoService) {
        $scope.showDelete = false;
        $scope.toggleDelete = function () {
            $scope.showDelete = !$scope.showDelete;
        };

        $scope.deleteTodo = function (item) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Remove TODO',
                template: 'Are you sure you want to remove TODO ' + item.title,
                okType: 'button-assertive'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    TodoService.delete(item);
                }
            });
        };

        $ionicModal.fromTemplateUrl('templates/todo-new.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            $scope.modal.show();
            $scope.todo = {};
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.createTodo = function(todo) {
            TodoService.add(todo);
            $scope.closeModal();
        };

        $scope.items = TodoService.all();
    })

    .controller('TodoDetailsCtrl', function ($scope, $stateParams, TodoService) {
        $scope.todo = TodoService.get($stateParams.id);
    });
