export function renderYes24_3(seatCounts) {
  const layout = [
    {
      floor: "1층",
      zones: [
        {
          id: "Left", renderType: "fixed-grid", start: 1, end: 4,
          rows: [
            { r: 1, s: [1,2,3,4] }, { r: 2, s: [1,2,3,4] }, { r: 3, s: [1,2,3,4] }, { r: 4, s: [1,2,3,4] },
            { r: 5, s: [3,4] },     { r: 6, s: [2,3,4] },
            { r: 7, s: [1,2,3,4] }, { r: 8, s: [1,2,3,4] }, { r: 9, s: [1,2,3,4] }, { r: 10, s: [1,2,3,4] },
            { r: 11, s: [1,2,3,4] }, { r: 12, s: [1,2,3,4] }, { r: 13, s: [1,2,3,4] }, { r: 14, s: [1,2,3] }
          ]
        },
        {
          id: "Center", renderType: "fixed-grid", start: 5, end: 15,
          rows: [
            { r: 1, s: [5,6,7,8,9,10,11,12,13,14,15] }, { r: 2, s: [5,6,7,8,9,10,11,12,13,14] },
            { r: 3, s: [5,6,7,8,9,10,11,12,13,14,15] }, { r: 4, s: [5,6,7,8,9,10,11,12,13,14] },
            { r: 5, s: [5,6,7,8,9,10,11,12,13,14,15] }, { r: 6, s: [5,6,7,8,9,10,11,12,13,14] },
            { r: 7, s: [5,6,7,8,9,10,11,12,13,14,15] }, { r: 8, s: [5,6,7,8,9,10,11,12,13,14,15] },
            { r: 9, s: [5,6,7,8,9,10,11,12,13,14,15] }, { r: 10, s: [5,6,7,8,9,10,11,12,13,14,15] },
            { r: 11, s: [5,6,7,8,9,10,11,12,13,14,15] }, { r: 12, s: [5,6,7,8,9,10,11,12,13,14,15] },
            { r: 13, s: [6,7,8,9,10,11,12,13,14,15] },  { r: 14, s: [8,9,10,11,12,13,14,15] }
          ]
        },
        {
          id: "Right", renderType: "flex-start",
          rows: [
            { r: 1, s: [16,17,18,19] }, { r: 2, s: [15,16,17,18] }, { r: 3, s: [16,17,18,19] }, { r: 4, s: [15,16,17,18] },
            { r: 5, s: [16,17,18,19] }, { r: 6, s: [15,16,17,18] }, { r: 7, s: [16,17,18,19] }, { r: 8, s: [16,17,18,19] },
            { r: 9, s: [16,17,18,19] }, { r: 10, s: [16,17,18,19] }, { r: 11, s: [16,17,18,19] }, { r: 12, s: [16,17,18,19] },
            { r: 13, s: [16,17,18,19] }, { r: 14, s: [16,17,18,19] }
          ]
        }
      ]
    }
  ];

  let html = `<div style="display:flex; flex-direction:column; gap:40px; align-items:center; overflow-x:auto; padding: 20px 0;">`;
  layout.forEach(floorInfo => {
    html += `<div style="text-align:center;"><div style="font-weight:700; margin-bottom:16px; font-size:16px; color:var(--txt);">${floorInfo.floor}</div><div style="display:flex; gap:24px; align-items:flex-end;">`; 
    floorInfo.zones.forEach((zone, zIdx) => {
      html += `<div style="display:flex; flex-direction:column; align-items:flex-start;">`;
      zone.rows.forEach(row => {
        html += `<div style="display:flex; gap:3px; margin-bottom:3px; align-items:center; height:16px;">`;
        if (zIdx === 0) html += `<div style="font-size:9px; font-weight:600; color:var(--txt-dim); width:14px; text-align:right; margin-right:4px;">${row.r}</div>`;
        
        const renderSeat = (r, num) => {
          const seatKey = `${floorInfo.floor} ${r}열 ${num}번`;
          const count = seatCounts[seatKey] || 0;
          let bgColor = "#f1f5f9"; let textColor = "#cbd5e1"; let borderStr = "1px solid #e2e8f0";
          if (count >= 4) { bgColor = "#38bdf8"; textColor = "#fff"; borderStr = "none"; }
          else if (count === 3) { bgColor = "#7dd3fc"; textColor = "#075985"; borderStr = "none"; }
          else if (count === 2) { bgColor = "#bae6fd"; textColor = "#0369a1"; borderStr = "none"; }
          else if (count === 1) { bgColor = "#e0f2fe"; textColor = "#0284c7"; borderStr = "1px solid #bae6fd"; }
          return `<div style="width:16px; height:16px; border-radius:4px; background:${bgColor}; ${borderStr}; display:flex; justify-content:center; align-items:center; font-size:8px; font-weight:700; color:${textColor}; cursor:pointer; transition:0.2s;" title="${seatKey} (${count}회)" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">${num}</div>`;
        };

        if (zone.renderType === "fixed-grid") {
          for (let i = zone.start; i <= zone.end; i++) {
            if (row.s.includes(i)) html += renderSeat(row.r, i);
            else html += `<div style="width:16px; height:16px;"></div>`;
          }
        } else {
          row.s.forEach(num => { html += renderSeat(row.r, num); });
        }
        if (zIdx === floorInfo.zones.length - 1) html += `<div style="font-size:9px; font-weight:600; color:var(--txt-dim); width:14px; text-align:left; margin-left:4px;">${row.r}</div>`;
        html += `</div>`;
      });
      html += `</div>`;
    });
    html += `</div></div>`;
  });
  html += `</div>
  <div style="display:flex; gap:12px; justify-content:center; margin-top:-10px; font-size:11px; color:var(--txt-sub);">
    <div style="display:flex; align-items:center; gap:4px;"><div style="width:12px;height:12px;background:#f1f5f9;border-radius:2px;"></div>0회</div>
    <div style="display:flex; align-items:center; gap:4px;"><div style="width:12px;height:12px;background:#e0f2fe;border-radius:2px;"></div>1회</div>
    <div style="display:flex; align-items:center; gap:4px;"><div style="width:12px;height:12px;background:#bae6fd;border-radius:2px;"></div>2회</div>
    <div style="display:flex; align-items:center; gap:4px;"><div style="width:12px;height:12px;background:#7dd3fc;border-radius:2px;"></div>3회</div>
    <div style="display:flex; align-items:center; gap:4px;"><div style="width:12px;height:12px;background:#38bdf8;border-radius:2px;"></div>4회+</div>
  </div>`;
  return html;
}
