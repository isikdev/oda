$(document).ready(function () {
    // Скрытие и показ контента вкладок
    $('.products__tab-content').hide();
    $('#current').show();

    $('.products__head-item').on('click', function (e) {
        e.preventDefault();

        var tab_id = $(this).data('tab');

        $('.products__head-item').removeClass('products__head-item-active');
        $(this).addClass('products__head-item-active');

        $('.products__tab-content').hide();
        $('#' + tab_id).show();
    });

    // Дублирование контента для плавного скролла
    const $wrapper = $('.brands__wrapper');
    const $content = $wrapper.html();
    $wrapper.append($content);
    const contentWidth = $wrapper.width();
    $wrapper.css('animation-duration', contentWidth / 50 + 's'); // 50px/s скорость скролла

    // Инициализация слайдера
    $('.news__cards-wrapper').slick({
        prevArrow: $('.slick-left'),
        nextArrow: $('.slick-right'),
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: true,
        appendDots: $('.news__intro-slider-dots'),
        variableWidth: true,
        responsive: [
            {
                breakpoint: 720,
                settings: {
                    arrows: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Поиск
    $('.navbar__link-search').on('click touchstart', function (e) {
        e.preventDefault();
        $('.search').toggleClass('active');
    });

    $(document).on('click touchstart', function (e) {
        if ($('.search').hasClass('active') && !$(e.target).closest('.search, .navbar__link-search').length) {
            $('.search').removeClass('active');
        }
    });

    $('.search__close').on('click touchstart', function (e) {
        e.preventDefault();
        $('.search').removeClass('active');
    });

    // Управление бургер-меню для десктопа
    $('.navbar__burgermenu').on('click touchstart', function (e) {
        e.preventDefault();
        $('.menu__desk').toggleClass('active');
        $(this).toggleClass('active');

        if ($('.menu__desk').hasClass('active')) {
            setTimeout(function () {
                $('.menu__close').addClass('active');
            }, 500);
        } else {
            $('.menu__close').removeClass('active');
        }
    });

    $('.menu__close button').on('click touchstart', function (e) {
        e.preventDefault();
        $('.menu__desk').removeClass('active');
        $('.navbar__burgermenu').removeClass('active');
        $('.menu__sublinks').removeClass('active');
        $('.menu__close').removeClass('active');
    });

    // Управление мобильным бургер-меню
    $('.navbarburgermenu-mob').on('click touchstart', function (e) {
        e.preventDefault();
        $('.menu__desk-mb').toggleClass('active');
        $('body').toggleClass('no-scroll'); // Запрет скролла
        $(this).toggleClass('active'); // Анимация бургера
    });

    $('.menu__close-mb button').on('click touchstart', function (e) {
        e.preventDefault();
        $('.menu__desk-mb').removeClass('active');
        $('body').removeClass('no-scroll'); // Включение скролла
        $('.navbarburgermenu-mob').removeClass('active'); // Анимация бургера
    });

    // Управление корзиной
    $('.navbar__link-cart').on('click touchstart', function (e) {
        e.preventDefault();
        $('.cart').toggleClass('active');
    });

    $('.cart .close').on('click touchstart', function (e) {
        e.preventDefault();
        $('.cart').removeClass('active');
    });

    // Управление избранным
    $('.navbar__link-favorite').on('click touchstart', function (e) {
        e.preventDefault();
        $('.favorite').toggleClass('active');
    });

    $('.favorite .close').on('click touchstart', function (e) {
        e.preventDefault();
        $('.favorite').removeClass('active');
    });

    // Управление логином
    $('.navbar__link-login').on('click touchstart', function (e) {
        e.preventDefault();
        $('.login').removeClass('fade-out').addClass('fade-in active');
        $('body').addClass('no-scroll'); // Запрет скролла
    });

    $('.login__close button').on('click touchstart', function (e) {
        e.preventDefault();
        $('.login').removeClass('fade-in').addClass('fade-out');
        $('body').removeClass('no-scroll'); // Включение скролла
        setTimeout(function () {
            $('.login').removeClass('active fade-out');
        }, 300);
    });

    // Показ и скрытие подменю в мобильной версии
    $('.menu__mb-decorations-head').on('click', function (e) {
        e.preventDefault();
        var $body = $(this).next('.menu__mb-decorations-body');
        $body.slideToggle(300);
    });

    // Наблюдатель за элементами для анимации
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

    // Наведение на ссылки для подменю
    $('.menu__links-ul a[data-target]').hover(
        function () {
            var target = $(this).data('target');
            $('.menu__sublinks').each(function () {
                if ($(this).data('menu') === target) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        }
    );

    // Скрытие подменю при уходе курсора
    $('.menu__sublinks').hover(
        function () {
            $(this).addClass('active');
        },
        function () {
            $(this).removeClass('active');
        }
    );

    // Управление отображением пароля
    $('body').on('click', '.password-control', function () {
        if ($('#password-input').attr('type') == 'password') {
            $(this).addClass('view');
            $('#password-input').attr('type', 'text');
        } else {
            $(this).removeClass('view');
            $('#password-input').attr('type', 'password');
        }
        return false;
    });
});
