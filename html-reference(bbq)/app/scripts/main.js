$(document).ready(function () {
  $('.banner-carousel').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    fade: true,
    speed: 1000,
    autoplay: true,
  });
  $('.card-carousel').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    fade: true,
    speed: 1000,
  });
  $('.vouchers-carousel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // rows: 2,
    arrows: false,
    dots: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 1,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          variableWidth: true,
        }
      }
    ]
  });
  $('.events-carousel').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true
        }
      }
    ]
  });
  $('.nearbyOutlets-carousel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true
        }
      }
    ]
  });
  $('.updates-carousel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          mobileFirst: true,
        }
      }
    ]
  });
  $('.basic-info-carousel').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
  });
  $('.paragraph__banner-carousel').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    fade: true,
    speed: 1000,
  });
  $('.paragraph__testimonial-section').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          mobileFirst: true,
        }
      }
    ]
  });

  // Gallery Slider Starts

  $('.paragraph__gallery-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    adaptiveHeight: true,
    infinite: false,
    useTransform: true,
    speed: 400,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          mobileFirst: true,
        }
      }
    ]
  });

  $('.paragraph__gallery-nav')
    .on('init', function (event, slick) {
      $('.paragraph__gallery-nav .slick-slide.slick-current').addClass('is-active');
    })
    .slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      dots: false,
      focusOnSelect: false,
      infinite: false,
      arrows: false,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      }, {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      }, {
        breakpoint: 420,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      }]
    });

  $('.paragraph__gallery-slider').on('afterChange', function (event, slick, currentSlide) {
    $('.paragraph__gallery-nav').slick('slickGoTo', currentSlide);
    var currrentNavSlideElem = '.paragraph__gallery-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
    $('.paragraph__gallery-nav .slick-slide.is-active').removeClass('is-active');
    $(currrentNavSlideElem).addClass('is-active');
  });

  $('.paragraph__gallery-nav').on('click', '.slick-slide', function (event) {
    event.preventDefault();
    var goToSingleSlide = $(this).data('slick-index');

    $('.paragraph__gallery-slider').slick('slickGoTo', goToSingleSlide);
  });

  // Gallery Slider Ends

  $('.accordion-header').click(function (e) {
    e.preventDefault();

    var $this = $(this);

    if ($this.next().hasClass('show')) {
      $this.removeClass('active');
      $this.next().removeClass('show');
      $this.next().slideUp(350);
      $this.parent().removeClass('active');
    } else {
      $this.addClass('active');
      $this.parent().parent().find('.accordion-panel').removeClass('active');
      $this.parent().parent().find('.accordion-panel .accordion-body').removeClass('show');
      $this.parent().parent().find('.accordion-panel .accordion-body').slideUp(350);
      $this.next().toggleClass('show');
      $this.next().slideToggle(350);
      $this.parent().addClass('active');
    }
  });

  $('.reservation__item__menu').click(function (e) {
    e.preventDefault();

    $('.reservation__item-menu').fadeOut(100);
    $(this).parent().next().fadeIn(1000);
  });

  $('.reservation__item-menu__close .close').click(function () {
    // $(this).parent().parent().parent().removeClass('expanded');
    $(this).parent().parent().slideUp(350);
  });
  $('.reservation__corporate-offers').click(function () {
    $('#corporate-offer').show();
    $('.reservation--curtain').addClass('open-corporate-form');
  });
  $('.reservation__success__footer a').click(function () {
    $('#special-request').show();
  });
  $('.reservation__success__advance a').click(function () {
    $('#advance-pay').show();
  });
  $('.refund__card input:radio').click(function () {
    $('.refund__card').removeClass('selected');
    $(this).parent().addClass('selected');
  });
  $('#datepicker').datepicker();
});

$('.navbar__toggler').click(function () {
  $(this).toggleClass('is-open');
  $(this).next().toggleClass('is-open');
});

