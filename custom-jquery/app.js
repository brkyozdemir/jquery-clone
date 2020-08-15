const makeNiceCollection = collection => {
  collection.each = (callback) => {
    collection.forEach((element, i) => {
      const boundFn = callback.bind(element);
      boundFn(i, element);
    });
  };
  collection.on = (eventName, handler) => {
    collection.forEach((element) => {
      element.addEventListener(eventName, handler);
    });
  };
  collection.css = (...cssArgs) => {
    if (typeof cssArgs[0] === 'string') {
      const [property, value] = cssArgs;
      collection.forEach((element) => {
        element.style[property] = value;
      });
    } else if (typeof cssArgs[0] === 'object') {
      const cssProps = Object.entries(cssArgs[0]);
      collection.forEach((element) => {
        cssProps.forEach(([property, value]) => {
          element.style[property] = value;
        });
      });
    }
  };
};

const $ = (...args) => {
  if (typeof args[0] === 'function') {
    const readyFn = args[0];
    document.addEventListener('DOMContentLoaded', readyFn);
  } else if (typeof args[0] === 'string') {
    const selector = args[0];
    const collection = document.querySelectorAll(selector);
    makeNiceCollection(collection);
    return collection;
  } else if (args[0] instanceof HTMLElement) {
    const collection = [args[0]];
    makeNiceCollection(collection);
    return collection;
  }
};

$(() => {
  console.log('Document is ready!');
  $('h1').css('color', 'red');
  $('h1').css({
    fontFamily: 'sans-serif',
    cursor: 'pointer'
  })
  $('h1').on('click', () => {
    alert('WOUW');
  });
  $('li').css('font-family', 'sans-serif');
  $('li').each(function (i) {
    if (i % 2 === 0) $(this).css('color', 'green');
    else $(this).css('color', 'orange');
  });
});
