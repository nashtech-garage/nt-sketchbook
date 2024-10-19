import * as DocBlock from '@storybook/blocks'

export const objectValuesToControls = (obj: Record<string, string>, control = 'select') => ({
  control,
  options: Object.keys(obj),
})

export const DocumentDefault = () => (
  <>
    <DocBlock.Title />
    <DocBlock.Description />
    <DocBlock.Primary />
    <DocBlock.Controls />
    <DocBlock.Stories />
  </>
)
