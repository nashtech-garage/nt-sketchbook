export type InputMessageProps = {
    hasError?: boolean
    message?: string
}

export const InputMessage = ({
    message,
    hasError
}: InputMessageProps) => {
    if (!message && !hasError) return null

    const inputMessageClassName = hasError
        ? 'nt-input-error'
        : 'nt-input-highlight'

    return <span className={inputMessageClassName}>{message}</span>
}
