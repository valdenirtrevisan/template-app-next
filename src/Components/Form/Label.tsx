export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="text-sm flex items-center justify-between" {...props} />
  );
}
