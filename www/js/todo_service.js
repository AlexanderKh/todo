angular.module('todo.services', [])

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
        delete: function (todo) {
            data.splice(data.indexOf(todo), 1);
        },
        add: function (todo) {
            todo.id = data[data.length - 1].id + 1;
            data.push(todo);
            return todo;
        }
    };
});