$('.location').click(function () {
  // if ($(this).hasClass('show')) {
  //   $(this).removeClass('show');
  //   $('.location--dropdown').removeClass('show');
  // } else {
  //   $(this).addClass('show');
  //   $('.location--dropdown').addClass('show');
  // }
  $(this).toggleClass('show');
  $('.location--dropdown').toggleClass('show');
});

$('.user-nav').click(function () {
  $(this).toggleClass('show');
});

$('.user').click(function () {
  $('.login--modal').addClass('show');
});
$('.login--modal-close').click(function () {
  $('.login--modal').removeClass('show');
});
$('.notifications').click(function () {
  $('.notifications-snackbar').fadeToggle();
});
$('.notifications-close').click(function () {
  $('.notifications-snackbar').fadeOut();
});
$('.menuToggle').click(function () {
  if ($(window).width() >= 1024) {
    $('.menu-wrap').slideDown();
    $('body').addClass('show');
    return;
  } else {
    $('.menu-wrap').addClass('show');
  }
});
$(document).mouseup(function (e) {
  var container = $('.menu-wrap--container'); // YOUR CONTAINER SELECTOR

  if (!container.is(e.target) // if the target of the click isn't the container...
    &&
    container.has(e.target).length === 0) // ... nor a descendant of the container
  {
    $('.menu-wrap').removeClass('show');
  }
});
$(document).mouseup(function (e) {
  var location = $('.location--block'); // YOUR CONTAINER SELECTOR

  if (!location.is(e.target) // if the target of the click isn't the container...
    &&
    location.has(e.target).length === 0) // ... nor a descendant of the container
  {
    $('.location--dropdown').removeClass('show');
    $('.location').removeClass('show');
  }
});
$(document).mouseup(function (e) {
  var userDropdown = $('.user--block'); // YOUR CONTAINER SELECTOR

  if (!userDropdown.is(e.target) // if the target of the click isn't the container...
    &&
    userDropdown.has(e.target).length === 0) // ... nor a descendant of the container
  {
    $('.user-nav').removeClass('show');
  }
});
$('.menu-close').click(function () {
  if ($(window).width() >= 1024) {
    $('.menu-wrap').slideUp();
    $('body').removeClass('show');
    return;
  } else {
    $('.menu-wrap').removeClass('show');
  }
});
$('.location--select').select2();
$('.select2-selection').click(function () {
  $(this).toggleClass('show');
});
$('#reserve-table').click(function () {
  $('#reservation-info').hide();
  $('#reservation__success').show();
});
$('#basic-info__card-close').click(function () {
  $('.basic-info__card').hide();
  $('.basic-info__form').show();
});
$('#basic-info__form-done').click(function () {
  $('.basic-info__form').hide();
  $('.basic-info__card').show();
});
$('.value-button').click(function () {
  $('.reservation__item__total').show();
  $('.reservation__sub-total').show();
  $('.reservation__discount').addClass('show');
  $('.reservation__apply-vouchers').show();
  $('.reservation__corporate-offers').show();
  $('.reservation__total').addClass('show');
  $('.reservation__tnc').show();
});

// OTP input starts

$('.corporate-otp').find('input').each(function () {
  $(this).attr('maxlength', 1);
  $(this).on('keyup', function (e) {
    var parent = $($(this).parent());

    if (e.keyCode === 8 || e.keyCode === 37) {
      var prev = parent.find('input#' + $(this).data('previous'));

      if (prev.length) {
        $(prev).select();
      }
    } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
      var next = parent.find('input#' + $(this).data('next'));

      if (next.length) {
        $(next).select();
      } else {
        if (parent.data('autosubmit')) {
          parent.submit();
        }
      }
    }
  });
});

// OTP input ends

