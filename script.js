const blob = document.getElementById("blob")

document.body.onmousemove = ({ pageX, pageY }) => {
  blob.animate(
    {
      left: `${pageX}px`,
      top: `${pageY}px`,
    },
    { duration: 3000, fill: "forwards" }
  )
}
