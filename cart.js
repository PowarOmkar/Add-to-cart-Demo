let sum = 0;
const item_info = document.getElementById("searchList");
// const dc = document.getElementById("dcount");

const Item_Data = [];
function getData() {

    let EnteredQuantity = document.getElementById("quant").value;
    let price = document.getElementById("price").value;
    let SelectedProductName = document.getElementById("searchList").value;
    // let item_info = document.getElementById("item_id");
    if (SelectedProductName.length == 0) {
        alert("Please Select Your Product");
        return;
    } else if (EnteredQuantity <= 0) {
        alert("You entered quantity which is either zero or negative ");
        return;
    } else if (price <= 0) {
        alert("You entered Price which is either zero or Negative ");
        return;
    } else {

        let itemInfo = {
            item_name: "SelectedProductName",
            item_quant: "EnteredQuantity",
            item_price: "price",
            // item_total:"total"
        };

        itemInfo.item_name = SelectedProductName;
        itemInfo.item_quant = EnteredQuantity;
        itemInfo.item_price = price;
        //sumarr.push(itemInfo);


        Item_Data.push(itemInfo);
        let check_value = JSON.parse(localStorage.getItem(itemInfo.item_name));

        if (check_value) {
            Item_Data.push(itemInfo);
            itemInfo.item_quant = Number(check_value.item_quant) + Number(itemInfo.item_quant);
            localStorage.removeItem(check_value.item_name);
            for (let index = 0; index < Item_Data.length; index++) {
                if (Item_Data[index].item_name == check_value.item_name) {
                    Item_Data.splice(index, 1);
                }

            }

        }

        localStorage.setItem(itemInfo.item_name, JSON.stringify(itemInfo));
        displayCart();
    }
}

function displayCart() {
    document.getElementById("tab1").innerHTML = '';
    sum = 0;
    Object.keys(localStorage).forEach(key => {

        let tr = document.createElement('tr');
        let td1 = tr.appendChild(document.createElement("TD"));
        let td2 = tr.appendChild(document.createElement("TD"));
        let td3 = tr.appendChild(document.createElement("TD"));
        //   let td4= tr.appendChild(document.createElement("TD"));
        let update_value = Object.values(JSON.parse(localStorage.getItem(key)));
        td1.innerHTML = update_value[0];
        td2.innerHTML = update_value[1];
        td3.innerHTML = update_value[2];
        sum = sum + Number(update_value[1]) * Number(update_value[2]);
        document.getElementById("ans").innerHTML = "Total bill is Rs:" + sum;
        document.getElementById("tab1").appendChild(tr);
    })


}

let ProductData = [];
function addData() {
    let name = document.getElementById("name1").value;
    let price = document.getElementById("pro1").value;
    if (name.length < 1) {
        alert("please Enter the product name Propaerly")
    }
    else if (price <= 0) {
        alert("Please Enter valid price..");

    }
    else {
        debugger
        console.log(ProductData.length)

        if (ProductData.length==0) {
            let obj = {
                n: name,
                p: price
            }            
            ProductData.push(obj);
            displayList();
            // $('#closemodal').modal('hide');         
        }
        else {
            let flag = true; let CountKey = 0;
            for (let index = 0; index < ProductData.length; index++) {
                if (ProductData[index].n != name) {
                    CountKey = CountKey + 1;
                }
            }
            if (CountKey == ProductData.length) {
                let obj =
                {
                    n: name,
                    p: price
                }
                ProductData.push(obj);
                // $(closemodal').modal('hide');'#
                displayList();
                //console.log(typeof(ProductData))
            }
            else {
                alert("Already added")
            }
        }
    }
}
function displayList() {
    item_info.innerHTML = '';
    // console.log(item_info);
        console.log(ProductData.p);
    ProductData.forEach(element => {
        let AddOptionTag = document.createElement("option");
        //  let add_price = document.createElement("div");        // 
        let ProductPrice = element.p;
        let ProductName = element.n;
         document.getElementById("price").value = ProductPrice;
        //  add_price.innerHTML = `<input class=" ip" id="price" type="number" min="0" value="${element.p}"  name="price1" placeholder="Enter Price" required>p `
        AddOptionTag.innerHTML = `<a class="dropdown-item" href="#"  ">${ProductName}</a>`;
        item_info.appendChild(AddOptionTag);
        // item_pr.appendChild(add_price);
    });
}
function orderplace() {
    alert("Congratulations your Order is Successfully placed..! Visit again");
    localStorage.clear();
}
function updatePrice() {
    let name = document.getElementById("searchList").value;
    // if(name){
    //     let store = JSON.parse(localStorage.getItem(name));
    //     if(store){
    //         document.getElementById("price").value= store.item_price;
    //     }
    // }
    console.log(name)
    for (var i = 0; i < ProductData.length; i++) {
        if (ProductData[i].n == name) {
            console.log(ProductData[i].p)
            document.getElementById("price").value = ProductData[i].p;
            break;
        }
    }
    // let store = JSON.parse(localStorage.getItem(name));





}
$(document).ready(function () {
    // item_info.innerHTML = '';
    let keys = Object.keys(localStorage);
    for (let index = 0; index < keys.length; index++) {
        let find = keys[index];
        let list = JSON.parse(localStorage.getItem(find));
        console.log("find  " + find);
        console.log("list price =" + list.item_price);
        let obj = {
            n: keys[index],
            p: list.item_price
        }
        ProductData.push(obj);

        // document.getElementById("price").value = list.item_price;
        // let AddOptionTag = document.createElement("option");
        // AddOptionTag.innerHTML = `<a class="dropdown-item" href="#">${x[index]}</a>`;
        // item_info.append(AddOptionTag);

    }
    displayList()

});