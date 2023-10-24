export default function Theme() {
  return (
    <div className="text-white">
      <div className="p-4 text-xl w-1/2 bg-primary">primary</div>
      <div className="p-4 text-xl w-1/2 bg-secondary">secondary</div>
      <div className="p-4 text-xl w-1/2 bg-accent">accent</div>
      <div className="p-4 text-xl w-1/2 bg-neutral">neutral</div>
      <div className="p-4 text-xl w-1/2 bg-base-100 text-neutral">base</div>
      <div className="p-4 text-xl w-1/2 bg-info">info</div>
      <div className="p-4 text-xl w-1/2 bg-success">success</div>
      <div className="p-4 text-xl w-1/2 bg-warning">warning</div>
      <div className="p-4 text-xl w-1/2 bg-error">error</div>
    </div>
  );
}
