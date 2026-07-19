const TOUR_SRC = `${import.meta.env.BASE_URL}iGuide/index.html`

export default function IGuide() {
  return (
    <iframe
      src={TOUR_SRC}
      className="iguide-frame"
      scrolling="no"
      frameBorder="0"
      allowFullScreen
    />
  )
}
