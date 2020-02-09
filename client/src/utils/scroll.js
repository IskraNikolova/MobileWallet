export const scrollVerticalTo = yCoordinate => {
  setTimeout(() => {
    const scrollSpot = document.createElement('div')
    scrollSpot.id = 'scroll-spot'
    scrollSpot.style.position = 'absolute'
    scrollSpot.style.top = yCoordinate
    scrollSpot.style.left = '50%'
    scrollSpot.style.height = '1px'
    scrollSpot.style.width = '1px'
    document.body.appendChild(scrollSpot)

    document.getElementById('scroll-spot').scrollIntoView()
    setTimeout(() => scrollSpot.parentElement.removeChild(scrollSpot), 200)
  }, 0)
}

export const ensureScrollVerticalTo = ({ yCoordinate, retryCount }) => {
  let counter = 0
  const ensureInterval = setInterval(() => {
    if (counter >= retryCount) {
      clearInterval(ensureInterval)
    }
    scrollVerticalTo(yCoordinate)
    counter++
  }, 200)
  return ensureInterval
}
