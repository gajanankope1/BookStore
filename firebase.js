import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
import { getDatabase, ref, set, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
import { getStorage, ref as sref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyBQYzrUtTobUbPrFSRXpPxfFT0SSUMRdsw",
    authDomain: "bookstore-project-26fee.firebaseapp.com",
    databaseURL: "https://bookstore-project-26fee-default-rtdb.firebaseio.com",
    projectId: "bookstore-project-26fee",
    storageBucket: "bookstore-project-26fee.appspot.com",
    messagingSenderId: "338546608566",
    appId: "1:338546608566:web:ae9c2d82f51acc0749d917",
    measurementId: "G-Q2283F0T82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage();

var shopname = "";
var shopname_for_buy = "";
var bookusername = "";
// page switching js

document.getElementById("all-books").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".bookstore h1").setAttribute("hidden", true);
    document.querySelector(".section").removeAttribute("hidden");
    document.querySelector(".section .book-detail").setAttribute("hidden", true);
    document.querySelector(".section .delete-book").setAttribute("hidden", true);
    document.querySelector(".section .form").setAttribute("hidden", true);
    document.querySelector(".section .edit-book").setAttribute("hidden", true);
    document.querySelector(".section .all-books-user").setAttribute("hidden", true);
    document.querySelector(".section .all-books").removeAttribute("hidden");
    document.querySelector(".section .customers").setAttribute("hidden", true);
    document.querySelector(".section .cart").setAttribute("hidden", true);
});

document.getElementById("add-book").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".bookstore h1").setAttribute("hidden", true);
    document.querySelector(".section").removeAttribute("hidden");
    document.querySelector(".section .all-books").setAttribute("hidden", true);
    document.querySelector(".section .book-detail").setAttribute("hidden", true);
    document.querySelector(".section .delete-book").setAttribute("hidden", true);
    document.querySelector(".section .edit-book").setAttribute("hidden", true);
    document.querySelector(".section .form").removeAttribute("hidden");
    document.querySelector(".section .customers").setAttribute("hidden", true);
    document.querySelector(".section .cart").setAttribute("hidden", true);
    document.querySelector(".section .all-books-user").setAttribute("hidden", true);
});
document.querySelector(".section  .all-books").addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id == "edit-book") {
        document.querySelector(".bookstore h1").setAttribute("hidden", true);
        document.querySelector(".section").removeAttribute("hidden");
        document.querySelector(".section .all-books").setAttribute("hidden", true);
        document.querySelector(".section .book-detail").setAttribute("hidden", true);
        document.querySelector(".section .delete-book").setAttribute("hidden", true);
        document.querySelector(".section .form").setAttribute("hidden", true);
        document.querySelector(".section .edit-book").removeAttribute("hidden");
        document.querySelector(".section .customers").setAttribute("hidden", true);
        document.querySelector(".section .cart").setAttribute("hidden", true);
        document.querySelector(".section .all-books-user").setAttribute("hidden", true);
        document.querySelector(".ebook").value = e.target.parentNode.classList[2];
        document.querySelector(".edit-book .book-name").value = e.target.parentNode.classList[2];
    }
    if (e.target.id == "delete-book") {
        document.querySelector(".bookstore h1").setAttribute("hidden", true);
        document.querySelector(".section").removeAttribute("hidden");
        document.querySelector(".section .all-books").setAttribute("hidden", true);
        document.querySelector(".section .book-detail").setAttribute("hidden", true);
        document.querySelector(".section .delete-book").removeAttribute("hidden");
        document.getElementById("delete").removeAttribute("hidden");
        document.getElementById("buy").setAttribute("hidden", true);
        document.querySelector(".section .edit-book").setAttribute("hidden", true);
        document.querySelector(".section .form").setAttribute("hidden", true);
        document.querySelector(".section .customers").setAttribute("hidden", true);
        document.querySelector(".section .cart").setAttribute("hidden", true);
        document.querySelector(".section .all-books-user").setAttribute("hidden", true);
        document.querySelector(".section .delete-book .book-name").value = e.target.parentNode.classList[2];
    }
    if (e.target.id == "book-detail") {
        document.querySelector(".bookstore h1").setAttribute("hidden", true);
        document.querySelector(".section").removeAttribute("hidden");
        document.querySelector(".section .all-books").setAttribute("hidden", true);
        document.querySelector(".section .book-detail").removeAttribute("hidden");
        document.querySelector(".section .delete-book").setAttribute("hidden", true);
        document.querySelector(".section .edit-book").setAttribute("hidden", true);
        document.querySelector(".section .form").setAttribute("hidden", true);
        document.querySelector(".section .customers").setAttribute("hidden", true);
        document.querySelector(".section .cart").setAttribute("hidden", true);
        document.querySelector(".section .all-books-user").setAttribute("hidden", true);
        document.querySelector(".book-detail .book-name").value = e.target.parentNode.classList[2];
    }
});

