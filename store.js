
const SESSION="peroStoreSession";
let current=null;try{current=JSON.parse(localStorage.getItem(SESSION)||sessionStorage.getItem(SESSION)||"null")}catch{}
if(!current)location.replace("index.html");
document.getElementById("userName").textContent=current?.username||"User";
document.getElementById("avatar").textContent=(current?.username||"P")[0].toUpperCase();

const products=[{id:1,name:"DRIP CLIENT",cat:"code",desc:"DRIP CLIENT — produk digital untuk Minecraft.",image:"assets/drip-client.png",options:[
{name:"DRIP 1 DAY",price:10000,desc:"Akses selama 1 hari"},
{name:"DRIP 3 DAY",price:20000,desc:"Akses selama 3 hari"},
{name:"DRIP 7 DAY",price:40000,desc:"Akses selama 7 hari"}]}];
let selectedProduct=null,selectedOption=null;
const money=n=>"Rp "+n.toLocaleString("id-ID");
const productsEl=document.getElementById("products");

function render(){
 const q=document.getElementById("search").value.toLowerCase();
 const cat=document.getElementById("category").value;
 const list=products.filter(p=>(cat==="all"||p.cat===cat)&&(!q||p.name.toLowerCase().includes(q)));
 productsEl.innerHTML=list.map(p=>`<article class="product" data-id="${p.id}">
 <div class="cover"><img src="${p.image}" alt="${p.name}"></div>
 <div class="product-body"><span class="tag">DIGITAL PRODUCT</span><h3>${p.name}</h3><p>${p.desc}</p>
 <div class="row"><span class="price">Mulai ${money(p.options[0].price)}</span><button class="buy">View Product</button></div></div></article>`).join("");
 document.getElementById("resultText").textContent=`Showing ${list.length} product`;
 document.querySelectorAll(".product").forEach(el=>el.onclick=()=>openProduct(products.find(p=>p.id===+el.dataset.id)));
}
function openProduct(p){
 selectedProduct=p;selectedOption=p.options[0];
 document.getElementById("detailImage").innerHTML=`<img src="${p.image}" alt="${p.name}">`;
 document.getElementById("detailName").textContent=p.name;
 document.getElementById("detailDesc").textContent=p.desc;
 document.getElementById("options").innerHTML=p.options.map((o,i)=>`<button class="option ${i===0?"selected":""}" data-i="${i}"><span><b>${o.name}</b><small>${o.desc}</small></span><strong>${money(o.price)}</strong></button>`).join("");
 document.getElementById("chosenPrice").textContent=money(selectedOption.price);
 document.querySelectorAll(".option").forEach(b=>b.onclick=e=>{e.stopPropagation();selectedOption=p.options[+b.dataset.i];document.querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");document.getElementById("chosenPrice").textContent=money(selectedOption.price)});
 document.getElementById("detailModal").classList.add("show");
}
function closeDetail(){document.getElementById("detailModal").classList.remove("show")}
document.getElementById("buyNow").onclick=()=>{
 document.getElementById("checkoutProduct").textContent=selectedOption.name;
 document.getElementById("checkoutPrice").textContent=money(selectedOption.price);
 document.getElementById("checkoutModal").classList.add("show");closeDetail();
};
document.getElementById("closeDetail").onclick=closeDetail;
document.getElementById("closeCheckout").onclick=()=>document.getElementById("checkoutModal").classList.remove("show");
document.getElementById("logout").onclick=()=>{localStorage.removeItem(SESSION);sessionStorage.removeItem(SESSION);location.replace("index.html")};
document.getElementById("search").oninput=render;document.getElementById("category").onchange=render;
render();
