interface SectionHeaderProps {
  title: string;
  timePeriod?: string;
  className?: string;
}

export default function SectionHeader({ 
  title, 
  timePeriod, 
  className = "text-xl font-semibold text-gray-900 mb-4" 
}: SectionHeaderProps) {
  const displayTitle = timePeriod ? `${title} (${timePeriod})` : title;
  
  return (
    <h3 className={className}>
      {displayTitle}
    </h3>
  );
}