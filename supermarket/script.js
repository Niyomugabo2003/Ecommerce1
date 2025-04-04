const categoriesContainer = document.getElementById('categoriesContainer');

// Variable to track if the user is currently dragging or touching
let isDragging = false;
let startY = 0;
let scrollTop = 0;

// Function to start dragging (on touch or mouse down)
function startDrag(e) {
  isDragging = true;
  startY = e.pageY || e.touches[0].pageY; // For mouse or touch
  scrollTop = categoriesContainer.scrollTop;
  e.preventDefault(); // Prevent default action (such as text selection)
}

// Function to drag the container (on mouse move or touch move)
function dragMove(e) {
  if (!isDragging) return;
  const moveY = (e.pageY || e.touches[0].pageY) - startY; // Difference in touch/mouse position
  categoriesContainer.scrollTop = scrollTop - moveY; // Move the container's scroll position
  e.preventDefault();
}

// Function to stop dragging (on mouse up, mouse leave, or touch end)
function stopDrag() {
  isDragging = false;
}

// Attach events for mouse or touch actions
categoriesContainer.addEventListener('mousedown', startDrag);
categoriesContainer.addEventListener('touchstart', startDrag);

categoriesContainer.addEventListener('mousemove', dragMove);
categoriesContainer.addEventListener('touchmove', dragMove);

categoriesContainer.addEventListener('mouseup', stopDrag);
categoriesContainer.addEventListener('mouseleave', stopDrag);
categoriesContainer.addEventListener('touchend', stopDrag);
categoriesContainer.addEventListener('touchcancel', stopDrag);