document.getElementById("customers").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".bookstore h1").setAttribute("hidden", true);
    document.querySelector(".section").removeAttribute("hidden");
    document.querySelector(".section .all-books").setAttribute("hidden", true);
    document.querySelector(".section .book-detail").setAttribute("hidden", true);
    document.querySelector(".section .delete-book").setAttribute("hidden", true);
    document.querySelector(".section .edit-book").setAttribute("hidden", true);
    document.querySelector(".section .form").setAttribute("hidden", true);
    document.querySelector(".section .customers").removeAttribute("hidden");
    document.querySelector(".section .cart").setAttribute("hidden", true);
    document.querySelector(".section .all-books-user").setAttribute("hidden", true);

    var tags = document.querySelectorAll(".section .customers .data3");
    tags.forEach((tag) => {
        tag.remove();
    });

    let book = "";
    var user = "";
    let price = "";
    let quantity = "";
    let total = "";
    onValue(ref(db, "usercart/"), (snapshot) => {
        const data = snapshot.val();
        for (let obj in data) {
            for (let obj1 in data[obj]) {
                if (obj1 == shopname) {
                    onValue(ref(db, `user/${obj}/`), (snapshot) => {
                        user = snapshot.val();
                        for (let book in data[obj][obj1]) {
                            book = book;
                            price = data[obj][obj1][book].price;
                            quantity = data[obj][obj1][book].quantity;
                            total = data[obj][obj1][book].total;
                            console.log(book, user.username, price, quantity, total);


                            var el = document.createElement("div");
                            el.className = `row data3 ${user.username} ${book} text-center text-info h5`;
                            document.querySelector(".section .customers").appendChild(el);
                            var cl1 = document.createElement("div");
                            cl1.className = "col col-md-2 col-12";
                            cl1.innerText = book;
                            document.querySelector(`.section .customers  .${book}`).appendChild(cl1);
                            var cl2 = document.createElement("div");
                            cl2.className = "col col-md-2 col-12";
                            cl2.innerText = user.username;
                            document.querySelector(`.section .customers .${book}`).appendChild(cl2);
                            var cl3 = document.createElement("div");
                            cl3.className = "col col-md-2 col-12";
                            cl3.innerText = price;
                            document.querySelector(`.section .customers .${book}`).appendChild(cl3);
                            var cl4 = document.createElement("div");
                            cl4.className = "col col-md-2 col-12";
                            cl4.innerText = quantity;
                            document.querySelector(`.section .customers .${book}`).appendChild(cl4);
                            var cl5 = document.createElement("div");
                            cl5.className = "col col-md-2 col-12 text-left";
                            cl5.innerText = total;
                            document.querySelector(`.section .customers .${book}`).appendChild(cl5);
                        }
                    });
                }
            }
        }
    });
});

document.getElementById("all-books-user").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".bookstore h1").setAttribute("hidden", true);
    document.querySelector(".section").removeAttribute("hidden");
    document.querySelector(".section .book-detail").setAttribute("hidden", true);
    document.querySelector(".section .delete-book").setAttribute("hidden", true);
    document.querySelector(".section .form").setAttribute("hidden", true);
    document.querySelector(".section .edit-book").setAttribute("hidden", true);
    document.querySelector(".section .all-books").setAttribute("hidden", true);
    document.querySelector(".section .all-books-user").removeAttribute("hidden");
    document.querySelector(".section .cart").setAttribute("hidden", true);
    document.querySelector(".section .customers").setAttribute("hidden", true);
});

