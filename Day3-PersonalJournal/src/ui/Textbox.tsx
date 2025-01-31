import './styles/textbox.css'

interface TextBoxProps {
  placeholder?: string
  onChange: (value: unknown | null) => void
  value?: string
  isTextArea?: boolean
}

export default function TextBox({placeholder, onChange, value, isTextArea = false}: TextBoxProps) {
  return(
    <>
    {
      !isTextArea ?
        (<input onChange={(e) => onChange(e.target.value)} className='textbox' placeholder={placeholder}/>) :
        <textarea onChange={(e) => onChange(e.target.value)} className='textarea' placeholder={placeholder}></textarea>
    }
    </>
  )
}