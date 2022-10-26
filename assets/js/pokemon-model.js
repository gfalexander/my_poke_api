class Pokemon {
    number;
    name;
    type;
    types = [];
    image;

    constructor (number, name, types = [], image) {
        this.number = number;
        this.name = name;
        this.types = types,
        this.image = image;
        
        const [type] = this.types
        this.type = type
    }
}