document.querySelector(".all-books-user").addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName == "BUTTON") {
        document.querySelector(".bookstore h1").setAttribute("hidden", true);
        document.querySelector(".section .customers").setAttribute("hidden", true);
        document.querySelector(".section").removeAttribute("hidden");
        document.querySelector(".section .all-books").setAttribute("hidden", true);
        document.querySelector(".section .all-books-user").setAttribute("hidden", true);
        document.querySelector(".section .book-detail").setAttribute("hidden", true);
        document.querySelector(".section .delete-book").removeAttribute("hidden");
        document.getElementById("delete").setAttribute("hidden", true);
        document.getElementById("buy").removeAttribute("hidden");
        document.querySelector(".section .edit-book").setAttribute("hidden", true);
        document.querySelector(".section .form").setAttribute("hidden", true);
        document.querySelector(".section .delete-book .book-name").value = e.target.id;
    }
});

document.getElementById("cart").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".bookstore h1").setAttribute("hidden", true);
    document.querySelector(".section .customers").setAttribute("hidden", true);
    document.querySelector(".section").removeAttribute("hidden");
    document.querySelector(".section .book-detail").setAttribute("hidden", true);
    document.querySelector(".section .delete-book").setAttribute("hidden", true);
    document.querySelector(".section .form").setAttribute("hidden", true);
    document.querySelector(".section .edit-book").setAttribute("hidden", true);
    document.querySelector(".section .all-books").setAttribute("hidden", true);
    document.querySelector(".section .all-books-user").setAttribute("hidden", true);
    document.querySelector(".section .cart").removeAttribute("hidden", true);

    var tags = document.querySelectorAll(".section .cart .data2");
    tags.forEach((tag) => {
        tag.remove();
    });

    let book = "";
    var shop = "";
    let price = "";
    let quantity = "";
    let total = "";
    onValue(ref(db, `usercart/${bookusername}/`), (snapshot) => {
        const data = snapshot.val();
        for (let obj in data) {
            onValue(ref(db, `user/${obj}/`), (snapshot) => {
                shop = snapshot.val();
                for (let book in data[obj]) {
                    book = book;
                    price = data[obj][book].price;
                    quantity = data[obj][book].quantity;
                    total = data[obj][book].total;
                    console.log(book, shop.username, price, quantity, total);

                    var el = document.createElement("div");
                    el.className = `row data2 ${shop.username} ${book} text-center text-info h5`;
                    document.querySelector(".section .cart").appendChild(el);
                    var cl1 = document.createElement("div");
                    cl1.className = "col col-md-2 col-12";
                    cl1.innerText = book;
                    document.querySelector(`.section .cart  .${book}`).appendChild(cl1);
                    var cl2 = document.createElement("div");
                    cl2.className = "col col-md-2 col-12";
                    cl2.innerText = shop.username;
                    document.querySelector(`.section .cart .${book}`).appendChild(cl2);
                    var cl3 = document.createElement("div");
                    cl3.className = "col col-md-2 col-12";
                    cl3.innerText = price;
                    document.querySelector(`.section .cart .${book}`).appendChild(cl3);
                    var cl4 = document.createElement("div");
                    cl4.className = "col col-md-2 col-12";
                    cl4.innerText = quantity;
                    document.querySelector(`.section .cart .${book}`).appendChild(cl4);
                    var cl5 = document.createElement("div");
                    cl5.className = "col col-md-2 col-12 text-left";
                    cl5.innerText = total;
                    document.querySelector(`.section .cart .${book}`).appendChild(cl5);
                }
            });
        }
    });
});

document.querySelector(".section i").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".bookstore h1").removeAttribute("hidden");
    document.querySelector(".section").setAttribute("hidden", true);
});

document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("login-page").removeAttribute("hidden");
    document.querySelector("header ul").setAttribute("hidden", true);
    document.getElementById("user-page").setAttribute("hidden", true);
    document.querySelector(".section").setAttribute("hidden", true);
    document.querySelector(".bookstore h1").removeAttribute("hidden");
});

