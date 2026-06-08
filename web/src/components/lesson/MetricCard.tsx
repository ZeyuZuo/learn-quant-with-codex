type MetricCardProps = {
  label: string;
  value: string;
  note: string;
};

export function MetricCard({ label, value, note }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-2 text-2xl font-bold text-ink">{value}</div>
      <p className="mt-1 text-xs leading-5 text-muted">{note}</p>
    </div>
  );
}
