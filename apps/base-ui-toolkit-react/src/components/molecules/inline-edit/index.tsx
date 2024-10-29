import { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'

import {
    InputText,
    InputTextProps,
} from '@/components/atoms/inputs/input-text'

type InlineEditProps = {
    onCancel?: () => void
    onConfirm?: (value: string) => void
} & InputTextProps

export const InlineEdit = (props: InlineEditProps) => {
    const { onCancel, onConfirm, ...restProps } = props
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState('')
    const [originalValue, setOriginalValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [editing])

    const handleClickEditing = () => {
        setEditing(!editing)
        if (!editing) {
            setOriginalValue(value)
        }
    }

    const handleCancel = () => {
        setEditing(false)
        setValue(originalValue)
        if (onCancel) {
            onCancel()
        }
    }

    const handleConfirm = () => {
        const inputValue = inputRef?.current?.value ?? ''
        setValue(inputValue)
        if (onConfirm) {
            onConfirm(inputValue)
        }
        setEditing(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target as Node) &&
            !target.closest('.inline-edit-buttons')
        ) {
            handleConfirm()
        }
    }

    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            handleConfirm()
        }
    }

    useEffect(() => {
        if (editing) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
            )
        }
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
            )
        }
    }, [editing])

    if (!editing) {
        return (
            <div
                aria-hidden="true"
                className="hover:bg-gray-300 w-fit p-3"
                onClick={handleClickEditing}
            >
                {value || 'click here to edit'}
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <InputText
                onKeyPress={handleKeyPress}
                defaultValue={value}
                autoFocus
                {...restProps}
                ref={inputRef}
            />
            <div className="flex row gap-2 justify-end mt-3 inline-edit-buttons">
                <button
                    className="rounded border p-2"
                    data-testid="confirm"
                    onClick={handleConfirm}
                >
                    <MdEdit
                        className="text-gray-500 hover:text-gray-700"
                        size={15}
                    />
                </button>
                <button
                    data-testid="cancel"
                    className="rounded border p-2"
                    onClick={handleCancel}
                >
                    <IoMdClose
                        className="text-gray-500 hover:text-gray-700"
                        size={17}
                    />
                </button>
            </div>
        </div>
    )
}

export default InlineEdit
