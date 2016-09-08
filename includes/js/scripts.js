var h_tela = 0;
var w_tela = 0;
var y = 0;
var y2 = 0;
var scroll_site = 0;
var controle_click = false;
var lol = 185;
var top = 0;
var id = 0;

var sel = 0;
var url;
var pagina;
var page;

function goToPage(page) {
  'use strict';
  window.location = page;
}



$(document).ready(function (e) {

  ajust();

  //GOOGLE MAPS (DISABLE SCROL)
  $('#mapa iframe').addClass('scrolloff');
  $('#mapa').on("mouseup", function () {
    $('#mapa iframe').addClass('scrolloff');
  });
  $('#mapa').on("mousedown", function () {
    $('#mapa iframe').removeClass('scrolloff');
  });
  $('#mapa iframe').mouseleave(function () {
    $('#mapa iframe').addClass('scrolloff');
  });

  $('.tabs-menu ul li a').click(function () {
    var a = $(this);
    var active_tab_class = 'active-tab-menu';
    var the_tab = '.' + a.attr('data-tab');

    $('.tabs-menu ul li a').removeClass(active_tab_class);
    a.addClass(active_tab_class);

    $('.tabs-content .tabs').css({
      'display': 'none'
    });

    $(the_tab).show();

    return false;
  });


  $(document).scroll(function () {
    var y = $(document).scrollTop();

    if ($(document).scrollTop() > 589) {
      $('#menu').addClass('menu_fixed');
    } else {
      $('#menu').removeClass('menu_fixed');
    }
  });


  $("#list_area li .area_int").slideUp(0);
  $("#list_area li div#s").click(function () {
    var c = $(this).attr('class');

    if (c == 'select') {
      $('#list_area li div#s').removeClass('select');
      $("#list_area li .area_int").hide();
    } else {
      $('#list_area li div#s').removeClass('select');
      $('#list_area li span').removeClass('ativo');
      $("#list_area li .area_int").hide();
      $(this).addClass('select');
      $(this).next(".area_int").show();
    }
  });


  $(".formulario_select select ").change(function () {
    var rec = $(this).parent('.formulario_select').find('strong');
    var val = $(this).val();
    $(this).find('option').each(function (index, element) {
      if ($(element).val() == val) {
        rec.html($(element).html());
      }
    });
  });
  $(".formulario_select").find('select').each(function (index, element) {
    var rec = $(element).parent('.formulario_select').find('strong');
    var val = $(element).val();
    $(element).find('option').each(function (i, el) {
      if ($(el).val() == val) {
        rec.html($(el).html());
      }
    });
  });

  window.onload = function () {
    setTimeout('ajust()', 1000);
  }

  $("#bt_menu").click(function () {
    $(this).toggleClass('open');
    $("#area_menu_mobile").toggleClass("slideRight", 200);
    if (controle_click == false) {
      $('#area_menu_mobile').css({
        'z-index': '9999999'
      });
      $("#area_menu_mobile").css('left', '0');
      $('#mask_menu').fadeIn(200);
      lock_scroll();
      controle_click = true;
    } else {
      unlock_scroll();
      $("#area_menu_mobile").css('left', '-250px');
      $('#mask_menu').fadeOut(200);
      controle_click = false;
    }
  });

  $("#menu_mobile ul li a, #mask_menu").click(function () {
    $("#bt_menu").toggleClass('open');
    $("#bt_menu").removeClass('open');
    $("#area_menu_mobile").toggleClass("slideRight", 200);
    $("#area_menu_mobile").css('left', '-250px');
    unlock_scroll()
    $('#mask_menu').fadeOut(200);
    controle_click = false;
  });

  // Evento responsável por monitorar o evento de redimensionamento
  window.onresize = ajust;

  w_tela = $(window).width();

  $(window).scroll(function () {

    y = $(document).scrollTop();

    if (w_tela > 1024) {
      if (y > 900) {
        $('#home').css('position', 'fixed').css('margin-top', '-900px');
      } else {
        $('#home').css('position', 'absolute').css('margin-top', '0px');
      }
    } else {
      $('#home').css('position', 'absolute').css('margin-top', '0px');
    }
  });

});

function ajust() {

  //recebendo valores tela
  h_tela = $(window).height();
  w_tela = $(window).width();

  $("#menu_mobile").css("height", h_tela + "px");
};

function mov_scroll(id) {

  controle_click = true;

  if (controle_click == true) {
    $('#bt_menu').removeClass('open');
    $("#area_menu_mobile").removeClass("slideRight", 200);
    $('#mask_menu').fadeOut(200);
    unlock_scroll();
    controle_click = false;
  }

  if (id == 'home') {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  } else {
    if (w_tela < 1008) {
      $('html, body').animate({
        scrollTop: $('#' + id).offset().top - 50
      }, 1000);
    } else {
      $('html, body').animate({
        scrollTop: $('#' + id).offset().top - 50
      }, 1000);
    }
  }
}

function lock_scroll() {
  $('body').bind('scroll touchmove mousewheel', function (e) {
    e.preventDefault();
    return false;
  });
}

function unlock_scroll() {
  $('body').unbind('scroll touchmove mousewheel');
}
