This folder contains the frontend implementation for the Theme Picker project. Below is an overview of the architecture and features utilized within this folder:

## Architecture
- **Features**: Contains main components of the app
  - `Typeahead`: Main logic of the typeahead input and suggestions list. Also I decided to cover main feature with test in `TypeaheadWidget.test.tsx`
  - `Button`
  - `Header`
    
- **Shared**: Contains shared types and utility functions used across different components.
  - `types.ts`: Defines shared types used throughout the application.
  - `debounce.ts`: Implements a debounce function used for delaying input event handling.
 
- **store.tsx**: Contains all logic for written for store
  
### Areas to improve:
- Store the theme color on the server and make url shareble (http://theme-picker.com?theme=DD3456). Now logic is not complete
- Better test coverage
