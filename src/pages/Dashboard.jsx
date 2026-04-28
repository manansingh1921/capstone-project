import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import XPBar from "../components/XPBar";
import GraphView from "../components/GraphView";
import { addTask, toggleTask } from "../features/taskSlice";
import { playSound } from "../utils/sound";

export default function Dashboard() {
  const state = useSelector(s => s.tasks || {});
  const dispatch = useDispatch();

  const xp = state?.xp || 0;
  const level = state?.level || 1;
  const tasks = state?.tasks || [];

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const activeTasks = tasks.filter(t => !t?.completed).slice(-5).reverse();

  const completed = tasks.filter(t => t?.completed).length;
  const pending = tasks.filter(t => !t?.completed).length;

  const add = () => {
    if (!title) return;

    playSound("punch");

    dispatch(addTask({
      id: Date.now(),
      title,
      xp: 25,
      date,
      time,
      completed: false
    }));

    setTitle("");
    setDate("");
    setTime("");
  };

  return (
    <div className="container">

      <h1 className="title">COMMAND CENTER</h1>

      {/* TASK INPUT */}
      <div className="task-input">

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="ENTER MISSION..."
        />

        <div className="actions-row">
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
          <button onClick={add}>DEPLOY</button>
        </div>

      </div>

      {/* DASHBOARD LAYOUT */}
      <div className="dashboard-layout">

        <div className="left-panel">

          <div className="grid">
            <div className="card">XP<br />{xp}</div>
            <div className="card">LVL<br />{level}</div>
            <div className="card">ACTIVE<br />{pending}</div>
            <div className="card">DONE<br />{completed}</div>
          </div>

          <XPBar xp={xp} />

          {/* ACTIVE TASKS ONLY */}
          <div className="card" style={{ textAlign: "left" }}>
            <h3 style={{ fontSize: "10px" }}>ACTIVE MISSIONS</h3>

            {activeTasks.length === 0 && (
              <p style={{ fontSize: "10px", opacity: 0.6 }}>
                ALL MISSIONS COMPLETE
              </p>
            )}

            {activeTasks.map(t => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  marginTop: "6px"
                }}
              >
                <span>{t.title}</span>

                <button
                  onClick={() => {
                    playSound("punch");
                    dispatch(toggleTask(t.id));
                  }}
                >
                  DONE
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* GRAPH */}
        <div className="right-panel">
          <GraphView tasks={tasks} />
        </div>

      </div>
    </div>
  );
}
