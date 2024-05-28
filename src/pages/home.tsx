import { homeCards } from '@/lib/constants'
import CardPage from '@/components/home/card'
import Navbar from '@/components/layout/navbar'
import Calendar from '@/components/home/calendar'
import Container from '@/components/global/container'

const Home = () => {
  return (
    <div className="h-full">
      <Navbar />

      <Container className="h-[calc(100vh-80px)]">
        <div className="flex w-full h-full">
          <div className="flex justify-center items-center flex-1">
            <div className="grid grid-cols-2 md:gap-8 gap-4">
              {homeCards.map(item => (
                <CardPage key={item.label} item={item} />
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center w-[400px]">
            <Calendar />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Home
