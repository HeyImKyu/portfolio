module.exports = function() {
    // Check for dark mode preference in localStorage (via JavaScript)
    // This will only work if JavaScript is enabled
    // For server-side rendering, we'll default to false
    // The actual value will be updated on page load via JavaScript
    return {
      darkmode: false
    };
  };
