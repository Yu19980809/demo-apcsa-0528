import { Link } from 'react-router-dom'

type Props = {
  item: {
    label: string
    description: string
    href: string
    image: string
  }
}

const CardPage = ({ item }: Props) => {
  return (
    <Link
      to={item.href}
      className="flex justify-center items-center min-w-[300px] max-w-[450px] h-[150px] rounded-md border cursor-pointer hover:bg-secondary"
    >
      {item.label}
    </Link>
  )
}

export default CardPage
