import { cn } from '@headless-ui/lib/utils'
import { X } from 'lucide-react'

import { Badge } from '../../badge/badge'

export type SelectedBadgeProps = {
    option: { value: string; label: string }
    handleUnselect: (option: { value: string; label: string }) => void
    disable?: boolean
}

export const SelectedBadge: React.FC<SelectedBadgeProps> = ({
    option,
    handleUnselect,
    disable = false,
}) => {
    return (
        <Badge
            key={option.value}
            variant="secondary"
            className={cn('mr-2 py-1', {
                'bg-shade-neutral-9 border !border-shade-neutral-10 !cursor-not-allowed text-shade-neutral-70':
                    disable,
            })}
        >
            {option.label}
            <button
                disabled={disable}
                className="ml-1 rounded-full outline-none ring-offset-background disabled:cursor-not-allowed"
                data-testid={`remove-${option.value}`}
                onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
                onClick={() => handleUnselect(option)}
            >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
        </Badge>
    )
}