document.getElementById("logout-user").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("login-page").removeAttribute("hidden");
    document.querySelector("header ul").setAttribute("hidden", true);
    document.getElementById("user-page").setAttribute("hidden", true);
    document.querySelector(".section").setAttribute("hidden", true);
    document.querySelector(".bookstore h1").removeAttribute("hidden");
});

document.getElementById("register").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".bookstore h1").setAttribute("hidden", true);
    document.querySelector(".login").setAttribute("hidden", true);
    document.querySelector(".register").removeAttribute("hidden");
});

document.getElementById("login").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".bookstore h1").setAttribute("hidden", true);
    document.querySelector(".register").setAttribute("hidden", true);
    document.querySelector(".login").removeAttribute("hidden");
});

// database related logic
document.querySelector(".register button").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".bookstore h1").removeAttribute("hidden");
    var name = document.getElementById("name").value;
    var mobile = document.getElementById("mob").value;
    var email = document.getElementById("uname").value;
    var password = document.getElementById("pass").value;
    var uuser = "";
    if (document.getElementById("book-shop").checked) {
        uuser = document.getElementById("book-shop").value
    }
    if (document.getElementById("book-user").checked) {
        uuser = document.getElementById("book-user").value
    }
    if (name !== "" && email !== "" && password !== "") {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...

                set(ref(db, 'user/' + user.uid), {
                    username: name,
                    email: email,
                    mobile: mobile,
                    uuser: uuser,
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorMessage);
            });
    }
    else {
        alert("fill all credentials");
    }
    document.getElementById("name").value = "";
    document.getElementById("mob").value = "";
    document.getElementById("uname").value = "";
    document.getElementById("pass").value = "";
    document.querySelector(".register").setAttribute("hidden", true);
});

document.querySelector(".login button").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".bookstore h1").removeAttribute("hidden");
    document.querySelector(".login").setAttribute("hidden", true);
    var name = document.getElementById("login-name").value;
    var pass = document.getElementById("login-pass").value;
    if (name !== "" && pass !== "") {
        signInWithEmailAndPassword(auth, name, pass)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                onValue(ref(db, 'user/' + user.uid), (snapshot) => {
                    const data = snapshot.val();
                    if (data.uuser == "bookshop") {
                        document.getElementById("login-page").setAttribute("hidden", true);
                        document.querySelector("header ul").removeAttribute("hidden");
                        shopname = user.uid;
                    }
                    else {
                        document.getElementById("login-page").setAttribute("hidden", true);
                        document.getElementById("user-page").removeAttribute("hidden");
                        bookusername = user.uid;
                    }
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }
    else {
        alert("enter all currect credentials");
    }
    document.getElementById("login-name").value = "";
    document.getElementById("login-pass").value = "";
});

document.getElementById("all-books").addEventListener("click", (e) => {
    var tags = document.querySelectorAll(".section .all-books .data");
    tags.forEach((tag) => {
        tag.remove();
    });
    const starCountRef = ref(db, 'books/' + shopname);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        for (var obj in data) {
            console.log(data[obj]);
            var el = document.createElement("div");
            el.className = `row data ${data[obj].bname} text-center text-info h5`;
            document.querySelector(".section .all-books").appendChild(el);
            var cl1 = document.createElement("img");
            cl1.className = "col col-md-3 col-12";
            cl1.src=`${data[obj].bimage}`;
            document.querySelector(`.section .all-books .${data[obj].bname}`).appendChild(cl1);
            var cl2 = document.createElement("button");
            cl2.className = "col col-md-3 col-12";
            cl2.setAttribute("id", "edit-book");
            cl2.innerText = "Edit";
            document.querySelector(`.section .all-books .${data[obj].bname}`).appendChild(cl2);
            var cl3 = document.createElement("button");
            cl3.className = "col col-md-3 col-12";
            cl3.setAttribute("id", "delete-book");
            cl3.innerText = "Delete";
            document.querySelector(`.section .all-books .${data[obj].bname}`).appendChild(cl3);
            var cl4 = document.createElement("button");
            cl4.className = "col col-md-3 col-12";
            cl4.setAttribute("id", "book-detail");
            cl4.innerText = "View";
            document.querySelector(`.section .all-books .${data[obj].bname}`).appendChild(cl4);
        }
    });
});

