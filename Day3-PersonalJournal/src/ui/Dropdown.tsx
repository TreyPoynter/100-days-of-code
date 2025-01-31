import React, { useEffect, SetStateAction } from 'react'
import './styles/dropdown.css'

interface DropdownProps {
  placeholder?: string
  data?: {key: number, value: string}[]
  value: string
  onChange: (value: unknown | null) => void
}

export default function Dropdown({ placeholder, data, onChange }: DropdownProps) {

  return (
    <>
      <select onChange={(e) => onChange(e.target.value)} >
        <option selected hidden value="">{placeholder}</option>
        {
          data?.map((item, index) => {
            return(
              <option key={index} value={item.value.toString()}>{item.value}</option>
            )
          })
        }
      </select>
    </>
  )
}