$(function (){
    var text_max = 100;
    $('#count_message').html('0 / ' + text_max );

    $('#text').keyup(function() {
        var text_length = $('#text').val().length;
        var text_remaining = text_max - text_length;

        $('#count_message').html(text_length + ' / ' + text_max);
    });


    if($('main').hasClass('appointment-page')){
        $('#datepicker').datepicker({
                todayHighlight: new Date(),
                language: 'ru',
                multidate: 1,

            }
        );
        $('#datepicker').datepicker().on('changeDate', function (ev) {
            $('.appointment-photo').hide();
            $('.appointment-time').show();
        });
    }

    $('.appointment-select').on('click',function (e){
        e.preventDefault();
        $('.appointment-time').hide();
        $('.appointment-form').show();
        if($(window).width() < 600){
            $('.appointment-left').hide()
        }
    });


// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [52.264329, 104.208022],
                zoom: 15
            }, {
                searchControlProvider: 'yandex#search'
            }),

            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div id="placemarkr" style="color: #FFFFFF; font-weight: bold; display: block; background: #FBFBFB;border-radius: 40px">Я тут!</div>'
            ),



            myPlacemarkWithContent = new ymaps.Placemark([52.264329, 104.208022], {
                hintContent: 'Я тут!',
                balloonContent: 'Я тут!',
                iconContent: ''
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#imageWithContent',
                // Своё изображение иконки метки.
                iconImageHref: 'images/ball.svg',
                // Размеры метки.
                iconImageSize: [48, 48],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-24, -24],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                iconContentOffset: [15, 15],
                // Макет содержимого.
                iconContentLayout: MyIconContentLayout
            });
        myPlacemarkWithContent.events.add('mouseenter', function () {
            $('#placemarkr').addClass('placemarkr-hover');
            console.log('aaaa')
        });
        myMap.controls.remove('searchControl'); // удаляем поиск
        myMap.controls.remove('trafficControl'); // удаляем контроль трафика
        myMap.controls.remove('typeSelector'); // удаляем тип
        myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
        myMap.controls.remove('rulerControl'); // удаляем контрол правил
        myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

        myMap.geoObjects
            .add(myPlacemarkWithContent);
    });
})