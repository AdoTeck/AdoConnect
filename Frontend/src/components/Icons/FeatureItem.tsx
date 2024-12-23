export function FeatureItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="animate-in flex items-center justify-center space-x-3 text-white">
      <Icon className="size-8" />
      <span className="text-lg font-medium">{text}</span>
    </div>
  );
}
