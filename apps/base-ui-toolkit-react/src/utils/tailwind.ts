import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const combineClasses = (...classes: ClassValue[]) =>
  twMerge(clsx(classes))
