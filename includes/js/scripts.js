var h_tela = 0;
var w_tela = 0;
var y = 0;
var y2 = 0;
var scroll_site = 0;
var controle_click = false;
var lol = 185;
var top = 0;

var sel = 0;
var url;
var pagina;
var page;

var theWindow = $(window),
aspectRatio = 0;

function goToPage(page) {
  'use strict';
  window.location = page;
}
var id = 0;


function identificaBrowser() {

  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("opera") != -1) {
    browserName = "opera";
    return 1;
  } else if (ua.indexOf("msie") != -1) {
    browserName = "msie";
    return 2;
  } else if (ua.indexOf("safari") != -1) {
    browserName = "safari";
    return 3;
  } else if (ua.indexOf("mozilla") != -1) {
    if (ua.indexOf("firefox") != -1) {
      browserName = "firefox";
      $('.nano-content').addClass('removeScroll');
      return 4;
    } else {
      browserName = "mozilla";
      return 5;
    }
  }
}


$(document).ready(function (e) {

  identificaBrowser();

  $('.left-sld').hover(function () {
    $('a#prev_h').addClass('wow bounceInLeft animated');
  }, function () {
    $('a#prev_h').removeClass('wow bounceInLeft animated');
  });

  $('.right-sld').hover(function () {
    $('a#next_h').addClass('wow bounceInRight animated');
  }, function () {
    $('a#next_h').removeClass('wow bounceInRight animated');
  });

  $('#hora').mask('00:00');

  $(".menu ul li").click(function () {
    $(".menu ul li").removeClass("ativo");
    $(this).addClass("ativo");
  });

  $(".menu ul li a").click(function () {
    $(".menu ul li a").removeClass("ativo");
    $(this).addClass("ativo");
  });



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


  ajust();


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

  var dados = String(document.location).split("/");
  pagina = dados[dados.length - 1];
  url = String(document.location).replace("/" + pagina, "");

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



    $(".page").each(function (index, element) {

      var top = 0;

      if ((y >= ($(element).offset().top - 50) && y < ($(".page:nth(" + (parseInt(index) + 1) + ")").offset().top - 50)) || ((parseInt(index) + 1) == $('.page').length && y >= $(".page:last").offset().top - 267)) {

        if (index != sel) {
          if ((parseInt(index) + 1) == $('.page').length && y >= $(".page:last").offset().top - 267) {
            window.history.pushState({
              url: url + '/contato'
            }, url + '/contato', url + '/contato');
          } else {
            window.history.pushState({
              url: url + '/' + $(element).data('pagina')
            }, url + '/' + $(element).data('pagina'), url + '/' + $(element).data('pagina'));
          }

          sel = index;
          if (index == '7') {
            index++;
            sel = index;
          }

          $(".menu ul li a").removeClass('ativo');
          $(".menu ul li a#lk_" + $(element).data('pagina')).addClass('ativo');

          $("#menu_mobile ul li a").removeClass('ativo');
          $("#menu_mobile ul li a#lk_" + $(element).data('pagina')).addClass('ativo');

        }
      }
    });
  });

  $('select#select_modalidades , select#select_assunto , select#select_uf , select#select_dia').click(function () {
    idSelect = $(this).attr('id');
  });

});

function ajust() {

  //recebendo valores tela
  h_tela = $(window).height();
  w_tela = $(window).width();

  $(".left-sld, .right-sld").css('height', h_tela - 100 + "px");
  $("#menu_mobile").css("height", h_tela + "px");

  //$("#home").css("height",  h_tela + 200);
  //$("#conteudo_site").css("margin-top",  h_tela + 300);

  if (w_tela > 1024) {
    //$('#slider_intro').css('height', h_tela + 'px');
  } else {
    //$('#slider_intro').css('height', 'auto');
  }



  if (w_tela < 1008) {
    $('#slider_lt li , #slider_lt li ins , #area_slider_lt_int').css('height', h_tela - 50 + 'px').css('width', w_tela - 30 + 'px');
    $('#slider_lt img').css('max-height', h_tela - 50 + 'px').css('max-width', w_tela - 30 + 'px');
  } else {
    $('#slider_lt li , #slider_lt li ins').css('height', '519px').css('width', '830px');
    $('#slider_lt img').css('max-height', '519px').css('max-width', '830px');
    $('#area_slider_lt_int').css('height', 'auto').css('width', '830px');
  }
};

function mudaCombo() {
  var valorCombo = document.getElementById(idSelect).value;
  $('#tipo_' + idSelect).html(valorCombo);
}

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
