import type { ComponentProps } from 'react'
import { forwardRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = ComponentProps<'div'> & {
    container?: HTMLElement | null
    'data-testid'?: string
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
    (
        {
            container = globalThis?.document?.body,
            'data-testid': testId = 'portal',
            ...props
        },
        ref,
    ) => {
        const [mounted, setMounted] = useState(false)

        useEffect(() => {
            setMounted(true)
        }, [])

        return mounted && container
            ? createPortal(
                  <div {...props} ref={ref} data-testid={testId} />,
                  container,
              )
            : null
    },
)

Portal.displayName = 'Portal'

export type { PortalProps }
