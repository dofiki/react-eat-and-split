import { useState } from "react";

const friendData = [
  {id:1, name:"Ram", image:"./user.png", balance: 0},
  {id:2, name:"Shyam", image:"./user.png", balance: 5},
  {id:3, name:"Rita", image:"./user.png", balance: -7}
]

export default function App(){

  const[addForm,setAddForm] = useState(false);
  const[addFren,setAddFren] = useState(friendData);

  function handleAddFriend(){
    setAddForm(!addForm);
  }

  function handleAddFren(newFriend){
    setAddFren((friendData)=>[...friendData,newFriend]);
    setAddForm(false);
  }
  
  return <div className="all">

    <div className="left">

      <FriendList addForm={addForm} handleAddFriend={handleAddFriend} addFren={addFren} />

      <div className="addBtnContainer"><button  className="addBtn"
      onClick={handleAddFriend} style={addForm?{display:"none"}:{}}>Add Friend</button>
      </div>

      <FriendForm addForm={addForm} handleAddFriend={handleAddFriend} handleAddFren={handleAddFren}/>

    </div >

    <SplitForm />

  </div>
}

function FriendList({addFren}){
  return <div className="">
    {addFren.map((user)=>{
      return <Friend 
      key={user.id} 
      name={user.name} 
      image={user.image}
      balance={user.balance}/>

      
  })}
  </div>
}

function Friend({name, image, balance}){

  function handleBalance(bal){
    if(bal===0){
      return <p className="userDescription" >you are all clear</p>
    }else if(bal<0){
      return <p className="userDescription" style={{color:"red"}} >you owe {name} ${Math.abs(bal)}.</p>
    }else{
      return <p className="userDescription" style={{color:"green"}} >{name} owes you ${Math.abs(bal)}.</p>
    }
  }

  return <div className="eachFriend">
   <div className="userInfo">
   <img src={image} alt="profile-photo" className="userImage"/>
    <div className="userInfoText">
      <h3 className="userName">{name}</h3>
      {handleBalance(balance)}
    </div>
   </div>
    <button className="selectBtn">select</button>
  </div>
}

function FriendForm({addForm, handleAddFriend, handleAddFren}){
 
  const [nam, setNam] = useState("");
  const [tasbir, setTasbir] = useState("./user.png");

  function handleSubmit(event) {
    event.preventDefault();

    if(!nam || !tasbir ) return;

    const newFriend = {
      id: crypto.randomUUID(), 
      name: nam, 
      image: tasbir, 
      balance: 0,
    };

    handleAddFren(newFriend);
    console.log(newFriend);
    setNam("");
    setTasbir("./user.png");
  }


  return <div className="friendForm" style={addForm?{display:"flex"}:{}}>
    <form onSubmit={handleSubmit}>
    <div className="top">
      <label for="inpName">Friend Name: </label>
      <input type="text" className="inpName" id="inpName" value={nam} onChange={(e)=>setNam(e.target.value)}></input>
    </div>
    <div className="bottom">
      <label for="inpURL">Image URL:  </label>
      <input  type="text" className="inpURL" id="inpURL" value={tasbir} onChange={(e)=>setTasbir(e.target.value)}></input>
    </div>
    <div className="addBtnContainer"><button className="addBtn" >Add</button></div>
    <button className="closeBtn" onClick={handleAddFriend}>close</button>
    </form>
  
  </div>
}

function SplitForm(){
  return<div className="right">
    <h2>SPLIT A BILL WITH X</h2>
    <form className="splitForm">
      <div>
      <label for="billValue">Bill value:  </label>
      <input id="billValue" type="number" className="billInp"></input>
      </div>
      <div>
      <label for="yourExpense">Your expense:  </label>
      <input id="yourExpense" type="number" className="billInp"></input>
      </div>
      <div>
      <label for="xExpense">X's expense:  </label>
      <input id="xExpense" type="number" className="billInp"></input>
      </div>

     <div className="choose">
     <label for="users" >Who is paying the bill ?</label>
      <select name="users" id="chooseUser">
        <option value="Rita">Rita</option>
        <option value="you">you</option>
      </select>
     </div>

      <div className="splitBtnContainer">
        <button className="splitBtn">Split bill</button>
      </div>

    </form>
  </div>
}