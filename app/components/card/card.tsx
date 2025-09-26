export const Card = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  return (
    <div
      className={`flex flex-col h-full bg-white rounded-lg overflow-hidden border-2 border-[#DFDFDF] ${className}`}
      {...props}>
      {children}
    </div>
  )
}

Card.Header = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => <div className={`p-6 pb-0 ${className}`}>{children}</div>

Card.Content = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => <div className={`p-6 ${className}`}>{children}</div>

Card.Footer = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => <div className={`p-6 pt-0 mt-auto ${className}`}>{children}</div>

Card.Image = ({
  src,
  alt,
  className = "",
}: {
  src: string
  alt: string
  className?: string
}) => (
  <div className="relative">
    <img
      src={src}
      alt={alt}
      className={`w-full h-64 object-cover ${className}`}
    />
  </div>
)
