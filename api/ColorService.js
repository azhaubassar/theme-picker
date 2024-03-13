import ColorRepository from './ColorRepository.js';

class ColorService {
    constructor() {
        this.colorRepository = new ColorRepository();
    }

    searchColors(query) {
        return this.colorRepository.searchColors(query);
    }
}

export default ColorService;
