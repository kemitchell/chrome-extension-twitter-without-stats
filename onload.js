/* global chrome */

function hasSimpleTag () {
  var metaTags = document.getElementsByTagName('meta')
  return Array.prototype.slice.call(metaTags).some(function (metaTag) {
    return (
      metaTag.getAttribute('name') === 'markup' &&
      metaTag.getAttribute('content') === 'simple'
    )
  })
}

function addStyles () {
  var newTag = document.createElement('style')
  newTag.type = 'text/css'
  chrome.storage.sync.get({styles: ''}, function (items) {
    if (newTag.styleSheet) {
      newTag.styleSheet.cssText = items.styles
    } else {
      newTag.appendChild(document.createTextNode(items.styles))
    }
    document.body.appendChild(newTag)
  })
}

document.addEventListener('DOMContentLoaded', function () {
  if (hasSimpleTag()) addStyles()
})
