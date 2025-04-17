let detect_iframe = null

function detectIFrame() {
  const iframes = document.getElementsByTagName('iframe')
  if (iframes.length > 0) {
    console.log(`🧩 Detected ${iframes.length} possbile ads.`)
    console.log(`🧹 Removing ${iframes.length} possible ads.`)
    ;[...iframes].forEach((iframe, i) => {
      console.log(`❌ Removed ads[${i}] src:`, iframe.src)
      iframe.remove()
    })
  } else {
    console.log('✅ No possible ads detected.')
  }
}

function runScript(action = 'ON') {
  if (action === 'ON') {
    if (!detect_iframe) {
      detect_iframe = setInterval(detectIFrame, 2000)
    }
  } else {
    clearInterval(detect_iframe)
    detect_iframe = null
  }
}

// Listen to events from background script
window.addEventListener('toggle-iframe-detection', e => {
  runScript(e.detail)
})
