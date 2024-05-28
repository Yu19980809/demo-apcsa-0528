type Props = {
  onMouseDown: any
}

const VerticalResizeBar = ({ onMouseDown }: Props) => {
  return (
    <div
      onMouseDown={onMouseDown}
      className="group flex justify-center items-center p-1 h-full cursor-ew-resize"
    >
      <span className="w-1 h-10 rounded-md bg-black/30 group-hover:hidden" />
      <span className="hidden w-1 h-full rounded-md bg-sky-500 group-hover:block" />
    </div>
  )
}

export default VerticalResizeBar
