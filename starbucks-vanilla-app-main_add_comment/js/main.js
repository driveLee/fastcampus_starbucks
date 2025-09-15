'use strict'  //

/**
 * 검색창 제어. 
 * 강의 07
 */
// 검색창 요소(.search) 찾기.
const searchEl = document.querySelector('.search')
  /* 
      searchEl 이라는 변수 생성.     
      변수는 document(html)라는 element에서 querySelector라는 method를 실행한다. 
      인수: class가 search인 요소인 css 선택자를 찾아서 searchEl이라는 변수에 할당.
  */
const searchInputEl = searchEl.querySelector('input')
  /* searchEl 내부에서 input을 찾아라 */
// 검색창 요소를 클릭하면 실행.
searchEl.addEventListener('click', function () {            /* searchEl에서 event 추가: click 하면 function 작동 */
  searchInputEl.focus()                                     /* searchInputEl에서 focus 동작 */
})
// 검색창 요소 내부 실제 input 요소에 포커스되면 실행.
searchInputEl.addEventListener('focus', function () {       
  searchEl.classList.add('focused')                         /* searchEl 요소의 class내용(focused)을 추가 */
  searchInputEl.setAttribute('placeholder', '통합검색')      /* html속성을 지정. (이름, 속성의 들어갈 값)  */
})
// 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행.
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused')
  searchInputEl.setAttribute('placeholder', '')
})


/**
 * 페이지 스크롤에 따른 요소 제어. 
 * 강의 11
 */
// 페이지 스크롤에 영향을 받는 요소들을 검색!
const badgeEl = document.querySelector('header .badges')  // 강의 11
const toTopEl = document.querySelector('#to-top')   // 강의 33
// 페이지에 스크롤 이벤트를 추가!
// 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌. 외부 lodash library)
  /* _.throttle(함수, 시간(milisec)) */
window.addEventListener('scroll', _.throttle(function () {  /* window: browser의 창. 그 창이 scroll 되면 throttle function 동작 */
  // 페이지 스크롤 위치가 500px이 넘으면.
  if (window.scrollY > 500) {    /* 화면을 스크롤 할 때 500보다 커지면 */
    // Badge 요소 숨기기!  
    // 외부 animation library: gsap. 강의 12
    gsap.to(badgeEl, .6, {        // gsap.to(요소, 지속시간(sec), 옵션)
      opacity: 0,
      display: 'none'
    })
    // 상단으로 스크롤 버튼 보이기!
    // 강의 33
    gsap.to(toTopEl, .2, {  //gsap.to(요소, 시간(sec), 옵션)
      x: 0
    })

  // 페이지 스크롤 위치가 500px이 넘지 않으면.
  } else {
    // Badge 요소 보이기!
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    })
    // 상단으로 스크롤 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    })
  }
}, 300))
// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, .7, {      // window = 그냥 화면 자체
    scrollTo: 0
  })
})


/**
 * 순서대로 나타나는 기능
 강의 15
 */
// 나타날 요소들(.fade-in) 찾기.
const fadeEls = document.querySelectorAll('.visual .fade-in')
// 나타날 요소들을 하나씩 반복해서 처리!
fadeEls.forEach(function (fadeEl, index) { 
  // 각 요소들을 순서대로(delay) 보여지게 함!
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,  // index: 0에서 부터 시작하는 숫자. 여기선 fade-in 이라는 class를 가진 4개의 visual image. 0.7, 1.4, 2.1, 2.7초 순으로 순차적 
    opacity: 1
  })
})


/**
 * 슬라이드 요소 관리
 강의 17에서 사용하는 ver.6 (문법이 살짝 다름)
 강사 github에 들어가서 사용하기 바람 
 강의 18
 */
new Swiper('.notice-line .swiper-container', { // swiper('인수', 옵션)
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
})
  // 강의 20
new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal'(기본값), // 수평 슬라이드
  autoplay: { // 자동 재생 여부
    delay: 5000 // 5초마다 슬라이드 바뀜
  },
  loop: true, // 반복 재생 여부
  slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  pagination: { // 페이지 번호 사용 여부
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.promotion .swiper-prev', // 이전 버튼 선택자
    nextEl: '.promotion .swiper-next' // 다음 버튼 선택자
  }
})
// 다중 요소 슬라이드
// 강의 31
new Swiper('.awards .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
})


/**
 * Promotion 슬라이드 토글 기능
 강의 22
 */
// 슬라이드 영역 요소 검색!
const promotionEl = document.querySelector('.promotion')  // promotion이라는 class를 찾아서 promotionEl 이라는 변수에 할당
// 슬라이드 영역를 토글하는 버튼 검색!
const promotionToggleBtn = document.querySelector('.toggle-promotion')
// 슬라이드 영역 숨김 여부 기본값!
let isHidePromotion = false
// 토글 버튼을 클릭하면,
promotionToggleBtn.addEventListener('click', function () {
  // 슬라이드 영역 숨김 여부를 반댓값으로 할당!
  isHidePromotion = !isHidePromotion
  // 요소를 숨겨야 하면,
  if (isHidePromotion) {
    promotionEl.classList.add('hide')  // promotionEl이라는 요소의 'hide' class를 추가
  // 요소가 보여야 하면,
  } else {
    promotionEl.classList.remove('hide')
  }
})


/**
 * 부유하는 요소 관리
 강의 26
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
// 부유하는(떠 다니는) 요소를 만드는 함수
function floatingObject(selector, delay, size) {    // 여기선 size = 위아래로 움직이는 크기
  gsap.to(     // gsap.to(요소, 시간(sec), 선택자)
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {
      delay: random(0, delay), // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
      y: size, // `transform: translateY(수치);`와 같음. 수직(y axis)으로 얼마나 움직일지 설정.
      repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
      yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
      ease: Power1.easeInOut // gsap Easing 함수 적용.
    }
  )
}
floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)


/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 강의 29
 외부 library scorll magic
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})


/**
 * 올해가 몇 년도인지 계산
 강의 32
 */
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()
