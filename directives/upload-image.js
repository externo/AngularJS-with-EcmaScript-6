import $q from "Q";

export function uploadImage() {

  let slice = Array.prototype.slice;

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, element, attrs, ngModel) {
      if (!ngModel) return;

      ngModel.$render = function () {
      };

      element.bind('change', function (e) {
        //console.log(JSON.stringify(e));
        var element = e.target;
        //console.log(JSON.stringify(element));
        if (!element.value) {
          return;
        } else {
          element.disabled = true;
          $q.all(slice.call(element.files, 0).map(readFile))
            .then(function (values) {
              if (element.multiple) {
                ngModel.$setViewValue(values);
              } else {
                ngModel.$setViewValue(values.length ? values[0] : null);
              }
              element.value = null;
              element.disabled = false;
            });
        }

        function readFile(file) {
          var deferred = $q.defer();

          var reader = new FileReader();
          reader.onload = function (e) {
            deferred.resolve(e.target.result);
          };
          reader.onerror = function (e) {
            deferred.reject(e);
          };
          reader.readAsDataURL(file);

          return deferred.promise;
        }

      }); //change

    } //link

  }; //return
}
