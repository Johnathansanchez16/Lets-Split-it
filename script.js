
let people = [];
var totalBalance=0;
var tax=0;
var tip=0;
let numOfPeople=0;
var totalItems=new Map();
var fairTaxSplit=true;
var fairTipSplit=true;
//people is a list of Person objects

function addPerson(){
var newPerson=document.querySelector('.person').cloneNode(true);
var newAddButton=document.querySelector('#addButton').cloneNode(true);
remove('#addButton');
newPerson.id=numOfPeople;
numOfPeople++;
people.push(new Person("person "+(numOfPeople)));
console.log("potential issue: new person id: "+newPerson.id +" new person name: "+people[newPerson.id].name);
newPerson.querySelector('.name').textContent = people[newPerson.id].name;
newPerson.querySelector('.balance').textContent='$'+ people[newPerson.id].balance.toFixed(2);
newPerson.querySelector('.taxes').textContent='taxes+tip: $'+ people[newPerson.id].tax.toFixed(2);
newPerson.querySelector('.total').textContent='total: $'+(people[newPerson.id].balance+people[newPerson.id].tax).toFixed(2);
newPerson.style.display="block";
append('.row',newPerson);
append('.row',newAddButton);
document.querySelector('.numOfPeople').textContent="number of people: "+people.length;
}

function removePerson(element){
    var id=document.querySelector('.person-window').dataset.value;
    var person=people[id];
    totalBalance-=person.balance;
    numOfPeople-=1;
    document.getElementById(id).remove();
    if(people.length==1){
        people=[];
    }
    else if(id==0){
        people.splice(0,1);
        for(let i=id;i<people.length;i++){
            var docId=i;
            docId++;
            console.log("old element id:"+docId+ " new id: "+i);
            document.getElementById(docId).id=i;
        }
    }
    else{
    console.log("people.length before splice: "+people.length);
        people.splice(id,1);
        console.log("id= "+id+" people length: "+people.length);
        for(let i=id;i<people.length;i++){
        var docId=i;
        docId++;
        console.log("id: "+document.getElementById(docId).id+" i = "+i);
        document.getElementById(docId).id=i;
        }

    }
    for(let i=0;i<people.length;i++){
    console.log(people[i]);
    }

    closeWindow();
}

function select(element){
var id=element.id;
console.log(id);
document.querySelector('.person-window').dataset.value=id;
document.querySelector('.person-window').style.display="block";
document.querySelector('.popup').style.display="block";
document.querySelector('.person-window .name').value = people[id].name;
printListItemsFromIndex(id);
document.querySelector('.person-window .balance').textContent='balance: $'+ people[id].balance.toFixed(2);
document.querySelector('.person-window .taxes').textContent='taxes+tip: $'+ (people[id].tax+people[id].tip).toFixed(2);
document.querySelector('.person-window .total').textContent='total balance: $'+(people[id].balance+people[id].tax).toFixed(2);
}

function closeWindow(){
list=document.querySelector('.items');
newListItem=document.querySelector('.item').cloneNode(true);
while (list.firstChild) {
list.removeChild(list.firstChild);
}
append('.items',newListItem);
document.querySelector('.person-window').style.display="none";
document.querySelector('.popup').style.display="none";
}

document.querySelector('.popup').addEventListener('click', function(event) {
if (event.target == this) {
closeWindow();
}
});

document.querySelector('.person-window .name').addEventListener('keypress', function(event){
if(event.key==='Enter'){
let newName=event.target.value;
let id=document.querySelector('.person-window').dataset.value;
people[id].name=newName;
console.log(people[id]);
document.getElementById(id).querySelector('.name').textContent=newName;
}
});

function itemNameChange(element){
index=element.closest('li').dataset.value;
id=document.querySelector('.person-window').dataset.value;
person=people[id];
person.items[index][0]=element.value;
}

function itemPriceChange(element){
index=element.closest('li').dataset.value;
id=document.querySelector('.person-window').dataset.value;
person=people[id];
console.log("index: "+index+" element.value: "+element.value);
person.items[index][1]=element.value;
person.balance=Number(0);
for(let [name,price] of person.items){
person.balance+=Number(price);
}
console.log("person balance= "+person.balance+", id:"+id);
document.getElementById(id).querySelector('.balance').textContent='balance: $'+ Number(person.balance).toFixed(2);
document.querySelector('.person-window .balance').textContent='balance: $'+Number(person.balance).toFixed(2);
document.querySelector('.person-window .total').textContent='total balance: $'+Number(person.balance).toFixed(2);
const total = Number(person.tax)+Number(person.tip)+Number(person.balance);
document.getElementById(id).querySelector('.total').textContent='total: $'+total.toFixed(2);
totalBalance=sum(people);
document.querySelector('.sumOfBalances').textContent="Total before tax: $"+totalBalance.toFixed(2);
console.log(sum(people));
var masterBalance=Number(totalBalance);
masterBalance+=Number(tax);
masterBalance+=Number(tip);
document.querySelector('.MasterBalance').textContent='statement total: $'+masterBalance.toFixed(2);
}


