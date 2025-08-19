{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 (function() \{\
  // A\'f1o din\'e1mico en el footer\
  var yearEl = document.getElementById('year');\
  if (yearEl) \{\
    yearEl.textContent = new Date().getFullYear();\
  \}\
\
  // Cursor personalizado\
  var cursor = document.getElementById('cursor');\
  var rafId = null;\
  var mouseX = window.innerWidth / 2;\
  var mouseY = window.innerHeight / 2;\
\
  function updateCursor() \{\
    cursor.style.left = mouseX + 'px';\
    cursor.style.top = mouseY + 'px';\
  \}\
\
  function onMouseMove(e) \{\
    mouseX = e.clientX;\
    mouseY = e.clientY;\
    if (!rafId) \{\
      rafId = requestAnimationFrame(function() \{\
        updateCursor();\
        rafId = null;\
      \});\
    \}\
  \}\
\
  function setActive(state) \{\
    if (!cursor) return;\
    if (state) \{\
      cursor.classList.add('is-active');\
    \} else \{\
      cursor.classList.remove('is-active');\
    \}\
  \}\
\
  // Expandir el cursor en elementos interactivos\
  function watchInteractiveElements() \{\
    var interactiveSelectors = ['a', 'button', '[data-cursor="interactive"]', 'input', 'textarea', 'label'];\
    document.addEventListener('mouseover', function(e) \{\
      var el = e.target;\
      if (!el) return;\
      var isInteractive = interactiveSelectors.some(function(sel)\{ return el.matches(sel); \});\
      setActive(isInteractive);\
    \});\
    document.addEventListener('mouseout', function(e) \{\
      var el = e.relatedTarget;\
      if (!el) \{\
        setActive(false);\
        return;\
      \}\
      var isInteractive = interactiveSelectors.some(function(sel)\{ return el.matches(sel); \});\
      if (!isInteractive) setActive(false);\
    \});\
    document.addEventListener('mousedown', function() \{\
      if (!cursor) return;\
      cursor.classList.add('is-click');\
    \});\
    document.addEventListener('mouseup', function() \{\
      if (!cursor) return;\
      setTimeout(function()\{ cursor.classList.remove('is-click'); \}, 160);\
    \});\
  \}\
\
  // Ocultar cursor personalizado cuando el puntero no est\'e1 en ventana\
  function hideCursorOnLeave() \{\
    document.addEventListener('mouseleave', function() \{ cursor.style.opacity = '0'; \});\
    document.addEventListener('mouseenter', function() \{ cursor.style.opacity = '1'; \});\
  \}\
\
  // Inicializaci\'f3n\
  function init() \{\
    if (!cursor) return;\
    window.addEventListener('mousemove', onMouseMove, \{ passive: true \});\
    watchInteractiveElements();\
    hideCursorOnLeave();\
  \}\
\
  // Evitar problemas en dispositivos t\'e1ctiles\
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;\
  if (isTouch) \{\
    if (cursor) cursor.style.display = 'none';\
  \} else \{\
    init();\
  \}\
\})();}