/* global chrome */

function load () {
  chrome.storage.sync.get({styles: ''}, function (items) {
    document.getElementById('styles').value = items.styles
  })
}

function save () {
  var styles = document.getElementById('styles').value
  chrome.storage.sync.set({styles: styles}, function () {
    var status = document.getElementById('status')
    status.textContent = 'Saved.'
    setTimeout(function () {
      status.textContent = ''
    }, 750)
  })
}

document.addEventListener('DOMContentLoaded', load)

document.getElementById('save').addEventListener('click', save)
