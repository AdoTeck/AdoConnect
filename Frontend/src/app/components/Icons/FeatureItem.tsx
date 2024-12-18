export function FeatureItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center justify-center space-x-3 text-white animate-in">
      <Icon className="w-8 h-8" />
      <span className="text-lg font-medium">{text}</span>
    </div>
  );
}
