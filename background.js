chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: 'OFF' })
})

chrome.action.onClicked.addListener(async tab => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  })

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  })

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleIframeDetection,
    args: [nextState]
  })
})

function toggleIframeDetection(state) {
  window.dispatchEvent(
    new CustomEvent('toggle-iframe-detection', { detail: state })
  )
}
