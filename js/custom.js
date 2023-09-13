$(function () {
    $(window).on('scroll', function () {
        let sct = $(window).scrollTop();
        sct > 0
            ? $('.header').addClass('on')
            : $('.header').removeClass('on');
    });

    const MAIN_SLIDE_NUM = document.querySelector('.main_visual .num strong');
    const MAIN_SLIDE_NUM_TOTAL = document.querySelector('.main_visual .num span');
    const mainSlide = new Swiper('.main_slide', {
        loop: true,
        autoplay: {
            delay: 6100,
            disableOnInteraction: false,
        },
        slideActiveClass: 'on',
        on: {
            init: function () {
                MAIN_SLIDE_NUM_TOTAL.innerHTML = `${this.slides.length - 2}`;
            },
            slideChangeTransitionStart: function () {
                //console.log(this.realIndex, this.slides.length);
                MAIN_SLIDE_NUM.innerHTML = `${this.realIndex + 1}`;
            }
        }
    });

    $('.main_visual .arrows .left').on('click', function () {
        mainSlide.slidePrev();
    });
    $('.main_visual .arrows .right').on('click', function () {
        mainSlide.slideNext();
    });

    $('.tab_list li').on('click', function (e) {
        e.preventDefault();
        let idx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('.tab_inner li').eq(idx).addClass('on').siblings().removeClass('on');
    });

    $('.mobile_btn').on('click', function () {
        $(this).toggleClass('on');
        $('.gnb').toggleClass('on');

    });
    $('.gnb').on('wheel touchmove', function (e) {
        e.preventDefault();
    });


})