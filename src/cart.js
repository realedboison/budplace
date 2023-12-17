let shoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");
let cart = JSON.parse(localStorage.getItem("data")) || [];

let sum = () => {
    let cartIcon = document.getElementById("cartSum");
    cartIcon.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};
sum();

let generateCartItems = () => {
    if (cart.length !== 0) {
        return shoppingCart.innerHTML = cart.map((x) => {
            let {id, item} = x;
            let search = shopData.find((x) => x.id === id) || [];
            let {img, price, name} = search;

            let totalPrice = (item * price).toFixed(2)
            
            return `
                <div class="relative shadow-md md:grid md:grid-cols-2">
                <div class="flex flex-col items-start justify-between p-8 bg-gradient-to-b from-dark to-darkest">

                <h2 class="mb-3 text-3xl font-bold text-white">${name}</h2>

                <div class="py-5 text-4xl font-bold text-slate-200">¢${price}</div>

                <div class="grid grid-cols-3 gap-5 text-xl bg-white lg:text-3xl">
                    <div class="grid px-6 py-2 cursor-pointer bg-slate-200 place-items-center" onclick="decrement(${id})">-</div>
                    <div class="grid px-6 py-2 cursor-pointer place-items-center" id=${id}>${item}</div>
                    <div class="grid px-6 py-2 cursor-pointer bg-slate-200 place-items-center" onclick="increment(${id})">+</div>
                </div>

                <div class="pt-5 text-5xl font-bold text-white">¢${totalPrice}</div>
                </div>
                <div class="grid p-5 bg-white place-items-center">
                <img src=${img} alt="">
                </div>

                <div class="absolute grid w-12 h-12 rounded-full cursor-pointer -top-5 -right-5 bg-red place-items-center" onclick="removeItem(${id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M4.57812 3.15625L3.15625 4.57812L11.0781 12.5L3.10938 20.4844L4.51562 21.8906L12.5 13.9219L20.4688 21.8906L21.8906 20.4688L13.9219 12.5L21.8438 4.57812L20.4219 3.15625L12.5 11.0781L4.57812 3.15625Z" fill="white"/>
                </svg>
            </div>
            </div>`;
        }).join("");
    } else {
        shoppingCart.innerHTML = "";
        label.innerHTML = `
        <div class="flex gap-2 px-4 text-lg font-bold lg:px-8 text-darkest lg:text-3xl">
            Cart is Empty
        </div>
        
        <a href="index.html">
            <div class="px-4 py-5 text-lg font-bold text-white lg:px-8 bg-red lg:text-3xl">
            Back to Home
            </div>
        </a>
        `;
    }
};
generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        cart.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;

        generateCartItems();
        update(selectedItem.id);
        localStorage.setItem("data", JSON.stringify(cart))
    }
}

let decrement = (id) => {
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
  
    update(selectedItem.id);
    cart = cart.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(cart));
};

let update = (id) => {
    let search = cart.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    sum();
    TotalAmount();
  };
  
  let removeItem = (id) => {
    let selectedItem = id;
    cart = cart.filter((x) => x.id !== selectedItem.id);
    sum();
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(cart));
  };
  
  let TotalAmount = () => {
    if (cart.length !== 0) {
      let amount = cart
        .map((x) => {
          let { id, item } = x;
          let filterData = shopData.find((x) => x.id === id);
          return filterData.price * item;

        })
        .reduce((x, y) => x + y, 0);
        
        amount = amount.toFixed(2)
  
      return (label.innerHTML = `
            <div class="flex gap-2 px-4 text-lg font-bold lg:px-8 text-darkest lg:text-3xl">
                    Total :
                    <div class="text-lg font-extrabold lg:text-3xl">¢${amount}</div>
            </div>
            <a onclick="clearCart()" >
                  <div class="px-4 py-5 text-lg font-bold text-white lg:px-8 bg-red lg:text-3xl">
                    Clear Cart
                </div>
            </a>
      `);
    } else return;
  };
  
  TotalAmount();

  let clearCart = () => {
    cart = [];
    generateCartItems();
    sum();
    localStorage.setItem("data", JSON.stringify(cart));
  };
  