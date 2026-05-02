import { renderScon1 } from '../Theaters/scon_1.js';
import { renderYeonkang } from '../Theaters/yeonkang.js'; 
import { renderYes24_3 } from '../Theaters/yes24stage_3.js';

export async function openPastShow(jsonUrl, showTitle) {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();
    document.getElementById('ps-title').innerText = showTitle;

    const seatCounts = {};

    // 1. 배역(Role) 기준 배우 통계 계산 (0회 포함!)
    let actHtml = `<thead><tr><th style="width:30%;">배역</th><th style="width:40%;">배우</th><th style="width:30%;">관람 횟수</th></tr></thead><tbody>`;

    if (data.roles) {
      data.roles.forEach(role => {
        // 배우들을 먼저 0회로 쫙 세팅합니다.
        let roleActors = {};
        if (role.actors) {
          role.actors.forEach(actorName => {
            roleActors[actorName] = 0;
          });
        }

        // 회차 데이터를 돌면서 내가 본 배우만 +1 카운트
        data.sessions.forEach(s => {
          let actor = s[role.id]; 
          if (actor && roleActors[actor] !== undefined) {
            roleActors[actor]++;
          }
        });
        
        // JSON에 적어둔 배우 순서 그대로 배열 만들기
        let sortedRoleActors = role.actors.map(a => ({ actor: a, count: roleActors[a] }));
        
        if (sortedRoleActors.length > 0) {
          sortedRoleActors.forEach((a, idx) => {
            actHtml += `<tr>`;
            if (idx === 0) { // 배역 이름 병합 (rowspan)
              actHtml += `<td rowspan="${sortedRoleActors.length}" style="font-weight:700; background:var(--bg-sec); border-right:1px solid var(--brd); vertical-align:middle;">${role.label}</td>`;
            }
            
            // 0회면 회색, 1회 이상이면 파란색으로 색상 다르게 표시
            const countStyle = a.count > 0 ? 'color:var(--accent); font-weight:700;' : 'color:var(--txt-dim); font-weight:600;';
            
            actHtml += `<td style="font-weight:600;">${a.actor}</td><td style="${countStyle}">${a.count}회</td></tr>`;
          });
        }
      });
    }
    actHtml += `</tbody>`;
    document.getElementById('ps-actor-table').innerHTML = actHtml;

    // 2. 히트맵 & 회차 데이터 처리
    data.sessions.forEach(s => {
      if(s.seat) seatCounts[s.seat] = (seatCounts[s.seat] || 0) + 1;
    });

    const sessHtml = `<thead><tr><th>날짜</th><th>시간</th><th>캐스트</th><th>좌석</th></tr></thead><tbody>` + 
      data.sessions.map(s => {
        // cast1, cast2를 하나로 묶어서 표시 (예: 정휘, 이진우)
        let castStr = data.roles.map(r => s[r.id]).filter(Boolean).join(", ");
        return `<tr><td>${s.date}</td><td>${s.time}</td><td style="font-weight:600;">${castStr}</td><td style="font-size:12px;">${s.seat}</td></tr>`;
      }).join('') + `</tbody>`;
    document.getElementById('ps-session-table').innerHTML = sessHtml;

    // 3. 극장별 시각적 히트맵 렌더링
    let heatmapHtml = `<div style="padding:20px; text-align:center; color:var(--txt-sub);">히트맵 데이터가 없습니다.</div>`;
    if (data.theater === "scon_1") heatmapHtml = renderScon1(seatCounts);
    else if (data.theater === "yeonkang") heatmapHtml = renderYeonkang(seatCounts);
    else if (data.theater === "yes24stage_3") heatmapHtml = renderYes24_3(seatCounts);

    const seatContainer = document.getElementById('ps-seat-table');
    seatContainer.innerHTML = heatmapHtml;

    document.getElementById('modal-past-show').classList.add('show');
  } catch (error) {
    console.error(error);
    alert("데이터를 불러오지 못했습니다. 경로를 확인해주세요.");
  }
}
