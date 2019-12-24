'use strict';

$(document).ready(function () {
  $('#edit-user').on('click', function () {
    $(this).addClass('hide');
    $('#save-user').removeClass('hide');
    $('#profile-edit').removeClass('hide');
    $('#profile-view').addClass('hide');
    $('#editUserPic').removeClass('hide');
  });
  $('#save-user').on('click', function () {
    $(this).addClass('hide');
    $('#editUserPic').addClass('hide');
    $('#edit-user').removeClass('hide');
    $('#profile-view').removeClass('hide');
    $('#profile-edit').addClass('hide');
  });
  $('.tablinks').on('click', function () {
    var name = $(this).data('tag');
    var id = $(this).data('target');
    switch (id) {
      case 'reservation':
        document.getElementById('defaultReservation').click();
        break;
      case 'vouchers':
        document.getElementById('defaultVouchers').click();
        break;
      default:
        break;
    }
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName(name);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = $(this).parent().children();
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(id).style.display = 'block';
    // evt.currentTarget.className += ' active';
    $(this).addClass('active');
  });
  document.getElementById('defaultOpen').click();
});
//# sourceMappingURL=user-profile.js.map
