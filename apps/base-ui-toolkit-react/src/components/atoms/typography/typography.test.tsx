import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TypeVariant, Typography } from '.'

const testProviders = [
    [
        {
            variant: 'secondary',
            classResult: 'text-gray-600',
        },
    ],
    [
        {
            description: '',
            variant: 'success',
            classResult: 'text-green-600',
        },
    ],
    [
        {
            variant: 'warning',
            classResult: 'text-amber-500',
        },
    ],
    [
        {
            variant: 'danger',
            classResult: 'text-red-600',
        },
    ],
] as {
    variant: TypeVariant
    classResult: string
}[][]

describe.each(testProviders)(
    'Test render Typography',
    ({ classResult, variant }) => {
        it(`Will render class ${classResult} if variant is ${variant}`, async () => {
            const { container } = render(
                <Typography variant={variant}>Typography</Typography>,
            )
            expect(
                container.getElementsByClassName(classResult),
            ).toBeTruthy()
        })
    },
)