document.getElementById("add").addEventListener("click", (e) => {
    e.preventDefault();
    const book_name = document.querySelector(".section .form .book-name").value;
    const auther_name = document.querySelector(".section .form .auther-name").value;
    const book_image = document.querySelector(".section .form .book-image").files[0];
    const book_price = document.querySelector(".section .form .book-price").value;
    const book_quantity = document.querySelector(".section .form .book-quantity").value;


    if (book_name !== "" && auther_name !== "" && book_image !== "" && book_price !== "" && book_quantity !== "") {
        const boookimage = sref(storage, `"${shopname}"/` + book_image.name);
        uploadBytes(boookimage, book_image).then((snapshot) => {
            alert('book uploaded');
        });

        getDownloadURL(sref(boookimage))
            .then((url) => {
                set(ref(db, `books/${shopname}/` + book_name), {
                    bname: book_name,
                    aname: auther_name,
                    bimage: url,
                    bprice: book_price,
                    bquantity: book_quantity
                })
            })
            .catch((error) => {
                // Handle any errors
            });
    }
    else {
        alert("fill all currect credentials");
    }

    document.querySelector(".section .form .book-name").value = "";
    document.querySelector(".section .form .auther-name").value = "";
    document.querySelector(".section .form .book-image").value = "";
    document.querySelector(".section .form .book-price").value = "";
    document.querySelector(".section .form .book-quantity").value = "";
});

document.getElementById("edit").addEventListener("click", (e) => {
    e.preventDefault();
    var ebook_name = document.querySelector(".ebook").value;
    const book_name = document.querySelector(".edit-book .book-name").value;
    const auther_name = document.querySelector(".edit-book .auther-name").value;
    const book_price = document.querySelector(".edit-book .book-price").value;
    const book_quantity = document.querySelector(".edit-book .book-quantity").value;
    if (ebook_name !== "") {
        if (book_name !== "") {
            const dbRef = ref(db, `books/${shopname}/${ebook_name}/`)
            update(dbRef, { bname: book_name }).then(() => {
            }).catch((e) => {
                alert(e);
            })
        }
        if (auther_name !== "") {
            const dbRef = ref(db, `books/${shopname}/${ebook_name}/`)
            update(dbRef, { aname: auther_name }).then(() => {
            }).catch((e) => {
                alert(e);
            })
        }
        if (book_price !== "") {
            const dbRef = ref(db, `books/${shopname}/${ebook_name}/`)
            update(dbRef, { bprice: book_price }).then(() => {
            }).catch((e) => {
                alert(e);
            })
        }
        if (book_quantity !== "") {
            const dbRef = ref(db, `books/${shopname}/${ebook_name}/`)
            update(dbRef, { bquantity: book_quantity }).then(() => {
            }).catch((e) => {
                alert(e);
            })
        }
        alert("book updated");
    }
    else {
        alert(" Enter Book Name");
    }
    var tags = document.querySelectorAll(".edit-book input");
    tags.forEach((tag) => {
        tag.value = "";
    });
});

document.getElementById("delete").addEventListener("click", (e) => {
    e.preventDefault();
    const book_name = document.querySelector(".section .delete-book .book-name").value;
    const book_quantity = document.querySelector(".section .delete-book .book-quantity").value;

    if (book_name !== "" && book_quantity !== "") {
        var bkquantity = "";
        onValue(ref(db, `books/${shopname}/` + book_name), (snapshot) => {
            const data = snapshot.val();
            bkquantity = data.bquantity;
        });
        const dbRef = ref(db, `books/${shopname}/${book_name}/`)
        update(dbRef, { bquantity: parseInt(bkquantity) - parseInt(book_quantity) }).then(() => {
            alert("books deleted");
        }).catch((e) => {
            alert(e);
        })
    }
    else {
        alert("fill all currect credentials");
    }

    document.querySelector(".section .delete-book .book-name").value = "";
    document.querySelector(".section .delete-book .book-quantity").value = "";
});

