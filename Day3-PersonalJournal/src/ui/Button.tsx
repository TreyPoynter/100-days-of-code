import './styles/button.css'

interface ButtonProps {
  text: string,
  onClick: () => unknown
}

export default function Button({text, onClick}: ButtonProps) {
  return (
    <button className='button' onClick={onClick}>
      {text}
    </button>
  )
}