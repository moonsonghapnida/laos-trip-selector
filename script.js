// script.js
document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("trip-selector");

  // 1) HTML 마크업 삽입
  container.innerHTML = `
<div class="cpack-intro">
  <h2>C-Pack이란?</h2>
  <ul>
    <li><strong>내 마음대로</strong> 일정을 구성할 수 있어요.</li>
    <li><strong>호텔도 자유롭게</strong> 직접 선택 가능해요.</li>
    <li><strong>정해진 식사?</strong> 없습니다. 현지 맛집에서 자유롭게 즐기세요.</li>
    <li><strong>현지 전문가</strong>가 당신의 여행을 직접 설계합니다.</li>
    <li><strong>프리미엄 단독 투어</strong>를 패키지 가격에 제공합니다.</li>
    <li><strong>팁, 쇼핑, 선택관광</strong> 강요는 이제 그만!</li>
  </ul>
</div>

<div class="schedule-container">
  <!-- 1일차 -->
  <div class="day-label-block"><div class="day-number">1일차</div></div>
  <div class="schedule-row">
    <div class="time-button">항공편</div>
    <div class="option-buttons">
      <button class="option-button flight-option" data-option="day" data-price-krw="0" data-price-usd="20">
        <div class="image-placeholder">이미지</div>
        <div>
          <div style="font-weight: 600;">주간 항공편</div>
          <div style="font-size: 13px; color: #636e72;">도착 시간에 따라 차량/가이드 추가 요금 발생</div>
          <div style="margin-top: 4px; font-size: 13px; color: #0984e3;">₩0 / $20</div>
        </div>
      </button>
      <button class="option-button flight-option" data-option="night" data-price-krw="0" data-price-usd="0">
        <div class="image-placeholder">이미지</div>
        <div>
          <div style="font-weight: 600;">야간 항공편</div>
          <div style="font-size: 13px; color: #636e72;">기본 공항 픽업 포함</div>
          <div style="margin-top: 4px; font-size: 13px; color: #0984e3;">₩0 / $0</div>
        </div>
      </button>
    </div>
  </div>

  <div id="day1-extra-schedule" style="display: none;">
    <div class="day-label-block"><div class="day-number">1일차 오후 일정</div></div>
    <div class="schedule-row">
      <div class="time-button">오후 A</div>
      <div class="option-buttons">
        <button class="option-button" data-price-krw="10000" data-price-usd="8">
          <div class="image-placeholder">이미지</div>
          <div>
            <div style="font-weight: 600;">시내 관광</div>
            <div style="font-size: 13px; color: #636e72;">비엔티안 주요 명소 방문</div>
            <div style="margin-top: 4px; font-size: 13px; color: #0984e3;">₩10,000 / $8</div>
          </div>
        </button>
        <button class="option-button" data-price-krw="0" data-price-usd="0">
          <div class="image-placeholder">이미지</div>
          <div>
            <div style="font-weight: 600;">호텔 휴식</div>
            <div style="font-size: 13px; color: #636e72;">자유시간</div>
            <div style="margin-top: 4px; font-size: 13px; color: #0984e3;">₩0 / $0</div>
          </div>
        </button>
      </div>
    </div>
    <!-- 석식, 오후 B… (원본 그대로) -->
  </div>

  <!-- 2일차 ~ 5일차 전체 일정 (원본 코드 그대로) -->
  <!-- …생략…(여기에도 동일하게 day-label-block, schedule-row …등 전체 복사) … -->

</div>

<div class="price-banner">
  <div>결제하실 금액 (₩): <span id="total-krw">0</span></div>
  <div>현장 결제하실 금액 ($): <span id="total-usd">0</span></div>
</div>
  `;

  // 2) 선택 항목 합산 로직
  function formatKRW(value) {
    return new Intl.NumberFormat('ko-KR').format(value);
  }
  const buttons = container.querySelectorAll(".option-button");
  const totalKRW = container.querySelector("#total-krw");
  const totalUSD = container.querySelector("#total-usd");
  let selectedButtons = {};

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const row = button.closest(".schedule-row");
      const key = row ? row.innerHTML.slice(0, 50) : Math.random();
      if (selectedButtons[key]) {
        selectedButtons[key].classList.remove("selected");
      }
      selectedButtons[key] = button;
      button.classList.add("selected");

      let krwSum = 0, usdSum = 0;
      Object.values(selectedButtons).forEach(btn => {
        krwSum += parseInt(btn.dataset.priceKrw||0);
        usdSum += parseFloat(btn.dataset.priceUsd||0);
      });
      totalKRW.textContent = formatKRW(krwSum);
      totalUSD.textContent = usdSum.toFixed(2);
    });
  });

  // 3) 항공편 선택 → 오후 일정 보여주기
  const flightButtons = container.querySelectorAll('.flight-option');
  const extraBlock = container.querySelector("#day1-extra-schedule");
  flightButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      flightButtons.forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
      if (btn.dataset.option==="day") {
        extraBlock.style.display="block";
        setTimeout(()=> extraBlock.classList.add("fade-in"),10);
      } else {
        extraBlock.classList.remove("fade-in");
        setTimeout(()=> extraBlock.style.display="none",300);
      }
    });
  });

});
