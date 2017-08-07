(function() {
  'use strict';
  angular.module('app', [])
  .component('board', {
    controller: Controller,
    templateUrl: '../app/app.template.html'
  });
  Controller.$inject = ['$http']
  function Controller($http, $window){
    const vm = this;

    vm.$onInit = function () {
      vm.clicked = false;
      vm.posts = [];
      $http({
          method: 'GET',
          url: 'https://stark-mesa-75466.herokuapp.com/classifieds/'
      }).then(function(response){
        vm.posts = response.data;
      })
    }

    vm.newPost = function() {
      $http({
        method: 'POST',
        url: 'https://stark-mesa-75466.herokuapp.com/classifieds/',
        data: vm.post
      }).then(function(res){
        vm.posts.push(res.data);
        delete vm.post;
        vm.clicked = false;
      })
    };

    vm.isClicked = function(){
      if(vm.clicked){
        vm.clicked = false
      } else {
        vm.clicked = true
      }
    }
  }
}());