document.querySelector(".book-detail .book-name").addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        const book_name = document.querySelector(".book-detail .book-name").value;
        if (book_name !== "") {
            onValue(ref(db, `books/${shopname}/` + book_name), (snapshot) => {
                const data = snapshot.val();
                document.getElementById("book").innerText = data.bname;
                document.getElementById("auther").innerText = data.aname;
                document.getElementById("price").innerText = data.bprice;
                document.getElementById("quantity").innerText = data.bquantity;
            });
        }
        else {
            alert("Enter currect credentials");
        }

        document.querySelector(".book-detail .book-name").value = "";
    }
});

document.getElementById("all-books-user").addEventListener("click", (e) => {
    var tags = document.querySelectorAll(".all-books-user .all-shops ul li");
    tags.forEach((tag) => {
        tag.remove();
    });
    const starCountRef = ref(db, 'user/');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        for (var obj in data) {
            if (data[obj].uuser !== "bookuser") {
                var el = document.createElement("li");
                el.className = obj;
                el.innerText = data[obj].username;
                document.querySelector(".section .all-books-user .all-shops ul").appendChild(el);
            }
        }
    });
});

document.querySelector(".all-books-user .all-shops ul").addEventListener("click", (e) => {
    e.preventDefault();
    shopname_for_buy = e.target.className;
    var tags = document.querySelectorAll(".section .all-books-user .data1");
    tags.forEach((tag) => {
        tag.remove();
    });
    const starCountRef = ref(db, 'books/' + e.target.className);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        for (var obj in data) {
            var el = document.createElement("div");
            el.className = `row data1 ${data[obj].bname} text-center text-info h5`;
            document.querySelector(`.section .all-books-user `).appendChild(el);
            var cl1 = document.createElement("div");
            cl1.className = "col col-md-3 col-12";
            cl1.innerText = data[obj].bname;
            document.querySelector(`.section .all-books-user .${data[obj].bname}`).appendChild(cl1);
            var cl2 = document.createElement("div");
            cl2.className = "col col-md-3 col-12";
            cl2.innerText = data[obj].bprice;
            document.querySelector(`.section .all-books-user .${data[obj].bname}`).appendChild(cl2);
            var cl3 = document.createElement("div");
            cl3.className = "col col-md-3 col-12";
            cl3.innerText = data[obj].bquantity;
            document.querySelector(`.section .all-books-user  .${data[obj].bname}`).appendChild(cl3);
            var cl4 = document.createElement("button");
            cl4.className = " col col-md-3 col-12";
            cl4.setAttribute("id", `${data[obj].bname}`);
            cl4.innerText = "Buy-Book";
            document.querySelector(`.section .all-books-user .${data[obj].bname}`).appendChild(cl4);
        }
    });
});

document.getElementById("buy").addEventListener("click", (e) => {
    e.preventDefault();
    const buy_book_name = document.querySelector(".section .delete-book .book-name").value;
    const buy_book_quantity = document.querySelector(".section .delete-book .book-quantity").value;
    console.log(buy_book_name, buy_book_quantity, shopname_for_buy, bookusername);

    //buy section
    if (buy_book_name !== "" && buy_book_quantity !== "") {
        var bkquantity = "";
        var price = "";
        onValue(ref(db, `books/${shopname_for_buy}/` + buy_book_name), (snapshot) => {
            const data = snapshot.val();
            bkquantity = data.bquantity;
            price = data.bprice;
        });
        const dbRef = ref(db, `books/${shopname_for_buy}/${buy_book_name}/`)
        update(dbRef, { bquantity: parseInt(bkquantity) - parseInt(buy_book_quantity) }).then(() => {
            alert("Books Added In Cart");
        }).catch((e) => {
            alert(e);
        })

        // add cart section
        set(ref(db, `usercart/${bookusername}/${shopname_for_buy}/` + buy_book_name), {
            quantity: buy_book_quantity,
            price: price,
            total: parseInt(price) * parseInt(buy_book_quantity),
        });
    }
    else {
        alert("fill all currect credentials");
    }
    document.querySelector(".section .delete-book .book-name").value = "";
    document.querySelector(".section .delete-book .book-quantity").value = "";
});

/*function deletedemo(){
    remove(ref(db, `books/EkiNz4cPEAQKSdoFdfQCfmwZV3B2`));
}
deletedemo(); */