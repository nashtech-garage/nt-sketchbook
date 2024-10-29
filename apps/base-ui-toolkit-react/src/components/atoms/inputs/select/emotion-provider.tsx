import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import React from 'react'

type EmotionProviderProps = {
    children: React.ReactNode
}

export const EmotionProvider = ({
    children,
}: EmotionProviderProps) => {
    const cache = React.useMemo(
        () =>
            createCache({
                key: 'with-tailwind',
                insertionPoint: document.querySelector('title')!,
            }),
        [],
    )

    return <CacheProvider value={cache}>{children}</CacheProvider>
}

export default EmotionProvider

export type { EmotionProviderProps }
