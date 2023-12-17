let shop = document.getElementById("shop")

let cart = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopData.map((card) => {
        let { id, name, price, desc, img } = card;

        let search = cart.find((card) => card.id === id) || [];

        return `
            <div class="shadow-md md:grid md:grid-cols-2" product-id=${id}>
                <div class="flex flex-col items-start justify-between p-8 bg-gradient-to-b from-dark to-darkest">
                <h2 class="mb-3 text-3xl font-bold text-white">
                ${name}
                </h2>
                <p class="text-lg text-slate-200">${desc}</p>
                <div class="py-5 text-5xl font-bold text-white">¢${price}</div>

                <div class="grid grid-cols-3 gap-5 text-xl bg-white lg:text-3xl">
                <div class="grid px-6 py-2 cursor-pointer bg-slate-200 place-items-center" onclick="decrement(${id})">-</div>

                <div class="grid px-6 py-2 place-items-center" id="${id}">${search.item === undefined ? 0 : search.item}</div>

                <div class="grid px-6 py-2 cursor-pointer bg-slate-200 place-items-center" onclick="increment(${id})">+</div>
            </div> 

            </div>
                <div class="grid bg-white place-items-center object-cover">
                <img src=${img} alt="bud one">
            </div>   
            </div> `;
    })
    .join("")); 
};
generateShop();

let increment = (id) => {
    let selectedItem = id;

    let search = cart.find((card) => card.id === selectedItem.id);

    if (search === undefined) {
        cart.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    update(selectedItem.id);

    localStorage.setItem(
    'data',
    JSON.stringify(cart)                                   
    );
};

let decrement = (id) => {
    let selectedItem = id;

    let search = cart.find((card) => card.id === selectedItem.id);
    
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);

    cart = cart.filter((card) => card.item !== 0);

    localStorage.setItem(
        'data',
        JSON.stringify(cart)
    );
};

let update = (id) => {
    let search = cart.find((card) => card.id === id);

    document.getElementById(id).innerHTML = search.item;

    sum();
} 

let sum = () => {
    let cartIcon = document.getElementById('cartSum');
    cartIcon.innerHTML = cart.map((card) => card.item).reduce((x, y) => x + y, 0);
};

sum();