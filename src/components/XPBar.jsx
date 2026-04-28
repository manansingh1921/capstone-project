export default function XPBar({ xp }) {
  const percent = xp % 100;
  return (
    <div className="xp-bar">
      <div className="xp-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
