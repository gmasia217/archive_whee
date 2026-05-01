import { renderScon1 } from '../Theaters/scon_1.js';
import { renderYeonkang } from '../Theaters/yeonkang.js'; 
import { renderYes24_3 } from '../Theaters/yes24stage_3.js';

export async function openPastShow(jsonUrl, showTitle) {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();
    document.getElementById('ps-title').innerText = showTitle;

    const actorCounts = {};
    const seatCounts = {};

    data.sessions.forEach(s => {
      if(s.cast) {
        s.cast.split(',').map(a => a.trim()).forEach(actor => {
          actorCounts[actor] = (actorCounts[actor] || 0) + 1;
        });
      }
      if(s.seat) {
        seatCounts[s.seat] = (seatCounts[s.seat] || 0) + 1;
      }
    });

    const sortedActors = Object.keys(actorCounts).map(a => ({ actor: a, count: actorCounts[a] })).sort((a, b) => b.count - a.count);
    const actHtml = `<thead><tr><th>배우</th><th>관람 횟수</th></tr></thead><tbody>` + 
      sortedActors.map(a => `<tr><td style="font-weight:600;">${a.actor}</td><td style="color:var(--accent); font-weight:700;">${a.count}회</td></tr>`).join('') + `</tbody>`;
    document.getElementById('ps-actor-table').innerHTML = actHtml;

    const sessHtml = `<thead><tr><th>날짜</th><th>시간</th><th>캐스트</th><th>좌석</th></tr></thead><tbody>` + 
      data.sessions.map(s => `<tr><td>${s.date}</td><td>${s.time}</td><td style="font-weight:600;">${s.cast}</td><td style="font-size:12px;">${s.seat}</td></tr>`).join('') + `</tbody>`;
    document.getElementById('ps-session-table').innerHTML = sessHtml;

    // 극장명에 맞춰 시각적 히트맵 분기 처리
    let heatmapHtml = `<div style="padding:20px; text-align:center; color:var(--txt-sub);">히트맵 데이터가 없습니다.</div>`;
    if (data.theater === "scon_1") {
      heatmapHtml = renderScon1(seatCounts);
    } else if (data.theater === "yeonkang") {
      heatmapHtml = renderYeonkang(seatCounts);
    } else if (data.theater === "yes24stage_3") {
      heatmapHtml = renderYes24_3(seatCounts);
    }

    const seatContainer = document.getElementById('ps-seat-table');
    seatContainer.innerHTML = heatmapHtml;

    document.getElementById('modal-past-show').classList.add('show');
  } catch (error) {
    console.error(error);
    alert("데이터를 불러오지 못했습니다. 경로를 확인해주세요.");
  }
}
