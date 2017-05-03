/* global chrome */

function hasSimpleTag () {
  var metaTags = document.getElementsByTagName('meta')
  return Array.prototype.slice.call(metaTags).some(function (metaTag) {
    return (
      metaTag.getAttribute('property') === 'markup' &&
      metaTag.getAttribute('value') === 'simple'
    )
  })
}

function addStyles () {
  var newTag = document.createElement('style')
  newTag.type = 'text/css'
  chrome.storage.sync.get({styles: ''}, function (items) {
    newTag.styleSheet.cssText = items.style
    document.body.appendChild(newTag)
  })
}

document.addEventListener('DOMContentLoaded', function () {
  if (hasSimpleTag()) addStyles()
})
