import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { meals as initialMeals } from "../data/mockData";

export default function StudentPortal() {
  const [meals, setMeals] = useState(JSON.parse(JSON.stringify(initialMeals)));
  const [votes, setVotes] = useState({ bf: null, ln: null, dn: null });
  const navigate = useNavigate();

  function castVote(mealId, optId) {
    if (votes[mealId]) return;
    setVotes(v => ({ ...v, [mealId]: optId }));
    setMeals(prev => prev.map(meal =>
      meal.id === mealId
        ? { ...meal, options: meal.options.map(o => o.id === optId ? { ...o, votes: o.votes + 1 } : o) }
        : meal
    ));
  }

  return (
    <div className="page-wrap">
      <div className="header">
        <p className="logo"><span>Mess</span>Vote</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="tag tag-green">Student</span>
          <button className="btn btn-sm" onClick={() => navigate("/")}>Sign out</button>
        </div>
      </div>

      <div className="notif">⏰ Voting closes at <strong>9 PM today</strong>. Tomorrow's menu will be announced after votes are counted.</div>

      <div style={{ marginBottom: "1.5rem" }}>
        <p className="section-title">Tomorrow's confirmed menu</p>
        <div className="card" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div><p className="sub-text">Breakfast</p><p className="meal-title" style={{ fontSize: 14 }}>Idli + Sambar</p></div>
          <div style={{ borderLeft: "1px solid #eee", paddingLeft: 20 }}><p className="sub-text">Lunch</p><p className="meal-title" style={{ fontSize: 14 }}>Rice + Dal Tadka</p></div>
          <div style={{ borderLeft: "1px solid #eee", paddingLeft: 20 }}><p className="sub-text">Dinner</p><p className="meal-title" style={{ fontSize: 14 }}>Voting in progress...</p></div>
        </div>
      </div>

      <p className="section-title">Vote for tomorrow's meals</p>

      {meals.map(meal => {
        const maxVotes = Math.max(...meal.options.map(o => o.votes));
        const hasVoted = votes[meal.id];
        return (
          <div className="card" key={meal.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <p className="meal-title">{meal.label}</p>
                <p className="sub-text">{meal.time}</p>
              </div>
              {hasVoted ? <span className="tag tag-green">Voted ✓</span> : <span className="sub-text">Pick one</span>}
            </div>

            {meal.options.map(opt => {
              const pct = maxVotes > 0 ? Math.round((opt.votes / maxVotes) * 100) : 0;
              const servings = Math.floor(opt.stock / 1.5);
              const isVoted = votes[meal.id] === opt.id;
              const isDisabled = hasVoted && !isVoted;
              return (
                <div className={`food-option ${!opt.available ? "food-unavailable" : ""}`} key={opt.id}>
                  <div>
                    <p className="food-name">{opt.name}</p>
                    <p className="food-stock">
                      {opt.available ? `${servings} servings remaining` : "Out of stock — unavailable"}
                    </p>
                    {opt.available && (
                      <div className="vote-bar-wrap">
                        <div className="vote-bar" style={{ width: `${pct}%` }} />
                      </div>
                    )}
                  </div>
                  {opt.available ? (
                    <button
                      className={`btn btn-sm ${isVoted ? "btn-voted" : ""}`}
                      onClick={() => castVote(meal.id, opt.id)}
                      disabled={isDisabled}
                      style={{ opacity: isDisabled ? 0.35 : 1 }}
                    >
                      {isVoted ? "Voted ✓" : "Vote"}
                    </button>
                  ) : (
                    <span className="tag tag-red">N/A</span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}