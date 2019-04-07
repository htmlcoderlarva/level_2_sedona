var navigation = document.querySelector(".navigation");
    var hamburger = document.querySelector(".hamburger");

    navigation.classList.remove("navigation--no-js");
    hamburger.classList.remove("hamburger--close");

    hamburger.addEventListener("click", function() {
    hamburger.classList.toggle("hamburger--close");
    navigation.classList.toggle("navigation--menu-opened");
})  

svg4everybody();


ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.936329, 30.321203],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),

//        // Создаём макет содержимого.
//        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
//            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
//        ),

        myPlacemark = new ymaps.Placemark([59.936329, 30.321203], {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            // iconImageHref: '../image/svg/map-marker.svg',
            iconImageHref: '../image/map-marker.png',
            // Размеры метки.
            iconImageSize: [36, 35],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [36, -17]
        })

    myMap.geoObjects
        .add(myPlacemark);
});