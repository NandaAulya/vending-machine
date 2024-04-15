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

    addMoney(amount = 0) {
        if ((this.money + amount) <= 50000) {
            this.money += amount;
        }
        document.getElementById('saldo').innerHTML = this.money;
        this.update();
    }

    purchase(node) {
        const selectedDrink = this.items[node];

        if (selectedDrink && selectedDrink.amount > 0 && this.money >= selectedDrink.price) {
            selectedDrink.amount--;
            this.money -= selectedDrink.price;
            document.getElementById('saldo').innerHTML = this.money;

            const source = document.getElementById('pickup-template').innerHTML;
            const template = Handlebars.compile(source);
            const container = document.getElementById('pickup');

            container.innerHTML = template({ image: selectedDrink.image });
            setTimeout(()=> {
                container.innerHTML = ''
            }, 3000)

            this.update();
        }
    }

    resetChange() {
        if (this.money === 1000 || this.money === 2000 || this.money === 5000 || this.money === 10000) {
            this.money = 0;
            document.getElementById('saldo').innerHTML = this.money;
            this.update();
        }
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
              this.addMoney(amount);
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
}

const machine = new Machine();
const pepsi = new Item('Pepsi', 5, 10000, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2021/9/6/3dae7f6c-820f-4ab8-bdb9-901913a4e446.jpg');
const coffee = new Item('Coffee',  10, 9500, 'https://images.tokopedia.net/img/cache/700/product-1/2020/4/30/8335353/8335353_a1e4523b-8db5-4a87-b955-5cbb9b1b1bae_568_568.jpg');
const sprite = new Item('Sprite', 7, 8000, 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-3823057/sprite_minuman-kaleng-sprite-330-ml_full02.jpg');
const fanta = new Item('Fanta', 4, 6000, 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//84/MTA-3542050/fanta_minuman-kaleng-fanta-250-ml-strawbeery-slim_full02.jpg');
const susu = new Item('Bear Brand', 6, 11000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWGmpTsFX19iKs0DzFAzOXxvXS2OwuojNkTFUjLZ8BPg&s');
const cola = new Item('Coca Cola', 5, 7000, 'https://image1ws.indotrading.com/s3/productimages/webp/co35688/p1199114/w600-h600/18ca77b6-950e-4a4c-b6e2-e2aee2a3ee7e.jpg')
const pocari = new Item('Pocari', 9, 6000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdBpDvPv5KPSOS6u_Ry2puw0ltRQ5FggIOsCOWjUEvgg&s');
const olatte = new Item('Olatte', 12, 11500, 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//103/MTA-57119566/olatte_olatte-original-w-milk-pear-240ml-can_full01.jpg');

document.getElementById('return').addEventListener('click', () => machine.resetChange());

machine.productListeners('#product-container');
machine.moneyListeners();
machine.loadDrinks(pepsi, coffee, sprite, fanta, susu, cola, pocari, olatte);
machine.turnOn();
 