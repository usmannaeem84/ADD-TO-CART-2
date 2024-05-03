const cartItems = []
let totalAmount = 0;
const CartConatiner = document.querySelector(".AddToCart")

function ClickingItem() {

    document.querySelectorAll(".item").forEach((MenuItem) => {
        MenuItem.addEventListener("click", (e) => {

            const itemName = e.currentTarget.firstElementChild.innerHTML
            const itemPrice = parseInt(e.currentTarget.lastElementChild.innerHTML.split("-")[0]);
            const Itemid = MenuItem.id;

            AddingItem(itemName, itemPrice, Itemid)

        })
    })

}




function AddingItem(itemName, itemPrice, Itemid) {

    const existingItem = cartItems.find((item) => item.id === Itemid);

    if (existingItem) {
        console.log("already present");
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
    cartItems.push({
        id: Itemid,
        price: itemPrice,
        element: cItem
    });



const CartIconLogo = document.querySelector(".cartQuan")
CartIconLogo.style.display="flex"
CartIconLogo.innerHTML=cartItems.length




    let quantityElem = cItem.querySelector(".quantity");
    let quantityVal = parseInt(quantityElem.innerHTML);

    let priceElem = cItem.querySelector(".cPrice")
    let priceVal = parseInt(priceElem.innerHTML)


    // Adding event listener to the plus icon
    cItem.querySelector(".fa-plus").addEventListener("click", (e) => {
        e.stopPropagation();
        quantityVal++;
        let totalprice = priceVal * quantityVal
        priceElem.innerHTML = totalprice
        quantityElem.innerHTML = quantityVal

        updateTotalAmount(itemPrice)

    });


    // Adding event listener to the minus icon
    cItem.querySelector(".fa-minus").addEventListener("click", (e) => {
        e.stopPropagation();
        if (quantityVal > 0) {
            quantityVal--;
            totalprice = priceVal * quantityVal
            priceElem.innerHTML = totalprice
        }
        quantityElem.innerHTML = quantityVal

        updateTotalAmount(itemPrice)


    });


    updateTotalAmount(itemPrice)

}

function updateTotalAmount(priceChange) {


    const TotalAmountBox = document.createElement("div")
    totalAmount += priceChange;
    TotalAmountBox.innerHTML =
        `
    
    <div class="totalAmount">
                        <p >Total Amount : <span class="amount">${totalAmount} -/Rs</span></p>
                        <button onClick="Reset()" class="Pay">Pay</button>
                        </div>
    
    `
    CartConatiner.appendChild(TotalAmountBox)

}


// mediaquery cart

document.querySelector(".CartIcon").addEventListener("click",()=>{
  const AddCart = document.querySelector(".AddToCart")
  AddCart.style.display="flex"
  AddCart.style.right="10px"
  
})

document.querySelector(".fa-xmark").addEventListener("click",()=>{
    const AddCart = document.querySelector(".AddToCart")
    AddCart.style.right="-700px"
    AddCart.style.display="none"
    
})



function Reset() {
    alert("Thank you for coming sir")
    location.reload();
}

ClickingItem();



