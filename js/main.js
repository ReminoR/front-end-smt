$(window).scroll(function() {
	// изменение меню при скролле
	if($(this).scrollTop() > 0) {
		$('#header_navbar').removeClass('header_transparent');
	}
	else {
		$('#header_navbar').addClass('header_transparent');
	}

	//появление кнопки 'вверх'
	if($(this).scrollTop() > 1080) {
		$('#upper_btn').fadeIn(300);
	} else {
		$('#upper_btn').fadeOut(300);
	}
});

$(document).ready(function() {

//используем jQuery 2.1.0
	var $ = jQuery = jquery_2_1_0; 
	//включаем галерею
	$('.swipebox').swipebox({
		useCSS : true, // false will force the use of jQuery for animations
		useSVG : true, // false to force the use of png for buttons
		initialIndexOnArray : 0, // which image index to init when a array is passed
		hideCloseButtonOnMobile : false, // true will hide the close button on mobile devices
		removeBarsOnMobile : true, // false will show top bar on mobile devices
		hideBarsDelay : 3000, // delay before hiding bars on desktop
		videoMaxWidth : 1140, // videos max width
		beforeOpen: function() {}, // called before opening
		afterOpen: null, // called after opening
		afterClose: function() {}, // called after closing
		loopAtEnd: false // true will return to the first image after the last image is reached
	});



//используем jQuery 3.2.1
	var $ = jQuery = jquery_3_2_1;

	//Плавная прокрутка для ссылок меню и стрелка вверх
	$(".anchor_link").on("click", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор блока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за n мс
		$('body, html').animate({scrollTop: top}, 500);
	});

	//автоматический запуск видео
	var $video = $('.youtube_iframe'),
		src = $video.attr('src');

	$('.video-block-content__button').click(function() {
		$video.attr('src', src + '&autoplay=1');
	});

	//выключаем видео после закрытия всплывающего окна
	$('.modal .close, .modal').click(function(){
		$('.youtube_iframe').each(function(index) {
			$(this).attr('src', $(this).attr('src'));
			$video.attr('src', src);

			return false;
		});
	});

	//Стилизация элементов формы
	$('input:radio, input:checkbox, select').styler();

	$(".phone").mask("+7 (999)-999-9999");

	// закрываем навигацию при клике по ссылке
	$(function(){ 
		var navMain = $(".navbar-collapse");
		navMain.on("click", "a:not([data-toggle])", null, function () {
			navMain.collapse('hide');
		});
	});

	//ajax отправка формы
	$(".js-ajaxform").submit(function(event) { //устанавливаем событие отправки для формы
		event.preventDefault();
		var form = $(this),
			error = false,
			form_data = $(this).serialize(); //собераем все данные из формы

		var phoneNumber = form.find("input[name='phone']");
		if (phoneNumber.length) {
			if (phoneNumber.val().length < 11) {
				error = true;
				phoneNumber.closest('div.b-form-item').addClass('error').find('div.b-form-item__el-label_error').text('Укажите ваш номер телефона');
				phoneNumber.focus(function() {
					phoneNumber.closest('div.b-form-item').removeClass('error').find('div.b-form-item__el-label_error').text(' ');
				});
			}
		}

		if (error) {
			return false;
		}

		$.ajax({
			type: "POST", //Метод отправки
			url: "scripts/send.php", //путь до php фаила отправителя
			data: form_data,
			beforeSend: function() { // сoбытиe дo oтпрaвки
				form.find('button[type="submit"]').attr('disabled', 'disabled').addClass('loading'); // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
			},
			success: function() {
				//код в этом блоке выполняется при успешной отправке сообщения
				form.find('button[type="submit"]').addClass('success');
				form.find('.status_block').addClass('success').text('Ваш запрос успешно отправлен!');

			},
			complete: function() { // сoбытиe пoслe любoгo исхoдa
				form.find('button[type="submit"]').prop('disabled', false).removeClass('loading'); // в любoм случae включим кнoпку oбрaтнo
			}
		});
	});


});