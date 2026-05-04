import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { meals } from "../data/mockData";
import { grocery as initialGrocery } from "../data/mockData";

export default function ManagerPortal() {
  const [tab, setTab] = useState("votes");
  const [grocery, setGrocery] = useState(JSON.parse(JSON.stringify(initialGrocery)));
  const [saved, setSaved] = useState(false);
  const [announced, setAnnounced] = useState(false);
  const navigate = useNavigate();

  function updateQty(i, val) {
    const updated = [...grocery];
    updated[i].qty = parseInt(val) || 0;
    setGrocery(updated);
  }

  function getStatus(item) {
    if (item.qty === 0) return { label: "Out of stock", cls: "tag-red" };
    if (item.qty < item.threshold) return { label: "Low", cls: "tag-amber" };
    return { label: "Good", cls: "tag-green" };
  }

  function getWinner(meal) {
    const available = meal.options.filter(o => o.available);
    if (!available.length) return null;
    return available.reduce((a, b) => (a.votes >= b.votes ? a : b));
  }

  const outCount = grocery.filter(g => g.qty === 0).length;
  const totalVoters = 142;

  return (
    <div className="page-wrap">
      <div className="header">
        <p className="logo"><span>Mess</span>Admin</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="tag tag-purple">Manager</span>
          <button className="btn btn-sm" onClick={() => navigate("/")}>Sign out</button>
        </div>
      </div>

      <div className="tab-bar">
        {["votes", "stock", "menu"].map(t => (
          <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t === "votes" ? "Vote Results" : t === "stock" ? "Stock Manager" : "Set Menu"}
          </button>
        ))}
      </div>

      {tab === "votes" && (
        <>
          <div className="grid-3">
            <div className="metric-card"><p className="metric-label">Total voters</p><p className="metric-value">{totalVoters}</p></div>
            <div className="metric-card"><p className="metric-label">Items unavailable</p><p className="metric-value">{outCount}</p></div>
            <div className="metric-card"><p className="metric-label">Voting closes</p><p className="metric-value" style={{ fontSize: 16 }}>9:00 PM</p></div>
          </div>
          {meals.map(meal => {
            const maxVotes = Math.max(...meal.options.map(o => o.votes));
            const winner = getWinner(meal);
            return (
              <div className="card" key={meal.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <p className="meal-title">{meal.label}</p>
                  {winner && <span className="tag tag-green">Winner: {winner.name}</span>}
                </div>
                {meal.options.map(opt => {
                  const pct = maxVotes > 0 ? Math.round((opt.votes / maxVotes) * 100) : 0;
                  const predicted = Math.round(opt.votes * 1.3);
                  const isWinner = winner && winner.id === opt.id;
                  return (
                    <div className={`food-option ${!opt.available ? "food-unavailable" : ""} ${isWinner ? "winner-row" : ""}`} key={opt.id}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <p className="food-name">{opt.name}</p>
                          {!opt.available && <span className="tag tag-red">Unavailable</span>}
                          {isWinner && <span className="tag tag-green">Selected ✓</span>}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
                          <div className="vote-bar-wrap" style={{ width: 120 }}>
                            <div className="vote-bar" style={{ width: `${pct}%`, background: isWinner ? "#1D9E75" : "#aaa" }} />
                          </div>
                          <span className="sub-text">{opt.votes} votes</span>
                          <span className="predicted">· Predicted: {predicted} servings</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}

      {tab === "stock" && (
        <div className="card">
          <p className="meal-title" style={{ marginBottom: 16 }}>Kitchen inventory</p>
          {grocery.map((item, i) => {
            const s = getStatus(item);
            return (
              <div className="stock-row" key={i}>
                <span className="stock-name">{item.name}</span>
                <input className="stock-qty" type="number" min="0" value={item.qty}
                  onChange={e => updateQty(i, e.target.value)} />
                <span className={`tag ${s.cls}`}>{s.label}</span>
              </div>
            );
          })}
          <button className={`btn btn-sm ${saved ? "btn-voted" : "btn-primary"}`}
            style={{ marginTop: 16 }}
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
            {saved ? "Saved ✓" : "Save changes"}
          </button>
        </div>
      )}

      {tab === "menu" && (
        <div className="card">
          <p className="meal-title" style={{ marginBottom: 4 }}>Announce tomorrow's menu</p>
          <p className="sub-text" style={{ marginBottom: 16 }}>Winners are auto-selected. You can override before announcing.</p>
          {meals.map(meal => {
            const winner = getWinner(meal);
            const available = meal.options.filter(o => o.available);
            return (
              <div key={meal.id} style={{ marginBottom: 14 }}>
                <p className="sub-text" style={{ marginBottom: 6, fontWeight: 600 }}>{meal.label}</p>
                <select className="input-field" defaultValue={winner ? winner.name : ""}>
                  {available.map(o => (
                    <option key={o.id} value={o.name}>{o.name} ({o.votes} votes)</option>
                  ))}
                </select>
              </div>
            );
          })}
          <button className={`btn ${announced ? "btn-voted" : "btn-primary"}`}
            onClick={() => { setAnnounced(true); setTimeout(() => setAnnounced(false), 2000); }}>
            {announced ? "Announced to students ✓" : "Announce to students"}
          </button>
        </div>
      )}
    </div>
  );
}