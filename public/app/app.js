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

    vm.editPost = function(post){
      let id = post.id
      let dataObj = {
        id: post.id,
        price: post.price,
        title: post.title,
        description: post.description,
        item_image: post.item_image,
      }
      $http({
        method: 'PATCH',
        url: `https://stark-mesa-75466.herokuapp.com/classifieds/${id}`,
        data: dataObj
      }).then(function(res){
        post.show = false;
      })
    }

    vm.showEdit = function(post){
      if(post.show){
        post.show = false;
      } else {
        post.show = true;
      }
    }

    vm.isClicked = function(){
      if(vm.clicked){
        vm.clicked = false
      } else {
        vm.clicked = true
      }
    }

    vm.deleteAd = function(post) {
      let id = post.id
      $http({
        method:'DELETE',
        url: `https://stark-mesa-75466.herokuapp.com/classifieds/${id}`
      }).then(function(res){
        vm.posts.forEach((ele,i)=>{
          if(res.data.id === ele.id){
            vm.posts.splice(i, 1);
          }
        })
      });
    }

  }
}());
