const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const agentDiv = document.querySelector('.agent-info');
const agentImg = document.querySelector('.img');
const agentSlogan = document.querySelector('.slogan');
const agentDesc = document.querySelector('.desc');
const agentEnd = document.querySelector('.end');
const slots = document.querySelectorAll('.slot');
slots[0].style.scale = '1.5';
slots[0].style.background = '#707070';
var debounce = true;
var scrollTick = true;
var currAgent = 'phil'

const agentInfos = {
    'phil': {
        'img': 'https://cdn1.edgedatg.com/aws/v2/abc/ModernFamily/person/737386/c04cab82627c6910b31c54b1357b2d73/579x579-Q90_c04cab82627c6910b31c54b1357b2d73.jpg',
        'slogan': 'Not just another realtor. A man who cares!',
        'desc': 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum molestias saepe quia consequuntur dignissimos fugit harum ducimus dolor dolore, excepturi cumque, suscipit nulla?',
        'end': '~ Phil Dunphy',
    },

    'gil': {
        'img': 'https://m.media-amazon.com/images/M/MV5BMjA4MDc5MzI5N15BMl5BanBnXkFtZTgwMDMzODc3NjE@._V1_.jpg',
        'slogan': 'THORPE! THORPE! THORPE!',
        'desc': 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum molestias saepe quia consequuntur dignissimos fugit harum ducimus dolor dolore, excepturi cumque, suscipit nulla?',
        'end': '~ Gil Thorpe',
    },

    'stella': {
        'img': 'https://www.cheatsheet.com/wp-content/uploads/2021/02/Stella-Modern-Family.jpg',
        'slogan': 'WHOOF',
        'desc': 'Whoof',
        'end': '~ Stella',
    }
}

function switchAgent(num, dir, oppDir) {
    const agentKeys = Object.keys(agentInfos)
    debounce = false;
    const agent = agentKeys[(agentKeys.indexOf(currAgent) + num + agentKeys.length) % agentKeys.length];
    slots[(agentKeys.indexOf(currAgent) + agentKeys.length) % agentKeys.length].style.scale = '1';
    slots[(agentKeys.indexOf(currAgent) + agentKeys.length) % agentKeys.length].style.background = '#909090';
    slots[(agentKeys.indexOf(currAgent) + num + agentKeys.length) % agentKeys.length].style.scale = '1.5';
    slots[(agentKeys.indexOf(currAgent) + num + agentKeys.length) % agentKeys.length].style.background = '#707070';
    currAgent = agent;
    agentDiv.style.animation = `${dir} 0.5s linear 0s 1 normal`;
    console.log(agent);
    setTimeout(() => {
        agentImg.src = agentInfos[agent].img;
        agentSlogan.textContent = agentInfos[agent].slogan;
        agentDesc.textContent = agentInfos[agent].desc;
        agentEnd.textContent = agentInfos[agent].end;
        agentDiv.style.animation = `${oppDir} 0.5s linear 0s 1 reverse`;
    }, 400);    
    
    setTimeout(() => {
        agentDiv.style.animation = '';
        debounce = true;
    }, 900);
}

rightArrow.addEventListener('click', function() {
    if (debounce) {
        switchAgent(1, 'moveRight', 'moveLeft');
    }
});

leftArrow.addEventListener('click', function() {
    if (debounce) {
        switchAgent(-1, 'moveLeft', 'moveRight')
    }
});

function scrollPastSearch() {
    console.log('click');   
    if (window.scrollY >= 300) {
        document.querySelector('.sticky-search').style.display = 'flex';
        document.querySelector('.search').style.display = 'none';
    }
    else {
        document.querySelector('.sticky-search').style.display = 'none';
        document.querySelector('.search').style.display = 'flex';
    }
}

document.addEventListener('scroll', function() {
    console.log(window.scrollY)
    if (scrollTick) {
        window.requestAnimationFrame(() => {
            scrollPastSearch();
            scrollTick = true;
        })
        scrollTick = false;
    }
})
