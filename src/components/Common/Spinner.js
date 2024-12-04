export const  Spinner = (action) => {
    let spinnerElement = document.getElementById('global-spinner');
  
    if (action === 'show') {
      if (!spinnerElement) {
        spinnerElement = document.createElement('div');
        spinnerElement.id = 'global-spinner';
        spinnerElement.className =
          'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
        spinnerElement.innerHTML = `
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        `;
        document.body.appendChild(spinnerElement);
      }
    } else if (action === 'hide') {
      if (spinnerElement) {
        spinnerElement.remove();
      }
    }
  };
  