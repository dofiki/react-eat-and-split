import { useState } from "react";

const friendData = [
  // {id:1, name:"Ram", image:"./user.png", balance: 0},
  // {id:2, name:"Shyam", image:"./user.png", balance: 5},
  // {id:3, name:"Rita", image:"./user.png", balance: -7}
]

export default function App(){
  
  const[addFren,setAddFren] = useState(friendData);
  const[addForm,setAddForm] = useState(false);
  const[selectedFriend, setSelectFriend] = useState(null);

  function handleAddFriend(){
    setAddForm(!addForm);
  }

  function handleAddFren(newFriend){
    setAddFren((friendData)=>[...friendData,newFriend]);
    setAddForm(false);
  }

  function handleSelectedFriend(friend){
    setSelectFriend((curr) => (curr?.id === friend.id ? null : friend));
    setAddForm(false)
  }

  function handleSplitBill(value){
    console.log(value);

    setAddFren((friends)=>
    friends.map((friend)=>
    friend.id === selectedFriend.id ? {...friend, balance:friend.balance+value}:friend))

    setSelectFriend(null);
  }
  
  return <div className="all">

    <div className="left">

      <FriendList addForm={addForm} handleAddFriend={handleAddFriend} 
                  addFren={addFren} onSelection={handleSelectedFriend}
                  selectedFriend={selectedFriend} />

      <div className="addBtnContainer"><button className="addBtn"
      onClick={handleAddFriend} style={addForm?{display:"none"}:{}}>Add Friend</button>
      </div>

      <FriendForm addForm={addForm} handleAddFriend={handleAddFriend} handleAddFren={handleAddFren}/>

    </div >

    { selectedFriend && <SplitForm selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}

  </div>
}

function FriendList({addFren, onSelection, selectedFriend}){

  return <div className="">
    {addFren.map((fren)=>{
      return <Friend 
      key={fren.id}
      fren={fren}
      onSelection={onSelection}
      selectedFriend={selectedFriend}/>
  })}
  </div>
}

function Friend({fren, onSelection, selectedFriend }){

  function handleBalance(bal){
    if(bal===0){
      return <p className="userDescription" >you are all clear</p>
    }else if(bal<0){
      return <p className="userDescription" style={{color:"red"}} >you owe {fren.name} ${Math.abs(bal)}.</p>
    }else{
      return <p className="userDescription" style={{color:"green"}} >{fren.name} owes you ${Math.abs(bal)}.</p>
    }
  }


  const isSelected = selectedFriend?.id === fren.id; //optional chaining

  return <div className="eachFriend" style={isSelected?{backgroundColor:" rgb(255, 238, 196)"}:{}}>
   <div className="userInfo">
   <img src={fren.image} alt="profile-photo" className="userImage"/>
    <div className="userInfoText">
      <h3 className="userName">{fren.name}</h3>
      {handleBalance(fren.balance)}
    </div>
   </div>
    <button className="selectBtn" onClick={()=>onSelection(fren)}>{isSelected?"Close":"Select"}</button>
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

    setNam("");
    setTasbir("./user.png");
  }


  return <div className="friendForm" style={addForm?{display:"flex"}:{}}>
    <form onSubmit={handleSubmit}>
    <div className="top">
      <label htmlFor="inpName">Friend Name: </label>
      <input type="text" className="inpName" id="inpName" value={nam} onChange={(e)=>setNam(e.target.value)}></input>
    </div>
    <div className="bottom">
      <label htmlFor="inpURL">Image URL:  </label>
      <input  type="text" className="inpURL" id="inpURL" value={tasbir} onChange={(e)=>setTasbir(e.target.value)}></input>
    </div>
    <div className="addBtnContainer"><button className="addBtn" >Add</button></div>
    <button className="closeBtn" onClick={handleAddFriend}>close</button>
    </form>
  
  </div>
}

function SplitForm({selectedFriend, onSplitBill}){

  const [bill,setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e){
    e.preventDefault();

    if(!bill || !paidByUser) return;
    onSplitBill(whoIsPaying==="user"?paidByFriend:-paidByUser)
  
  }

  return<div className="right">
    <h2>SPLIT A BILL WITH {selectedFriend.name.toUpperCase()}</h2>
    <form className="splitForm" onSubmit={handleSubmit}>
      <div>
      <label htmlFor="billValue">Bill value:  </label>
      <input id="billValue" type="text" 
              className="billInp" value={bill} onChange={(e)=>setBill(Number(e.target.value))}></input>
      </div>
      <div>
      <label htmlFor="yourExpense">Your expense:  </label>
      <input id="yourExpense" type="text" 
             className="billInp" value={paidByUser} 
             onChange={(e)=>setPaidByUser(Number(e.target.value)>bill?paidByUser:Number(e.target.value))}></input>
      </div>
      <div>
      <label htmlFor="xExpense">{selectedFriend.name}'s expense:  </label>
      <input id="xExpense" type="text" className="billInp" disabled value={paidByFriend}></input>
      </div>

     <div className="choose">
     <label htmlFor="user" >Who is paying the bill ?</label>
      <select name="user" id="chooseUser" value={whoIsPaying} 
              onChange={(e)=>setWhoIsPaying(e.target.value)}>
        <option value="friend">{selectedFriend.name}</option>
        <option value="user">You</option>
      </select>
     </div>

      <div className="splitBtnContainer">
        <button className="splitBtn">Split bill</button>
      </div>

    </form>
  </div>
}