function sum(people) {
    return people.reduce((total, person) => total + Number(person.balance), 0);
}

function newItem(){
var id=document.querySelector('.person-window').dataset.value;
var person=people[id];
var list=person.items;
person.items.push(['unnamed item',]);
var cloneItem=document.querySelector('.item').cloneNode(true);
cloneItem.dataset.value=list.length-1;
console.log("cloneItem dataset value:" + cloneItem.dataset.value);
cloneItem.style.display="block";
append('.items',cloneItem);
}

function deleteListItem(element){
var id=document.querySelector('.person-window').dataset.value;
var person=people[id];
var listItem=element.closest('li');
var index=listItem.dataset.value;
console.log("splice(index,index): "+index);
if(person.items.length==1){
person.items=[];
}
if(index==0){
person.items.splice(0,1);
}
else{
person.items.splice(index,1);
}
console.log("items after splice: "+person.items);
listItem.remove();
}

function printListItemsFromIndex(a){
var person=people[a];
var list=person.items;
console.log(list.length);
if(list.length===0){
return;
}
var cloneItem;
for(let [name,price] of list){
cloneItem=document.querySelector('.item').cloneNode(true);
cloneItem.style.display='block';
cloneItem.querySelector('.object-name').value=name;
cloneItem.querySelector('.object-price').value=price;
append('.items',cloneItem);
}
}

document.getElementById('tax').addEventListener('keypress', function(event){
if(event.key==='Enter'){
if(people.length==0){
document.querySelector('#tax-tip-error').style.display="block";
setTimeout(function(){
document.querySelector('#tax-tip-error').style.display="none";
},5000);
}
}
tax=event.target.value;
console.log("tax= "+tax);
if(fairTaxSplit){
for(let i=0;i<people.length;i++){
people[i].tax=(people[i].balance/totalBalance)*(tax);
updateTaxTip(i);
}
}
else{
for(let i=0;i<people.length;i++){
people[i].tax=tax/people.length;
updateTaxTip(i);
}
}
});

document.getElementById('tip').addEventListener('keypress', function(event){
if(event.key==='Enter'){
if(people.length==0){
document.querySelector('#tax-tip-error').style.display="block";
setTimeout(function(){
document.querySelector('#tax-tip-error').style.display="none";
},5000);
}
}
tip=event.target.value;
console.log("tip= "+tip);
if(fairTipSplit){
for(let i=0;i<people.length;i++){
people[i].tip=(people[i].balance/totalBalance)*(tip);
updateTaxTip(i);
}
}
else{
for(let i=0;i<people.length;i++){
people[i].tip=tip/people.length;
updateTaxTip(i);
}
}
});

function updateTaxTip(i){
console.log(i);
var newPerson=document.getElementById(i);
console.log("person "+i+" tax:$"+people[i].tax+" tip:$"+ people[i].tip);
newPerson.querySelector('.taxes').textContent='taxes+tip: $'+ (people[i].tax+people[i].tip).toFixed(2);
newPerson.querySelector('.total').textContent='total: $'+(people[i].balance+people[i].tax+people[i].tip).toFixed(2);

document.querySelector('.person-window .taxes').textContent='taxes+tip: $'+ (people[i].tax+people[i].tip).toFixed(2);
document.querySelector('.person-window .total').textContent='total balance: '+(people[i].balance+people[i].tax+people[i].tip).toFixed(2);
var masterBalance=Number(totalBalance);
masterBalance+=Number(tax);
masterBalance+=Number(tip);
document.querySelector('.MasterBalance').textContent='statement total: $'+masterBalance.toFixed(2);
}

function updateTip(){
var newPerson=document.getElementById(i);
console.log("person "+i+" tip:$"+people[i].tip+" tip:$"+ people[i].tip);
newPerson.querySelector('.taxes').textContent='taxes+tip: $'+ (people[i].tax+people[i].tip);
newPerson.querySelector('.total').textContent='total: $'+(people[i].balance+people[i].tax+people[i].tip);

document.querySelector('.person-window .taxes').textContent='taxes+tip: $'+ (people[i].tax+people[i].tip);
document.querySelector('.person-window .total').textContent='total balance: $'+(people[i].balance+people[i].tax+people[i].tip);
}

function taxSplitChange(){
fairTaxSplit=!fairTaxSplit;
}

function tipSplitChange(){
fairTipSplit=!fairTipSplit;
}

function append(a, b){
document.querySelector(a).appendChild(b);
}
function remove(a){
document.querySelector(a).remove();
}


class Person{
constructor(name){
this.name = name;
this.balance = 0;
this.items = [];
this.tax=0;
this.tip=0;
}
addItem(item,price){
item.add(item,price);
}
}
