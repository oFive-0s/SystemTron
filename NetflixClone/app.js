function scrollRight() {
  const wrapper = document.querySelector('.movie-list-wrapper');
  const scrollAmount = 550; // Amount to scroll
  const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth; // Maximum scrollable width

  // Check if the current scroll position plus the scroll amount exceeds the max scrollable width
  if (wrapper.scrollLeft + scrollAmount > maxScrollLeft) {
      // If it exceeds, reset to the start
      wrapper.scrollTo({
          left: 0,
          behavior: 'smooth' // Smooth scrolling back to start
      });
  } else {
      // Otherwise, scroll right
      wrapper.scrollBy({
          top: 0,
          left: scrollAmount,
          behavior: 'smooth' // Smooth scrolling
      });
  }
}