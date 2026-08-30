
const USERS="peroStoreUsers",SESSION="peroStoreSession";
const getUsers=()=>{try{return JSON.parse(localStorage.getItem(USERS)||"[]")}catch{return[]}};
const saveUsers=u=>localStorage.setItem(USERS,JSON.stringify(u));
const show=(id,text,ok=false)=>{const e=document.getElementById(id);if(!e)return;e.textContent=text;e.style.display=text?"block":"none";if(ok)e.className="success";else e.className="msg"};

document.querySelectorAll(".eye").forEach(b=>b.addEventListener("click",()=>{const i=document.getElementById(b.dataset.for);i.type=i.type==="password"?"text":"password"}));
const loginView=document.getElementById("loginView"),registerView=document.getElementById("registerView");
const showLogin=()=>{loginView.classList.add("active");registerView.classList.remove("active")};
const showRegister=()=>{registerView.classList.add("active");loginView.classList.remove("active")};
document.getElementById("toRegister").onclick=showRegister;
document.getElementById("toLogin").onclick=showLogin;
document.getElementById("loginHere").onclick=showLogin;

document.getElementById("registerForm").addEventListener("submit",e=>{
 e.preventDefault();show("regError","");show("success","");
 const username=document.getElementById("username").value.trim(),email=document.getElementById("email").value.trim().toLowerCase(),pass=document.getElementById("regPass").value,confirm=document.getElementById("confirm").value,list=getUsers();
 if(username.length<3)return show("regError","Username minimal 3 karakter.");
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return show("regError","Email tidak valid.");
 if(pass.length<6)return show("regError","Password minimal 6 karakter.");
 if(pass!==confirm)return show("regError","Password tidak sama.");
 if(list.some(u=>u.username.toLowerCase()===username.toLowerCase()))return show("regError","Username sudah digunakan.");
 if(list.some(u=>u.email===email))return show("regError","Email sudah terdaftar.");
 list.push({id:String(Date.now()),username,email,password:pass});saveUsers(list);
 show("success","Akun berhasil dibuat. Silakan login.",true);setTimeout(showLogin,900);
});

document.getElementById("loginForm").addEventListener("submit",e=>{
 e.preventDefault();show("error","");
 const id=document.getElementById("identity").value.trim().toLowerCase(),pass=document.getElementById("password").value;
 const u=getUsers().find(x=>x.username.toLowerCase()===id||x.email===id);
 if(!u)return show("error","Username atau email tidak ditemukan.");
 if(u.password!==pass)return show("error","Password salah.");
 const s=JSON.stringify({id:u.id,username:u.username,email:u.email});
 (document.getElementById("remember").checked?localStorage:sessionStorage).setItem(SESSION,s);
 location.href="store.html";
});
document.getElementById("forgot").onclick=e=>{e.preventDefault();alert("Fitur reset password akan ditambahkan saat backend dipasang.")};
document.getElementById("google").onclick=()=>alert("Google Login membutuhkan OAuth/backend.");
