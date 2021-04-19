const URL_PREFIX='http://localhost:3000/';

function loadBooks() {
    let url = URL_PREFIX + `books`;
    fetch(url)
        .then(response => response.json())
        .then(function(result){
            document.getElementById('list').innerHTML = '';
            result.forEach(element => {
                createBookList(element);
            });
        })
        .catch(function(error){
            console.log(error.message);
        });
}

function createBookList(ele) {
    let li = document.createElement('li');
    li.textContent = ele.title;
    li.style.cursor = 'pointer';
    li.addEventListener('click', function(error){
        error.preventDefault();
        itemBook(ele.id);
    })
    document.getElementById('list').appendChild(li);
}

function itemBook(int) {
    let url = URL_PREFIX + `books/${int}` ;
    fetch(url)
        .then(response=>response.json())
        .then(function(result){
            document.getElementById('show-panel').innerHTML = ``;
            showBook(result);
        })
        .catch(function(error){
            console.log(error.message);
        });
}

function showBook(obj) {
    let i = document.createElement('img')
    i.src = obj.img_url;
    let h4Title = document.createElement('h4');
    h4Title.appendChild(document.createTextNode(obj.title));
    let h4SubTitle = document.createElement('h4');
    h4SubTitle.appendChild(document.createTextNode(obj.subtitle));
    let h4Author = document.createElement('h4');
    h4Author.appendChild(document.createTextNode(obj.author));
    let txtDescrition = document.createTextNode(obj.description);

    document.getElementById('show-panel').appendChild(i);
    document.getElementById('show-panel').appendChild(h4Title);
    document.getElementById('show-panel').appendChild(h4SubTitle);
    document.getElementById('show-panel').appendChild(h4Author);
    document.getElementById('show-panel').appendChild(txtDescrition);

    document.getElementById('show-panel').appendChild(showLiker(obj.users));

    document.getElementById('show-panel').appendChild(btnLike(obj));

}

function showLiker(likers) {
    let ul = document.createElement('ul');
    likers.forEach(item=>{
        let li = document.createElement('li');
        li.textContent = item.username;
        ul.appendChild(li);
    })
    return ul;
}

function btnLike(obj) {
    let btn = document.createElement('input');
    btn.type = 'button';
    if (obj.users.filter(item=>item.id==1).length > 0) {
        dislike(btn,obj);
    } else {
        like(btn,obj);
    }
    return btn;
}

function dislike(btn,obj) {
    btn.value = 'Dislike';
    btn.addEventListener('click', function(error){
        error.preventDefault();
        removeLike(obj);
    })
}

function removeLike(obj) {
    let likers = obj.users.filter(item => item.id != 1);
    upDateLiker(likers, obj);
}

function like(btn,obj) {
    btn.value = 'Like';
    btn.addEventListener('click', function(error){
        error.preventDefault();
        pushLike(obj);
    })
}

function pushLike(obj) {
    //
    let likers = obj.users;
    let objMe = {
        id: 1,
        username: 'pouros'
    };

    likers.push(objMe);
    upDateLiker(likers,obj);
}

function upDateLiker(likers, obj){
    let url = URL_PREFIX + `books/${obj.id}`;
    obj.users = likers;
    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(response=>response.JSON())
    .then()
    .catch(function(error){
        console.log(error.message);
    })
}

document.addEventListener("DOMContentLoaded", function() {
    loadBooks();
});
