/* eslint-disable camelcase */
'use strict';

import angular from "angular";

export function Modal($rootScope, $uibModal) {
  'ngInject';

  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $uibModal.open() returns
   */
  function openModal(scope = {}, modalClass = 'modal-default') {
    var modalScope = $rootScope.$new();
    console.log('modal opened');
    angular.extend(modalScope, scope);

    return $uibModal.open({
      template: require('./modal.html'),
      windowClass: modalClass,
      scope: modalScope
    });
  }

  // Public API here
  return {

    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      delete(del = angular.noop) {
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function () {
          // var slicedArgs = Reflect.apply(Array.prototype.slice, args);
          // var name = slicedArgs.shift();
          // var deleteModal;
          //
          // deleteModal = openModal({
          //   modal: {
          //     dismissable: true,
          //     title: 'Confirm Delete',
          //     html: `<p>Are you sure you want to delete <strong>${name}</strong>?</p>`,
          //     buttons: [{
          //       classes: 'btn-danger',
          //       text: 'Delete',
          //       click(e) {
          //         deleteModal.close(e);
          //       }
          //     }, {
          //       classes: 'btn-default',
          //       text: 'Cancel',
          //       click(e) {
          //         deleteModal.dismiss(e);
          //       }
          //     }]
          //   }
          // }, 'modal-danger');
          //
          // deleteModal.result.then(function(event) {
          //   console.log('reached');
          //   Reflect.apply(del, event, slicedArgs);
          // });
          let args;
          let note_id;
          let note_title;
          let note_content;
          let modal_type;
          let modal_title;
          let modal_html;
          let noteAvgRating;
          let userEmail;
          let noteAuthorEmail;
          let formData = {};
          args = Array.prototype.slice.call(arguments);
          modal_type = args.shift();
          if(modal_type === 'note') {
            modal_title = 'View/Delete Note';
            //console.log('note_id', note_id);
            note_id = args.shift();
            modal_html = `<p> <b>Note ID :</b> <strong>${note_id}</strong></p>`;
            note_title = args.shift();
            note_content = args.shift();
            noteAuthorEmail = args.shift();
            noteAvgRating = args.shift();
            userEmail = args.shift();
            formData.title = note_title;
            formData.content = note_content;
            formData.avgRating = noteAvgRating;
            if(userEmail == noteAuthorEmail) {
              formData.editable = 'true';
            } else {
              formData.editable = 'false';
            }
            //formData.userEmail = userEmail;
            //formData.noteAuthorEmail = noteAuthorEmail;
          } else if(modal_type === 'add_note') {
            modal_title = 'Add a new note';
            modal_html = '<p> Please fill up the following details to add a new note</p>';
          } else {
            modal_title = 'Create group';
            modal_html = '<p>Fill up the group details</p>';
          }
          let deleteModal = openModal({
            modal: {
              formData: formData,
              type: modal_type,
              dismissable: true,
              title: modal_title,
              html: modal_html,
              buttons: [{
                classes: 'btn-danger',
                text: 'Submit',
                click: function (e) {
                  deleteModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function (e) {
                  deleteModal.dismiss(e);
                }
              }]
            }
          }, 'modal-danger');

          deleteModal.result.then(function (event) {
            del.apply(event, [formData, note_id]);
          });
        };
      }
    }
  };
}

export default angular.module('studyGenieApp.Modal', [])
  .factory('Modal', Modal)
  .name;
