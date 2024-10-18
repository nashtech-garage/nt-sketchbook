import { combineClasses } from '@/utils/tailwind'

type CardProps = {
  title: string
  content: string
  imgLink?: string
  className?: string
}

export const Card = (props: CardProps) => {
  const { title, content, imgLink, className } = props
  return (
    <div
      className={combineClasses(
        'w-72 border border-solid border-inherit shadow-lg shadow-gray-500/50 rounded-md',
        className,
      )}
    >
      <img className="w-full border border-solid mb-2 rounded-md" src={imgLink} alt="" />
      <p className="text-lg font-semibold px-3 mb-2">{title}</p>
      <p className="text-sm px-3 pb-3">{content}</p>
    </div>
  )
}
