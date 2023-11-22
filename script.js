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
  openIndex6: 6,
};

// 전체 덱
// prettier-ignore
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
  S: "",
  H: "",
  D: "",
  C: "",
};

// prettier-ignore
const cardNum = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// 함수

const findImg = (card) => {
  return "img/" + card + ".svg";
};

const checkCards = (card1, card2) => {
  if (parseColor(card1[0]) === parseColor(card2[0])) return false;
  const card1Num = cardNum.indexOf(card1.slice(1));
  const card2Num = cardNum.indexOf(card2.slice(1));
  return card2Num - card1Num === 1;
};

const parseColor = (card) => {
  if (card === "H" || card === "D") return "R";
  if (card === "S" || card === "C") return "B";
};

// deck 카드를 다른 변수(덱)에 넣어주는 함수
const spreadCards = () => {
  // area
  let startIdx = 0;
  for (let i = 0; i < 7; i++) {
    const endIdx = startIdx + i + 1;
    area["area" + i] = deck.slice(startIdx, endIdx);
    startIdx = endIdx;
  }
  // leftDeck
  leftDeck = deck.slice(28);
};

const shuffleDeck = (target) => {
  for (let i = 0; i < target.length; i++) {
    const j = Math.floor(Math.random() * target.length);
    [target[i], target[j]] = [target[j], target[i]];
  }
};

// 이벤트

const drawThreeCards = () => {
  if (!leftDeck.length) {
    leftDeck = openLeftDeck;
    openLeftDeck = [];
    shuffleDeck(leftDeck); // left deck shuffle
  } else openLeftDeck = [...openLeftDeck, ...leftDeck.splice(0, 3)];
  renderThreeCards();
};

// 카드 렌더 함수

const renderWholeCards = () => {
  renderAreas(0, 1, 2, 3, 4, 5, 6);
  // Left Deck Event
  const $deck = document.querySelector(".deck");
  $deck.onclick = drawThreeCards;
};

const renderAreas = (...areaIdx) => {
  const renderArea = (idx) => {
    const $area = document.querySelector(".center-area" + idx);
    let gap = 0;
    for (let i = 0; i < idx + 1; i++) {
      const card = area["area" + idx][i];
      const $img = document.createElement("img");
      $img.src =
        i >= area["openIndex" + idx]
          ? findImg(card)
          : "img/backward_orange.svg";
      $img.style.top = gap + "px";
      $img.style.zIndex = "i + 1";
      gap += 17;
      $area.appendChild($img);
    }
  };
  for (let i = 0; i < areaIdx.length; i++) {
    renderArea(areaIdx[i]);
  }
};

const renderThreeCards = () => {
  const $deck = document.querySelector(".deck");

  if (!openLeftDeck.length && leftDeck.length)
    $deck.src = "img/backward_orange.svg";

  const length = openLeftDeck.length < 3 ? 0 : openLeftDeck.length - 3;
  const temp = openLeftDeck.slice(length); // 마지막 3 카드

  let gap = 0;
  let zIndex = 1;
  const $threeCards = document.querySelector(".three-cards");
  $threeCards.innerHTML = "";
  for (const card of temp) {
    const $img = document.createElement("img");
    $img.src = findImg(card);
    $img.style.top = gap + "px";
    $img.style.zIndex = `${zIndex++}`;
    gap += 17;
    $threeCards.appendChild($img);
  }

  if (!leftDeck.length) $deck.src = "img/empty_card_refresh.svg";
};

// 렌더

const render = () => {
  shuffleDeck(deck);
  spreadCards();
  renderWholeCards();
  console.log(area);
};

render();
