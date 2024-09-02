import { useState } from "react";

const friendData = [
  {id:1, name:"Ram", image:"./user.png", balance: 0},
  {id:2, name:"Shyam", image:"./user.png", balance: 5},
  {id:3, name:"Rita", image:"./user.png", balance: -7}
]

export default function App(){

  const[addForm,setAddForm] = useState(false);

  function handleAddFriend(){
    setAddForm(!addForm);
  }
  
  
  return <div className="all">
    <div className="left">
    <FriendList addForm={addForm} handleAddFriend={handleAddFriend}/>
    <div className="addBtnContainer">
    <button 
    className="addBtn"
    onClick={handleAddFriend}
    style={addForm?{display:"none"}:{}}
    >
      Add Friend</button>
    </div>
    <FriendForm addForm={addForm} handleAddFriend={handleAddFriend} />
    </div >
    <SplitForm />
  </div>
}


function FriendList({addForm,handleAddFriend}){
  return <div className="">
    {friendData.map((user)=>{
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

function FriendForm({addForm, handleAddFriend}){

  function handleSubmit(event) {
    event.preventDefault();
  }

  return <div className="friendForm" style={addForm?{display:"flex"}:{}}>
    <form onSubmit={handleSubmit}>
    <div className="top">
      <label for="inpName">Friend Name: </label>
      <input name="inpName" type="text" className="inpName"></input>
    </div>
    <div className="bottom">
      <label for="inpURL">Image URL:  </label>
      <input name="inpName" type="text" className="inpURL"></input>
    </div>
    <div className="addBtnContainer"><button className="addBtn">Add</button></div>
    <button className="closeBtn" onClick={(e)=>handleAddFriend(e.preventDefault)}>close</button>
    </form>
  
  </div>
}

function SplitForm(){
  return<div className="right">Eat and Split:</div>
}