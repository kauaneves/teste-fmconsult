import Link from "next/link"
import { ButtonHTMLAttributes, ClassAttributes } from "react"

type Props = JSX.IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string
}

export default function Button(props: Props) {
  return (
    <Link href={'/portal'}>
      <button {...props} className="bg-green-500 p-2 w-full text-white font-bold transition-colors hover:bg-green-700">{props.title}</button>
    </Link>
  )
}