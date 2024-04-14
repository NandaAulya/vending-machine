class Machine {
    constructor() {
        this.money = 0;
        this.items = [];
    }

    loadDrinks(...items) {
      this.items = items;
    }

    update() {
        this.prepareDrinks();
    }

    turnOn() {
        document.getElementById('saldo').innerHTML = this.money;
        this.update();
    }

    addChange(amount = 0) {
        this.money += amount;
        document.getElementById('saldo').innerHTML = this.money;
    }

    purchase(node) {
        const selectedSoda = this.items[node];

        if (selectedSoda && selectedSoda.amount > 0 && this.money >= selectedSoda.price) {
            selectedSoda.amount--;
            this.money -= selectedSoda.price;
            document.getElementById('saldo').innerHTML = this.money;
        } else {
            const name = selectedSoda ? selectedSoda.name : "Soda";
            alert(`${name} is out of stock or you don't have enough money!`);
        }
        this.update();
    }

    resetChange() {
        this.money = 0;
        document.getElementById('saldo').innerHTML = this.money;
        this.update();
    }

    prepareDrinks() {
      const source = document.getElementById('product-template').innerHTML;
      const template = Handlebars.compile(source);
      const container = document.getElementById('product-container');

      container.innerHTML = template({ items: this.items });
    }
  
    productListeners(parentSelector) {
      const parentElement = document.querySelector(parentSelector);
  
      parentElement.addEventListener('click', event => {
          const target = event.target;
  
          if (target.classList.contains('button')) {
              const node = target.closest('.button');
              const index = Array.from(node.parentElement.children).indexOf(node);
              this.purchase(index);
          }
      });
    }

    moneyListeners() {
      const moneyButtons = document.querySelectorAll('.money');
  
      moneyButtons.forEach(button => {
          button.addEventListener('click', () => {
              const amount = Number(button.firstElementChild.innerHTML);
              this.addChange(amount);
          });
      });
  }
  
}

class Item {
    constructor(name, amount, price, image) {
        this.name = name;
        this.amount = parseInt(amount);
        this.price = parseFloat(price);
        this.image = image;
    }

    sodaCount() {
        return `We have ${this.amount} ${this.name}(s) left in stock`;
    }
}

const machine = new Machine();
const pepsi = new Item('Pepsi', 5, 10000, 'https://m.media-amazon.com/images/I/61bG3pY7k-L.jpg',);
const coke = new Item('Coke',  5, 5000, 'https://m.media-amazon.com/images/I/61bG3pY7k-L.jpg');
const sprite = new Item('Sprite', 5, 8000, 'https://m.media-amazon.com/images/I/61bG3pY7k-L.jpg');
const fanta = new Item('Fanta', 5, 6000, 'https://m.media-amazon.com/images/I/61bG3pY7k-L.jpg');

document.getElementById('return').addEventListener('click', () => machine.resetChange());

machine.productListeners('#product-container');
machine.moneyListeners();
machine.loadDrinks(pepsi, coke, sprite, fanta);
machine.turnOn();
