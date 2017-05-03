/* global chrome */

function hasSimpleHTMLMetaTag () {
  var metaTags = document.getElementsByTagName('meta')
  var length = metaTags.length
  for (var index = 0; index < length; index++) {
    var metaTag = metaTags[index]
    if (
      metaTag.getAttribute('name') === 'markup' &&
      metaTag.getAttribute('content') === 'simple'
    ) {
      return true
    }
  }
  return false
}

function removeTheirStyles () {
  removeLinkTags()
  removeStyleTags()

  function removeLinkTags () {
    var linkTags = document.getElementsByTagName('link')
    var length = linkTags.length
    for (var index = 0; index < length; index++) {
      var linkTag = linkTags[index]
      if (linkTag.getAttribute('type').toLowerCase() === 'text/css') {
        linkTag.parentNode.removeChild(linkTag)
      }
    }
  }

  function removeStyleTags () {
    var styleTags = document.getElementsByTagName('style')
    var length = styleTags.length
    for (var index = 0; index < length; index++) {
      var styleTag = styleTags[index]
      styleTag.parentNode.removeChild(styleTag)
    }
  }
}

function addOurStyles () {
  chrome.storage.sync.get({styles: ''}, function (items) {
    var styles = items.styles
    if (styles) {
      var newTag = document.createElement('style')
      newTag.type = 'text/css'
      if (newTag.styleSheet) {
        newTag.styleSheet.cssText = styles
      } else {
        newTag.appendChild(document.createTextNode(styles))
      }
      document.body.appendChild(newTag)
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  if (hasSimpleHTMLMetaTag()) {
    removeTheirStyles()
    addOurStyles()
  }
})
