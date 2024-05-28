type Props = {
  onMouseDown: any
}

const HorizontalResizeBar = ({ onMouseDown }: Props) => {
  return (
    <div
      onMouseDown={onMouseDown}
      className="group flex justify-center items-center p-1 cursor-ns-resize"
    >
      <span className="w-10 h-1 rounded-md bg-black/30 group-hover:hidden" />
      <span className="hidden w-full h-1 rounded-md bg-sky-500 group-hover:block" />
    </div>
  )
}

export default HorizontalResizeBar
