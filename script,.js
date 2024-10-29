

const cartItems = [];
let totalAmount = 0;
const CartConatiner = document.querySelector(".AddToCart");



function ClickingItem() {
    document.querySelectorAll(".item").forEach((MenuItem) => {
        MenuItem.addEventListener("click", (e) => {

            document.querySelectorAll(".item").forEach(item => {
                item.classList.remove("clicked");
            });
            e.currentTarget.classList.add("clicked");

            const itemName = e.currentTarget.firstElementChild.innerHTML;
            const itemPrice = parseInt(e.currentTarget.lastElementChild.innerHTML.split("-")[0]);
            const Itemid = MenuItem.id;
            AddingItem(itemName, itemPrice, Itemid);
        });
    });
}


function AddingItem(itemName, itemPrice, Itemid) {
    let existingItem = cartItems.find((item) => item.id === Itemid);

    if (existingItem) {
        existingItem.quant++;
        existingItem.price = itemPrice * existingItem.quant;
        updateItemDisplay(existingItem);
        updateTotalAmount(itemPrice);
        return;
    }

    const cartContainer = document.querySelector(".CartItems");
    const cItem = document.createElement("div");
    cItem.innerHTML = ` 
        <div class="cItemBox">
            <div class="Citem" id ="${Itemid}" >
                <p class="cName">${itemName}</p>
                <p><span class="cPrice">${itemPrice}</span> Rs</p>
            </div>
            <div class="QuantityBox">
                <i class="fa-solid fa-minus"></i>
                <p><b class="quantity">1</b></p>
                <i class="fa-solid fa-plus"></i>
            </div>
        </div>`;

    cartContainer.appendChild(cItem);

    const newItem = {
        id: Itemid,
        price: itemPrice,
        element: cItem,
        quant: 1,
    };

    cartItems.push(newItem);

    const CartIconLogo = document.querySelector(".cartQuan");
    CartIconLogo.style.display = "flex";
    CartIconLogo.innerHTML = cartItems.length;

    const quantityElem = cItem.querySelector(".quantity");
    const priceElem = cItem.querySelector(".cPrice");

    cItem.querySelector(".fa-plus").addEventListener("click", (e) => {
        e.stopPropagation();
        newItem.quant++;
        newItem.price += itemPrice;
        updateItemDisplay(newItem);
        updateTotalAmount(itemPrice);
    });

    cItem.querySelector(".fa-minus").addEventListener("click", (e) => {
        e.stopPropagation();
        if (newItem.quant > 0) {
            newItem.quant--;
            newItem.price -= itemPrice;
            updateItemDisplay(newItem);
            updateTotalAmount(-itemPrice);
        }

    });


    updateTotalAmount(itemPrice);
}


function updateItemDisplay(item) {
    item.element.querySelector(".quantity").innerHTML = item.quant;
    item.element.querySelector(".cPrice").innerHTML = item.price;
}






function updateTotalAmount(priceChange) {


    totalAmount += priceChange;
    const TotalAmountBox = CartConatiner.querySelector(".totalAmount");
    if (TotalAmountBox) {
        TotalAmountBox.querySelector(".amount").textContent = `${totalAmount} -/Rs`;
    } else {
        const TotalAmountBox = document.createElement("div");
        TotalAmountBox.classList.add("totalAmount");
        TotalAmountBox.innerHTML = `

        <div class="coupon">
    <input class="couponInput" type="text">
    <button class="Cbtn">Add Coupon</button>
</div>

            <p>Total Amount : <span class="amount">${totalAmount} -/Rs</span></p>
            <button onClick="Reset()" class="Pay">Pay</button>`;
        CartConatiner.appendChild(TotalAmountBox);

        TotalAmountBox.querySelector(".Cbtn").addEventListener("click", () => {
            applyCoupon();
        });
    }

    
}


function applyCoupon() {
    const couponVal = document.querySelector(".couponInput").value;
    
   
    if (couponVal.toLowerCase() === "usman10") {
       
        const discount = totalAmount * 0.1;
       
        totalAmount -= discount;

       
        const amountDisplay = document.querySelector(".amount");
        if (amountDisplay) {
            amountDisplay.textContent = `${totalAmount.toFixed(2)} -/Rs`;
        }
        
  
        alert("Coupon 'usman10' applied! You've received a 10% discount.");
    } else {
        
        alert("Invalid coupon code.");
       
    }
}





document.querySelector(".CartIcon").addEventListener("click", () => {
    const AddCart = document.querySelector(".AddToCart");
    AddCart.style.display = "flex";
    AddCart.style.right = "10px";
});

document.querySelector(".fa-xmark").addEventListener("click", () => {
    const AddCart = document.querySelector(".AddToCart");
    AddCart.style.right = "-700px";
    AddCart.style.display = "none";
});




function Reset() {
    alert("Thank you ! Your order has been placed.");
    location.reload();
}

ClickingItem();

