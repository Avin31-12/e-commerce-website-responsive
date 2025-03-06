// intialize the arts
var swiper = new Swiper('.artSwipper', {
    grabCursor: true,
    effect: 'Creative',
    creativeEffect: {
        prev: {
            Shadow: false,
            translate: [0, 0, -400],
        },
        next: {
            translate: ['100%', 0, 0],
        },

    },
});