$('.reservation__apply-vouchers a').click(function () {
  $('#reservation-info').hide();
  $('#coupons-vouchers').show();
});
$('#coupons-vouchers-close, .coupon-input input, .coupon-cta a').click(function () {
  $('#coupons-vouchers').hide();
  $('#reservation-info').show();
});
$('.coupon-cta a').click(function () {
  $('.reservation__voucher').show();
});
$('#corporate-offer-close').click(function () {
  $('#corporate-offer').hide();
  $('.reservation--curtain').removeClass('open-corporate-form');
});
$('#enter-email input').click(function () {
  $(this).parent().hide();
  $('#verify-otp').show();
});
$('#verify-otp-cta').click(function () {
  $('#verify-otp').hide();
  $('#verify-status').show();
});
$('#advance-pay-close').click(function () {
  $('#advance-pay').hide();
})
$('.reservation__success__reschedule').click(function () {
  $('#reservation-info').show();
  $('.reschedule-block').show();
  $('.no__slot__available').hide();
  $('#reservation__success').hide();
});
$('.reservation__success__cancel').click(function () {
  $('#reservation__success').hide();
  $('#reservation__cancellation').show();
});
$('#request-close').click(function () {
  $('#special-request').hide();
});
$('#menu-tab').tabs();
$('#tabs').tabs();
$('.basic-info__menu').click(function () {
  $('.basic-info__menu-block').toggle();
});
$('#basic-info__menu-close').click(function () {
  $('.basic-info__menu-block').hide();
});


// Sticky Reserve Table Starts

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  var vouchers = $('.main-wrapper');
  var vouchersPosition = vouchers.offset().top - 92;
  var button = $('.input--group-button');
  if (scroll > vouchersPosition) {
    $(button).addClass('sticky');
  } else {
    $(button).removeClass('sticky');
  }
});

$('.card--voucher .button--atc').click(function (e) {
  e.preventDefault();
  $(this).next().show();
  $(this).hide();
});

function increaseValue() {
  console.log($(this).prev().value);
  var value = parseInt($(this).prev().value, 10);
  value = isNaN(value) ? 0 : value;
  if (value < 10) {
    value++;
  }
  $(this).prev().value = value;
}

function decreaseValue() {
  var value = parseInt($(this).next().value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  $(this).next().value = value;
}

$('.checkbox-list').each(function () {
  var count = $(this).children().length;
  if (count > 5 && !$(this).hasClass('checkbox-list--expanded')) {
    $(this).addClass('checkbox-list--collapsed');
    var remaining = count - 5;
    $(this).append('<a href=\'#\' class=\'checkbox-list__button\'>+' + remaining + ' More</a>')
  } else {
    $(this).addClass('checkbox-list--expanded');
  }
});
$('.checkbox-list__button').click(function (e) {
  e.preventDefault();
  $(this).parent().removeClass('checkbox-list--collapsed');
  $(this).parent().addClass('checkbox-list--expanded');
  $(this).hide();
});

$('.show-cart').click(function (e) {
  $('.cart--curtain').addClass('cart--visible');
  e.preventDefault();
});
$('.cart--curtain .close').click(function (e) {
  console.log('clicked close');
  $('.cart--curtain').removeClass('cart--visible');
  e.preventDefault();
});
$('.button--m-filter').click(function () {
  $('.l-filter').addClass('l-filter--show-m');
});
$('.l-filter__submit .button').click(function () {
  $('.l-filter').removeClass('l-filter--show-m');
});
$('.button--m-sort').click(function () {
  if ($(this).hasClass('button--m-sort--asc')) {
    $(this).removeClass('button--m-sort--asc');
    $(this).addClass('button--m-sort--desc');
  } else {
    $(this).removeClass('button--m-sort--desc');
    $(this).addClass('button--m-sort--asc');
  }
});

// Open voucher info in popup.
$('.open-dialog').click(function () {
  $('#dialog').load('voucher_info.html', function () {
    $('#dialog .close').click(function (e) {
      $('#dialog').children().remove();
      e.preventDefault();
    });
  });
});

// Open signin popup.
$('.button--signin').click(function () {
  $('#signin-dialog').load('signin.html', function () {
    $('.form--signin .form__suffix a').click(function (e) {
      $('.form--signin').hide();
      $('.form--signup').show();
      e.preventDefault();
    });
    $('.form--signup .form__suffix a').click(function (e) {
      $('.form--signup').hide();
      $('.form--signin').show();
      e.preventDefault();
    });
    $('.button--submit-next').click(function (e) {
      $('.form--signup').hide();
      $('.form--signin').show();
      setTimeout(function () {
        e.preventDefault();
      }, 3000);
    })
    $('.button--form-signin').click(function (e) {
      if ($('.form--signin').submit()) {
        e.preventDefault();
        $('.signin__form-wrapper').hide();
        $('.signin__success').show();
      }
      setTimeout(function () {
        $('.form--signin').submit();
      }, 1000);
    });
    $('#timer').html('03:00');
    startTimer();
    $('#signin-dialog .close').click(function (e) {
      $('#signin-dialog').children().remove();
      e.preventDefault();
    });
  });
});

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if (s == 59) {
    m = m - 1
  }
  //if(m<0){alert('timer completed')}

  document.getElementById('timer').innerHTML =
    m + ':' + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = '0' + sec
  }; // add zero in front of numbers < 10
  if (sec < 0) {
    sec = '59'
  };
  return sec;
}


