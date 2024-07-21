$(function () {
    $(document).click((e) => {
        const { target } = e;
        if (target.nodeName === 'A' && target.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});

$(document).ready(function () {
    const $wrapper = $('.brands__wrapper');
    const $content = $wrapper.html();
    $wrapper.append($content);
    const contentWidth = $wrapper.width();
    $wrapper.css('animation-duration', contentWidth / 50 + 's'); // 50px/s скорость скролла
});

$('.news__cards-wrapper').slick({
    infinity: true,
    autoplay: true,
    prevArrow: $('.slick-left'),
    nextArrow: $('.slick-right'),
    slidesToShow: 4,
    responsive: [
        {
            breakpoint: 720,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 2,
            }
        },
    ]
});

$(document).ready(function () {
    // Открытие меню поиска
    $('.navbar__link-search').on('click touchstart', function (e) {
        e.preventDefault();
        $('.search').toggleClass('active');
    });

    // Закрытие меню поиска при клике вне его
    $(document).on('click touchstart', function (e) {
        if ($('.search').hasClass('active') && !$(e.target).closest('.search, .navbar__link-search').length) {
            $('.search').removeClass('active');
        }
    });

    // Закрытие меню поиска по кнопке закрытия
    $('.search__close').on('click touchstart', function (e) {
        e.preventDefault();
        $('.search').removeClass('active');
    });

    // Открытие десктопного меню
    $('.navbar__burgermenu').on('click touchstart', function (e) {
        e.preventDefault();
        $('.menu__desk').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Закрытие десктопного меню
    $('.menu__close button').on('click touchstart', function (e) {
        e.preventDefault();
        $('.menu__desk').removeClass('active');
        $('.navbar__burgermenu').removeClass('active');
    });

    // Открытие мобильного меню
    $('.navbarburgermenu-mob').on('click touchstart', function (e) {
        e.preventDefault();
        $('.menu__desk-mb').toggleClass('active');
        $('body').toggleClass('no-scroll'); // Запрет скролла
        $(this).toggleClass('active'); // Анимация бургера
    });

    // Закрытие мобильного меню
    $('.menu__desk-mb .menu__close button').on('click touchstart', function (e) {
        e.preventDefault();
        $('.menu__desk-mb').removeClass('active');
        $('body').removeClass('no-scroll'); // Включение скролла
        $('.navbarburgermenu-mob').removeClass('active'); // Анимация бургера
    });

    // Открытие корзины
    $('.navbar__link-cart').on('click touchstart', function (e) {
        e.preventDefault();
        $('.cart').toggleClass('active');
    });

    // Закрытие корзины
    $('.cart .close').on('click touchstart', function (e) {
        e.preventDefault();
        $('.cart').removeClass('active');
    });

    // Открытие избранного
    $('.navbar__link-favorite').on('click touchstart', function (e) {
        e.preventDefault();
        $('.favorite').toggleClass('active');
    });

    // Закрытие избранного
    $('.favorite .close').on('click touchstart', function (e) {
        e.preventDefault();
        $('.favorite').removeClass('active');
    });

    // Открытие попапа входа
    $('.navbar__link-login').on('click touchstart', function (e) {
        e.preventDefault();
        $('.login').removeClass('fade-out').addClass('fade-in active');
        $('body').addClass('no-scroll'); // Запрет скролла
    });

    // Закрытие попапа входа
    $('.login__close button').on('click touchstart', function (e) {
        e.preventDefault();
        $('.login').removeClass('fade-in').addClass('fade-out');
        $('body').removeClass('no-scroll'); // Включение скролла

        // Убрать класс active после завершения анимации fade-out
        setTimeout(function() {
            $('.login').removeClass('active fade-out');
        }, 300);
    });

    // Аккордеон для подменю
    $('.menu__mb-decorations-head').on('click', function(e) {
        e.preventDefault();
        var $body = $(this).next('.menu__mb-decorations-body');
        $body.slideToggle(300);
    });

    // Эффекты появления блоков при скролле
    const observerOptions = {
        threshold: 0.1 // Процент видимости элемента, при котором будет вызван callback
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.classList.remove('hidden');
                observer.unobserve(entry.target); // Прекратить наблюдение после появления
            }
        });
    }, observerOptions);

    document.querySelectorAll('.observed').forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});
