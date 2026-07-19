(() => {
  const start = () => {
    const script = document.createElement('script')
    script.src = './app-core.js'
    script.async = true
    document.head.append(script)
  }
  requestAnimationFrame(() => window.setTimeout(start, 0))
})()
