import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'


type Props = {
  label: string
  href: string
}

const BackButton = ({ label, href }: Props) => {
  return (
    <Button
      variant="link"
      size="sm"
      asChild
      className="w-full font-normal text-muted-foreground"
    >
      <Link to={href}>
        {label}
      </Link>
    </Button>
  )
}

export default BackButton