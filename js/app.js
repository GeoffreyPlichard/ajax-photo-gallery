(function($){

	$(".fancybox").fancybox();

	function loopGallery(test, index, item){
		if(test){
			var box = $('<div class="col-md-4 box_animaux box-'+index+'"></div>');
			var pola = $('<div class="pola"></div>');
			var view = $('<div class="view thumb"></div>');
			var mask = $('<div class="mask"><h2>'+item.name+'</h2><p>'+item.description+'</p><a href="img/ara_bleu.jpg" class="info fancybox" rel="group" title="'+item.id+'" ><div class="alt">Voir</div></a></div>')

			$('.gallery').prepend(box);
			box.append(pola);
			pola.append(view);
			view.prepend('<img src="'+item.source+'">');
			view.append(mask);
		}
	}

	$.getJSON('json/photos.json', function(data){
		$.each(data, function(index, item){
			loopGallery(index <= 2, index, item);
		});
	});

	$('.next').on('click', function(event){
		event.preventDefault();
		var galleryLength = $('.pola').length;
		$.ajax('json/photos.json', {
			success: function(data){
				$.each(data, function(index, item){
					loopGallery(item.id >= galleryLength && item.id < galleryLength + 3, index, item);
				});
			},
			beforeSend: function(){
				$('.next').hide();
				$('.spinner').fadeIn();
			},
			complete: function(){
				$('.spinner').hide();
				$('.next').fadeIn();
			}
		});
	});


})(jQuery);