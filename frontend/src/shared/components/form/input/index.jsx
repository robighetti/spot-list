import { useRef, useEffect } from 'react'

import { useField } from '@unform/core'

export const Input = ({ name, ...rest }) => {
  const inputRef = useRef(null)

  const { fieldName, registerField, error, defaultValue } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <div>
      <input type="text" ref={inputRef} defaultValue={defaultValue} {...rest} />
    </div>
  )
}
