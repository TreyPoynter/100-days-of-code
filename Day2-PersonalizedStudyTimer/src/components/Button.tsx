import React from "react"

interface ButtonProps {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({text, onClick} : ButtonProps) {

  return(
    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-3xl rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={onClick}>
      {text}
    </button>
  )
}