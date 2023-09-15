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

    $('.main_business .box').on('mouseenter', function () {
        $(this).addClass('on').siblings().removeClass('on');
    });

    const newsSlide = new Swiper('.news_slide', {
        loop: false,
        autoplay: false,
        on: {
            slideChangeTransitionStart: function () {
                $('.news_slide .dots li')
                    .eq(this.realIndex)
                    .addClass('on')
                    .siblings()
                    .removeClass('on');
                $('.news_slide .arrows>div')
                    .eq(this.realIndex)
                    .addClass('on')
                    .siblings()
                    .removeClass('on');
            }
        }
    });

    // 1번째
    $('.news_slide .arrows .left').on('click', function () {
        newsSlide.slidePrev();
    });

    // 2번째
    $('.news_slide .arrows .right').on('click', function () {
        newsSlide.slideNext();
    });

    // dots

    $('.news_slide .dots li').on('click', function () {
        const idx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on')
        newsSlide.slideTo(idx);
    });

    $('.glb').on('click', function () {
        $(this).toggleClass('on')
    })
    $('.btn_l').on('click', function () {
        $(this).toggleClass('on')
    })

    $('.mobile_btn').on('click', function () {
        $(this).toggleClass('on');
        $('.gnb').toggleClass('on');
        $('.search').toggleClass('on');
    });

    $('.gnb .main_menu>li>a').on('click', function (e) {
        if ($('.gnb').hasClass('on')) {
            e.preventDefault();
            $(this).next().stop().slideToggle();
            // 메뉴 리스트 덮어버리기//
            $(this).parent().siblings().find('.sub_menu').stop().slideUp();
        }
    });
    $(window).on('resize', function () {
        $('.gnb').removeClass('on')
    });

    // $('.gnb').on('wheel touchmove', function (e) {
    //     e.preventDefault();
    // });

    $('.to_top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 1000)
    });


    /* GET ALL VIDEOS */
    var sliderVideos = $(".swiper-slide video");

    /* SWIPER API - Event will be fired after animation to other slide (next or previous) */
    mainSlide.on('slideChange', function () {
        /* 다음 슬라이드로 갈 시 비디오 재생을 멈추고 시간 처음으로 */
        sliderVideos.each(function (index) {
            this.pause();
            this.currentTime = 0;
        });

        /* SWIPER GET CURRENT AND PREV SLIDE (AND VIDEO INSIDE) */
        var prevVideo = $("[data-swiper-slide-index=" + this.previousIndex + "]").find("video");
        var currentVideo = $("[data-swiper-slide-index=" + this.realIndex + "]").find("video");
        prevVideo.trigger('stop');
        currentVideo.trigger('play');

    });
})