$('.show-reservation').click(function (e) {
  $('.reservation--curtain').addClass('reservation--visible');
  e.preventDefault();
});
$('#curtain-close').click(function (e) {
  $('.reservation--curtain').removeClass('reservation--visible');
  e.preventDefault();
});

$('#buffet-link').click(function (e) {
  e.preventDefault();
  $('#a-la-carte').hide();
  $('#buffet').show();
  $('#beverages').hide();
})

$('#a-la-carte-link').click(function (e) {
  e.preventDefault();
  $('#a-la-carte').show();
  $('#buffet').hide();
  $('#beverages').hide();
})

$('#beverages-link').click(function (e) {
  e.preventDefault();
  $('#a-la-carte').hide();
  $('#buffet').hide();
  $('#beverages').show();
})

//Voucher details accordion
$('.voucher--info .info__content .info h3').click(function () {
  $(this).next().slideToggle();
  $(this).toggleClass('dropdown--expand');
})

function isOnScreen(elem) {
  // if the element doesn't exist, abort
  if (elem.length == 0) {
    return;
  }
  var $window = jQuery(window)
  var viewport_top = $window.scrollTop()
  var viewport_height = $window.height()
  var viewport_bottom = viewport_top + viewport_height
  var $elem = jQuery(elem)
  var top = $elem.offset().top
  var height = $elem.height()
  var bottom = top + height

  return (top >= viewport_top && top < viewport_bottom) ||
    (bottom > viewport_top && bottom <= viewport_bottom) ||
    (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
}

$(document).ready(function () {
  window.addEventListener('scroll', function (e) {
    if (isOnScreen(jQuery('.s-offers .layout-container'))) {
      /* Pass element id/class you want to check */
      $('.store-reservation-form').addClass('store-reservation-form--static');
    } else {
      $('.store-reservation-form').removeClass('store-reservation-form--static');
    }
  });
});

// Autoplay Video Starts

document.getElementById('banner-video').play();

// Autoplay Video Ends

// var accordion = document.getElementsByClassName('accordion-header');
// var i;
// var accordionPanel = document.getElementsByClassName('accordion-panel');

// for (i = 0; i < accordion.length; i++) {
//   accordion[i].addEventListener('click', function () {
//     this.parentElement.classList.toggle('expanded');
//     var panel = this.nextElementSibling;
//     if (panel.style.display === 'block') {
//       panel.style.display = 'none';
//     } else {
//       panel.style.display = 'block';
//     }
//   });
// }
