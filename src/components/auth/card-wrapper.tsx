import BackButton from './back-button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card'

type Props = {
  children: React.ReactNode
  backButtonLabel?: string
  backButtonHref?: string
}

const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonHref,
}: Props) => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-secondary">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <img
            src="/vite.svg"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full"
          />
        </CardHeader>

        <CardContent>{children}</CardContent>

        {backButtonHref && backButtonLabel && (
          <CardFooter>
            <BackButton
              label={backButtonLabel}
              href={backButtonHref}
            />
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default CardWrapper