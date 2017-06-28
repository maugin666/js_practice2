function Slider() {

  var
    self = this,
    arrayURL = [],
    arrayObjects = [],
    inputTemplate = Handlebars.compile($('#input-template').html()),
    slidesTemplate = Handlebars.compile($('#slides-template').html()),
    sliderTemplate = Handlebars.compile($('#slider-template').html()),
    $container = $('.js-container'),
    position = 0,
    inTransition = false,
    $sliderList,
    maxWidth;

  Handlebars.registerHelper('json', function (context) {
    return JSON.stringify(context);
  });

  // операции с массивом
  this.arrayAdd = function (array) {
    if (Array.isArray(array)) {
      array.forEach(function (item, index) {
        if (String(item).match(/(https?:\/\/[^\s]+\.jpe?g)/i)) {
          arrayURL.push(item);
          arrayObjects.push({
            id: index,
            image: item,
            link: '',
            comment: ''
          });
        }
      });
    } else {
      alert('Эта структура не массив URL картинок.');
    }
  };

  this.arrayEdit = function () {
    arrayObjects.forEach(function (item) {
      var itemLink;

      itemLink = $('.js-add-link[data-id="' + item.id + '"]').val();
      item.comment = $('.js-add-comment[data-id="' + item.id + '"]').val();
      item.link = itemLink;

      if (!itemLink.match(/^\w+:\/\//) && itemLink.length !== 0) item.link = 'http://' + item.link;
    });
  };

  this.arrayDelete = function (id) {
    arrayObjects.forEach(function(item, i) {
      if (item.id === id) {
        arrayObjects.splice(i, 1);
      }
    });
  };

  // отрисовка
  this.drawA = function () {
    $container.html(inputTemplate({slides: arrayURL}));
  };

  this.drawB = function () {
    $container.html(slidesTemplate({slides: arrayObjects}));
  };

  this.drawC = function () {
    var $sliderItem;

    $container.html(sliderTemplate({slides: arrayObjects}));
    $sliderList = $('.slider-list');
    $sliderItem = $('.slider-item');
    maxWidth = $sliderItem.width() * ($sliderItem.length - 1);

    _autoplaySlider();
  };

  //работа слайдера
  this.moveSlide = function(direction) {
    var $currentSlide = $('.js-slider-item.active');

    if (inTransition) return;
    inTransition = true;

    if (direction === 'right') {
      position -= $currentSlide.width();
      $sliderList.addClass('animated').css({left: position + 'px'});
      $currentSlide.removeClass('active').next('.js-slider-item').addClass('active');
    } else if (direction === 'left') {
      position += $currentSlide.width();
      $sliderList.addClass('animated').css({left: position + 'px'});
      $currentSlide.removeClass('active').prev('.js-slider-item').addClass('active');

      if (position > 0) {
        position = -maxWidth;
        $sliderList.removeClass('animated').css({left: position + 'px'});
        $sliderList.children().last().addClass('active').siblings().removeClass('active');
        inTransition = false;
        self.moveSlide('left');
      }
    }
    $('.js-bullet[data-id="' + $('.js-slider-item.active').data('id') + '"]').addClass('active').siblings().removeClass('active');
  };

  this.resetSlider = function () {
    if (position <= -maxWidth) {
      position = 0;
      $sliderList.removeClass('animated').css({left: position + 'px'});
      $sliderList.children().first().addClass('active').siblings().removeClass('active');
      $sliderList.off('transitionend', this.resetSlider);
    }
  };

  this.manageBullet = function($this,id) {
    var
      $slide = $('.js-slider-item[data-id="' + id + '"]'),
      offset = id * $slide.width();

    $sliderList.css({transitionDuration: '0.3s', left: '-' + offset + 'px'});
    $slide.addClass('active').siblings().removeClass('active');
    $this.addClass('active').siblings().removeClass('active');
  };

  function _autoplaySlider() {
    setInterval(function(){
      if (!$('.slider').hasClass('hover')) {
        self.moveSlide('right');
      }
    }, 7000)
  }

  function _listeners() {
    $(document)
      .on('click', '.js-add-array', function (event) {
        event.preventDefault();
        try {
          var value = $('.js-insert-array').val();
          self.arrayAdd(JSON.parse(value));
          self.drawB();
        } catch (error) {
          alert("Ошибка! " + error);
        }
      })
      .on('click', '.js-back-step-one', function () {
        self.drawA();
        arrayObjects.length = 0;
        arrayURL.length = 0;
      })
      .on('change', '.js-add-comment, .js-add-link', function () {
        self.arrayEdit();
      })
      .on('click', '.js-save-slides', function () {
        self.drawC();
      })
      .on('click', '.js-remove-slide', function () {
        var id = parseInt($(this).data('id'));
        self.arrayDelete(id);
        self.drawB();
      })
      .on('click', '.js-btn-prev', function () {
        self.moveSlide($(this).data('dir'));
      })
      .on('click', '.js-btn-next', function () {
        self.moveSlide($(this).data('dir'));
      })
      .on('click', '.js-bullet', function () {
        var id = parseInt($(this).data('id'));

        self.manageBullet($(this),id);
      })
      .on('mouseenter', '.slider', function () {
        $(this).addClass('hover');
      })
      .on('mouseleave', '.slider', function () {
        $(this).removeClass('hover');
      })
      .on('click', '.js-back-step-two', function () {
        self.drawB();
      })
      .on('transitionend', '.slider-list', function () {
        inTransition = false;
        self.resetSlider();
      });
  }

  this.init = function () {
    console.log('init');
    self.drawA();
    _listeners();
  };
}

$(document).ready(function () {
  var slider = new Slider();
  slider.init();

});
