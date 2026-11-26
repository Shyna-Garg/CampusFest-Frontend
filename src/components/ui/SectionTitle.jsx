function SectionTitle({
  title,
  subtitle,
  center = false,
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-4xl font-bold text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-slate-600 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;