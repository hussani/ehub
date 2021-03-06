$(document).ready(function() {
	var url = 'tweets.json';

	$('#schedule-info').popover({
		trigger: 'hover',
		placement: 'right'
	});
	$('#date-one').popover({
		trigger: 'hover',
		placement: 'right'
	});
	$('#date-two').popover({
		trigger: 'hover',
		placement: 'right'
	});
	$('#the-venue').popover({
		trigger: 'hover',
		placement: 'right'
	});
	$('#your-judges').popover({
		trigger: 'hover',
		placement: 'right'
	});
	$('#the-map').popover({
		trigger: 'hover',
		placement: 'right'
	});
	$('#apis-list').popover({
		trigger: 'hover',
		placement: 'right'
	});
	$('#recommended').popover({
		trigger: 'hover',
		placement: 'right'
	});

	$('#wi-hack').tooltip();

	$('#wi-imp').tooltip();

	$('#wi-conf').tooltip();
	showGuider();

	function showGuider() {
		guiders.createGuider({
			buttons: [{name: "Next"}],
			description: "Ehub centraliza as informações e notificações sobre seu evento e gera interações com os participantes.",
			id: "first",
			next: "second",
			overlay: true,
			title: "Bem vindo ao Ehub!",
			closeOnEscape: true
		}).show();

		guiders.createGuider({
			buttons: [{name: "Close", onclick: guiders.hideAll}, {name: "Next"}],
			attachTo: '#event-infos',
			buttons: [{name: "Next"}],
			description: "Box com as informações principais pertinentes ao evento, dicas, opções, descontos, wifi, agenda, etc. Informações gravadas através de um formulário ou integração com Events do facebook",
			id: "second",
			next: "third",
			title: "O Evento",
			position: 2,
			closeOnEscape: true
		});

		guiders.createGuider({
			buttons: [{name: "Close", onclick: guiders.hideAll}, {name: "Next"}],
			attachTo: '#hashtag-list',
			buttons: [{name: "Next"}],
			description: "Lista dos twitts realtime usando a hashtag do evento",
			id: "third",
			next: "fourth",
			title: "O que estão comentando?",
			position: 'leftTop',
			closeOnEscape: true
 		});

		guiders.createGuider({
			buttons: [{name: "Close", onclick: guiders.hideAll}, {name: "Next"}],
			attachTo: '#who-here',
			buttons: [{name: "Next"}],
			description: "Lista de quem está na aplicação, ou fez checking pelo foursquare com a possibilidade de gerar grupos de conversas. O evento tem a facilidade de interagir com os usuários na aplicação através de messagens às salas ou individualmente.",
			id: "fourth",
			next: "fifth",
			title: "Quem está no evento?",
			position: 'leftTop',
			closeOnEscape: true
		});

		guiders.createGuider({
			buttons: [{name: "Close", onclick: guiders.hideAll}],
			attachTo: '#w-eat',
			description: "Lista dos restaurantes mais próximos ao evento.",
			id: "fifth",
			title: "Onde comer?",
			position: 'leftTop',
			closeOnEscape: true
 		});
	}

	function handleTweets(result) {
		if (!result.length) {
			getTweets();
			return;
		}
		$twitt = $('.twitt');
		$.each(result, function (i, el) {
			var stripped = '';
			(function(i){
				stripped = (i % 2 == 0)? 'odd' : 'even';
			}(i))
			var $list = $('<li class="list-twitt '+stripped+'"><div class="img-wrapper"><img width="20" src="'+el.profile+'" /></div><div style="line-height: 11px">'+el.text+'</div><div>'+el.user+'</div></li>');
			$('.twitt ul').prepend($list);
		});
		getTweets();
	}


	function getTweets() {
		$.get(url, handleTweets, 'json');
	}
	getTweets();

	$.getJSON("/place/5034cca2e4b0ec35e6f8b5d3.json", function(data){
		var items = '';

		jQuery.each(data, function(key, val) {
			var stripped = '';
			(function(key){
				stripped = (key % 2 == 0) ? 'odd' : 'even';
			}(key))



			items += '<li class="list-locations '+stripped+'"><div class="img-wrapper"><img width="20" src="'+ val.photourl +'"></div><div class="location-name">'+val.name+'</div></li>';
		});

		$('#ul-nearby').prepend(items);
	});
});