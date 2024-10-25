const environment = import.meta.env.VITE_ENV || 'storybook'

export const isLocalEnvironment = () => environment === 'local'

export const isStagingEnvironment = () => environment === 'staging'

export const isStorybookEnvironment = () =>
  environment === 'storybook'
