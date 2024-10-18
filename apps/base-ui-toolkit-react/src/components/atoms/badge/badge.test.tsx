import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge, ColorVariant } from '.'

const testProviders = [
  [
    {
      variant: 'blue',
      classResult: 'bg-blue-600 ring-blue-500/10',
    },
  ],
  [
    {
      variant: 'red',
      classResult: 'bg-red-600 ring-red-500/10',
    },
  ],
  [
    {
      variant: 'green',
      classResult: 'bg-green-500 ring-green-500/10',
    },
  ],
  [
    {
      variant: 'yellow',
      classResult: 'bg-warning ring-yellow-500/10',
    },
  ],
] as {
  variant: ColorVariant
  classResult: string
}[][]

describe.each(testProviders)(
  'Test render Badge',
  ({ classResult, variant }) => {
    it(`Will render class ${classResult} if variant is ${variant}`, async () => {
      const { container } = render(
        <Badge variant={variant} label="Badge" />,
      )
      expect(
        container.getElementsByClassName(classResult),
      ).toBeTruthy()
    })
  },
)
