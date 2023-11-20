// 카드 덱

const area = {
  area0: [],
  openIndex0: 0,
  area1: [],
  openIndex1: 1,
  area2: [],
  openIndex2: 2,
  area3: [],
  openIndex3: 3,
  area4: [],
  openIndex4: 4,
  area5: [],
  openIndex5: 5,
  area6: [],
  openIndex6: 6
};

// 전체 덱
let deck = [
  'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK',
  'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK',
  'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK',
  'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK'
];

// 왼쪽 사이드 덱
let leftDeck = [];

let openLeftDeck = [];

let sidePattern = {
  S: '',
  H: '',
  D: '',
  C: ''
}

const cardNum = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// 함수

const findImg = (card) => {
  return 'img/' + card + '.svg'
}

const randomizeDeck = () => {
  // ??
}

// deck 카드를 다른 변수(덱)에 넣어주는 함수
const spreadCards = () => {
  let startIdx = 0
  for (let i = 0; i < 7; i++) {
    const endIdx = startIdx + i + 1
    area['area' + i] = deck.slice(startIdx, endIdx);
    startIdx = endIdx
  }
}

// 카드 렌더 함수

const renderWholeCards = () => {
  renderAreas(0,1,2,3,4,5,6)
}

const renderAreas = (...areaIdx) => {
  const renderArea = (idx) => {
    const $area = document.querySelector('.center-area' + idx)
    let gap = 17

    for (let i = 0; i < idx + 1; i++) {
      const card = area['area'+idx][i]
      const $img = document.createElement('img')
      $img.src = i >= area['openIndex'+idx] ? findImg(card) : 'img/backward_orange.svg'
      $img.style.top = gap + 'px'
      $img.style.zIndex = 'i + 1'
      gap += 17
      $area.appendChild($img)
    }
  }

  for (let i = 0; i < areaIdx.length; i++) {
    renderArea(areaIdx[i])
  }
}

// 렌더

const render = () => {
  randomizeDeck();
  spreadCards();
  renderWholeCards()
  console.log(area)
}

render();