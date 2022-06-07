
var req =new XMLHttpRequest();
req.open("GET","./json/image_list.json");
req.onreadystatechange = function(){
	if( this.readyState == 4){
		//console.log(this.response);
	var date = JSON.parse(this.response);
		for(var i = 0; i< date.length ; i++){
		var div	= document.createElement("div");
			div.setAttribute("class","image");
			div.onclick = function(){
				// if( this.getAttribute("class").indexOf("image-selected")== -1){
				// 	this.setAttribute("class", "image image-selected");
				// }
				// else{
				// 	this.setAttribute("class", "image");
				// }
				this.classlist.toggle("image-selected");
			
			var img = document.createElement("img");
			img.src = date[i];
			div.appendChild(img);
			document.body.appendChild(div);
			
		}
	}
}
req.send();
	
	const addItemsAction = document.querySelector('.addItems-action');
const input = document.querySelector('.addItems-input');
const submit = document.querySelector('.addItems-submit');

const list = document.querySelector('.grocery-list');
const displayItemsAction = document.querySelector('.displayItems-action');
const clear = document.querySelector('.displayItems-clear');

// event listeners 추가
//Submit listener
submit.addEventListener('click', addItem);
// local storage 체크
document.addEventListener('DOMContentLoaded', displayStorage);
// 전체 삭제
clear.addEventListener('click', removeItems);
// 하나씩 삭제
list.addEventListener('click', removeSingleItem);


// 등록
function addItem(event){
    event.preventDefault();
    let value = input.value;
    if (value === ''){
        showAction(addItemsAction, '내용을 입력해 주세요.', false);
    } else {
        showAction(addItemsAction, `'${value}'\n내용이 리스트에 등록되었습니다. `, true);
        createItem(value);
        updateStorage(value);
    }
}


// 위 '등록'함수에서 사용된다.
function showAction(element, text, value){
    if (value === true){
        element.classList.add('success');
        element.innerText = text;
        input.value = '';
        setTimeout(function(){
            element.classList.remove('success');
        }, 3000)
    } else {
        element.classList.add('alert');
        element.innerText = text;
        input.value = '';
        setTimeout(function(){
            element.classList.remove('alert');
        }, 3000)
    }
}


// 리스트 생성 
function createItem(value){
    let parent = document.createElement('div');
        parent.classList.add('grocery-item');

    // let title = document.createElement('h4');
    //     title.classList.add('grocery-item__title');

    parent.innerHTML = `<h4 class="grocery-item__title">${value}</h4>
    <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt"></i>
    </a>`

    list.appendChild(parent);
}


// 업데이트 storage
function updateStorage(value){
    let groceryList;
    
    groceryList = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : [];

    groceryList.push(value);
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
}

// local storage 내용으로 리스트 보여주기
function displayStorage(){
    let exists = localStorage.getItem('groceryList');
    
    if(exists){
        let storageItems = JSON.parse(localStorage.getItem('groceryList'));
        storageItems.forEach(function(element){
            createItem(element);
        })
    }
}


// 리스트 전체 삭제
function removeItems(){
    // local storage에서 지우기
    localStorage.removeItem('groceryList');
    let items = document.querySelectorAll('.grocery-item');
    
    if(items.length > 0){
        showAction(displayItemsAction, '전체 리스트가 삭제 되었습니다.', false);
        items.forEach(function(element){
            list.removeChild(element);
        })
    } else {
        showAction(displayItemsAction, '삭제할 리스트가 없습니다.', false);
    }
}


// 리스트 개별 삭제
function removeSingleItem(event){
    event.preventDefault();
    
    let link = event.target.parentElement;
    if(link.classList.contains('grocery-item__link')){
        let text = link.previousElementSibling.innerHTML;
        let groceryItem = event.target.parentElement.parentElement;
        // list에서 지우기

        list.removeChild(groceryItem);
        showAction(displayItemsAction,`'${text}'\n내용이 리스트에서 삭제되었습니다.`, true);

        // local storage 에서 지우기
        editStorage(text);

    }
}



function editStorage(item){
    let groceryItems = JSON.parse(localStorage.getItem('groceryList'));
    let index = groceryItems.indexOf(item);
    
    groceryItems.splice(index, 1);
    // 기존 리스트 삭제
    localStorage.removeItem('groceryList');
    // 새로운 업데이트 / 수정 목록 추가
    localStorage.setItem('groceryList', JSON.stringify(groceryItems));

}
const form = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clearButton = document.querySelector('#clear-list');

let todoItems = [];


// 아이콘 기능들
const handleItem = function(itemName){

    const items = itemList.querySelectorAll('.item');
 
    items.forEach(function(item){
        
        if(item.querySelector('.item-name').textContent === itemName){
            // 완료 시
            item.querySelector('.complete-item').addEventListener('click', function(){
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            });
            // 수정 : 현재 코드에서는 삭제와 기능 같음
            item.querySelector('.edit-item').addEventListener('click', function(){
                itemInput.value = itemName;
                itemList.removeChild(item);

                todoItems = todoItems.filter(function(item){
                    return item !== itemName;
                });
            });
            // 삭제
            item.querySelector('.delete-item').addEventListener('click', function(){
                debugger;
                itemList.removeChild(item);

                todoItems = todoItems.filter(function(item){
                    return item !== itemName;
                });

                showFeedback('item delete', 'success');
            })
        }
    })
}


// 리스트 삭제
const removeItem = function(item){
    console.log(item);
    const removeIndex = (todoItems.indexOf(item));
    console.log(removeIndex);
    todoItems.splice(removeIndex, 1);
}


// 리스트 생성 및 아이콘 추가
const getList = function(todoItems){
    itemList.innerHTML = '';

        todoItems.forEach(function(item){
            itemList.insertAdjacentHTML('beforeend', `<div class="item my-3"><h5 class="item-name text-capitalize">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>` );

            handleItem(item);
        });
}



// JSON데이터를 string으로 변환
const getLocalStorage = function(){

    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage === 'undefined' || todoStorage === null){
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
}

