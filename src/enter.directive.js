(function() {
  angular
    .module('validation.directive')
    .directive('validationOnEnter', ValidationOnEnter);

  function ValidationOnEnter($injector) {
    var $validationProvider = $injector.get('$validation');
    var $timeout = $injector.get('$timeout');
    var $parse = $injector.get('$parse');
    return {
      priority: 1, // execute before ng-click (0)
      require: '?ngClick',
      link: function postLink(scope, element, attrs) {

        var form = $parse(attrs.validationOnEnter)(scope);
        var formElement = angular.element('[name=' + attrs.validationOnEnter + ']');

        if (formElement.length !== 0) {
          $timeout(function() {
            formElement.off('keypress');
            formElement.on('keypress', function(e) {
              if (e.which === 13) {
                $validationProvider.validate(form).success(function() {
                  if (attrs.ngClick) {
                    $parse(attrs.ngClick)(scope);
                  }
                });
              }
            });
          });
        }
      }
    };
  }
  ValidationOnEnter.$inject = ['$injector'];
}).call(this);
