export function renderScon1(seatCounts) {
  const layout = [
    {
      floor: "1층",
      zones: [
        { id: "A", rows: [
          { r: 1, s: [5,6] }, { r: 2, s: [5,6] }, { r: 3, s: [5,6] }, { r: 4, s: [5,6] }, { r: 5, s: [5,6] },
          { r: 6, s: [2,3,4,5,6] }, { r: 7, s: [2,3,4,5,6] }, { r: 8, s: [2,3,4,5,6] }, { r: 9, s: [2,3,4,5,6] },
          { r: 10, s: [2,3,4,5,6] }, { r: 11, s: [2,3,4,5,6] }, { r: 12, s: [2,3,4,5,6] }, { r: 13, s: [2,3,4,5,6] }
        ]},
        { id: "B", rows: [
          { r: 0, s: [1,2,3,4,5,6,7,8,9,10,11] },
          ...Array.from({length: 13}, (_, i) => ({ r: i+1, s: [1,2,3,4,5,6,7,8,9,10,11,12] }))
        ]},
        { id: "C", rows: [
          ...Array.from({length: 14}, (_, i) => ({ r: i, s: [4,5,6,7,8] }))
        ]}
      ]
    },
    {
      floor: "2층",
      zones: [
        { id: "A", rows: [ { r: 15, s: [1,2,3,4,5,6] }, { r: 16, s: [2,3,4,5,6] }, { r: 17, s: [2,3,4,5,6] } ]},
        { id: "B", rows: [ ...Array.from({length: 4}, (_, i) => ({ r: i+14, s: [1,2,3,4,5,6,7,8,9,10,11,12] })) ]},
        { id: "C", rows: [ { r: 15, s: [4,5,6,7,8,9] }, { r: 16, s: [4,5,6,7,8] }, { r: 17, s: [4,5,6,7,8] } ]}
      ]
    }
  ];

  let html = `<div style="display:flex; flex-direction:column; gap:40px; align-items:center; overflow-x:auto; padding: 20px 0;">`;
  layout.forEach(floorInfo => {
    html += `<div style="text-align:center;"><div style="font-weight:700; margin-bottom:16px; font-size:16px; color:var(--txt);">${floorInfo.floor}</div><div style="display:flex; gap:24px; align-items:flex-end;">`; 
    floorInfo.zones.forEach(zone => {
      html += `<div style="display:flex; flex-direction:column; align-items:center;"><div style="font-size:14px; font-weight:700; margin-bottom:12px; color:var(--txt-sub);">${zone.id}</div>`;
      zone.rows.forEach(row => {
        html += `<div style="display:flex; gap:3px; margin-bottom:3px; justify-content:center; align-items:center; width:100%;">`;
        html += `<div style="font-size:9px; font-weight:600; color:var(--txt-dim); width:14px; text-align:right; margin-right:4px;">${row.r}</div>`;
        row.s.forEach(num => {
          const seatKey = `${floorInfo.floor} ${zone.id}구역 ${row.r}열 ${num}번`;
          const count = seatCounts[seatKey] || 0;
          let bgColor = "#f1f5f9"; let textColor = "#cbd5e1"; let borderStr = "1px solid #e2e8f0";
          if (count >= 4) { bgColor = "#38bdf8"; textColor = "#fff"; borderStr = "none"; }
          else if (count === 3) { bgColor = "#7dd3fc"; textColor = "#075985"; borderStr = "none"; }
          else if (count === 2) { bgColor = "#bae6fd"; textColor = "#0369a1"; borderStr = "none"; }
          else if (count === 1) { bgColor = "#e0f2fe"; textColor = "#0284c7"; borderStr = "1px solid #bae6fd"; }
          html += `<div style="width:16px; height:16px; border-radius:4px; background:${bgColor}; ${borderStr}; display:flex; justify-content:center; align-items:center; font-size:8px; font-weight:700; color:${textColor}; cursor:pointer; transition:0.2s;" title="${seatKey} (${count}회)" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">${num}</div>`;
        });
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
