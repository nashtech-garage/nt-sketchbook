/**
 * Placement options for positioning elements relative to a trigger
 */
export type Placement = 'top' | 'bottom' | 'left' | 'right'

/**
 * Result of positioning calculation
 */
export interface PositionResult {
    top: number
    left: number
}

/**
 * Utility function to position an element relative to a trigger element
 * @param trigger - The element to position relative to
 * @param element - The element to position
 * @param placement - Where to place the element relative to the trigger
 * @param offset - Distance from the trigger (default: 8)
 * @returns Position coordinates
 */
export function positionElement(
    trigger: HTMLElement,
    element: HTMLElement,
    placement: Placement,
    offset: number = 8
): PositionResult {
    const triggerRect = trigger.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()
    const scrollTop = window.scrollY
    const scrollLeft = window.scrollX

    let top = 0
    let left = 0

    switch (placement) {
        case 'top':
            top = triggerRect.top + scrollTop - elementRect.height - offset
            left =
                triggerRect.left +
                scrollLeft +
                triggerRect.width / 2 -
                elementRect.width / 2
            break
        case 'bottom':
            top = triggerRect.bottom + scrollTop + offset
            left =
                triggerRect.left +
                scrollLeft +
                triggerRect.width / 2 -
                elementRect.width / 2
            break
        case 'left':
            top =
                triggerRect.top +
                scrollTop +
                triggerRect.height / 2 -
                elementRect.height / 2
            left = triggerRect.left + scrollLeft - elementRect.width - offset
            break
        case 'right':
            top =
                triggerRect.top +
                scrollTop +
                triggerRect.height / 2 -
                elementRect.height / 2
            left = triggerRect.right + scrollLeft + offset
            break
    }

    return { top, left }
}

/**
 * Apply position to an element's style
 * @param element - The element to position
 * @param position - The position coordinates
 */
export function applyPosition(
    element: HTMLElement,
    position: PositionResult
): void {
    element.style.top = `${position.top}px`
    element.style.left = `${position.left}px`
}
