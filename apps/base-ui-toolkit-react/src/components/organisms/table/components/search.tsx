import { InputText } from '@/components/atoms'

type SearchProps = {
  isLoading?: boolean
}

const Search = (props: SearchProps) => {
  const { isLoading } = props
  return (
    <div className="py-5">
      {isLoading && (
        <div className="w-full py-3">
          <div className="relative animate-pulse flex items-center justify-between">
            <div className="h-10 w-full bg-gray-200 rounded" />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="w-full">
          <div className="relative rounded-md">
            <InputText className="bg-white" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
