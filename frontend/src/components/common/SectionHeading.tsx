interface SectionHeadingProps {
  tag: string
  title: string
  className?: string
}

export function SectionHeading({ tag, title, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="mb-4 flex items-center gap-4">
        <span className="figma-tag-bar" />
        <span className="figma-section-tag">{tag}</span>
      </div>
      <h2 className="figma-section-title">{title}</h2>
    </div>
  )
}
