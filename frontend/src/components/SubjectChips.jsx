const subjects = [
  "javascript",
  "react",
  "css",
  "web development",
  "python",
  "fiction",
  "history",
  "design",
];

export default function SubjectChips({ activeSubject, onSelect }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-slate-700">
        Explore by subject
      </p>

      <div className="flex flex-wrap gap-3">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => onSelect(subject)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
              activeSubject === subject
                ? "bg-brand-600 text-white shadow-md"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}