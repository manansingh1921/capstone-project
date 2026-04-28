import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteTask, toggleTask } from "../features/taskSlice";
import { playSound } from "../utils/sound";

export default function Tasks() {
  const tasks = useSelector(s => s.tasks?.tasks || []);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("all");

  const filtered = tasks.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="container">

      <h1 className="title">MISSION ARCHIVE</h1>

      {/* FILTER */}
      <div className="filter-bar">
        <button onClick={() => setFilter("all")}>ALL</button>
        <button onClick={() => setFilter("pending")}>ACTIVE</button>
        <button onClick={() => setFilter("completed")}>DONE</button>
      </div>

      {/* TASK LIST */}
      {filtered.map(t => (
        <div key={t.id} className="task-card">

          <div>
            <h3 style={{ fontSize: "10px" }}>
              {t.title}
            </h3>

            <p style={{ fontSize: "8px", opacity: 0.7 }}>
              {t.date} {t.time}
            </p>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>

            {/* ✅ MAIN CHANGE HERE */}
            <button
              onClick={() => {
                playSound("punch");

                dispatch(toggleTask(t.id));
              }}
            >
              {t.completed ? "UNDO" : "DONE"}
            </button>

            <button
              onClick={() => {
                playSound("click");
                dispatch(deleteTask(t.id));
              }}
            >
              DELETE
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}
